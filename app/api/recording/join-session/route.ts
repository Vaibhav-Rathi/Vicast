// /api/recording/join-session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function POST(request: NextRequest) {
  try {
    console.log('[START] Handling POST /api/recording/join-session');

    const body = await request.json();
    const { sessionKey, sessionId, userId, username } = body;

    console.log('[REQUEST BODY]', body);

    // Find the session by sessionId or sessionKey
    let session;
    
    if (sessionId) {
      // If sessionId is provided (from broadcast), use it directly
      console.log(`[FIND] Looking for session by ID: ${sessionId}`);
      session = await prisma.recordingSession.findUnique({
        where: { id: sessionId }
      });
    } else if (sessionKey) {
      // Fallback to sessionKey if sessionId not provided
      console.log(`[FIND] Looking for session by key: ${sessionKey}`);
      session = await prisma.recordingSession.findUnique({
        where: { sessionKey }
      });
    } else {
      console.log('[ERROR] No sessionId or sessionKey provided');
      return NextResponse.json(
        { success: false, error: 'Session ID or key required' },
        { status: 400 }
      );
    }

    if (!session) {
      console.log('[ERROR] Session not found');
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      );
    }

    console.log('[FOUND] Session:', session);

    // Check if session is still active
    if (session.status === 'COMPLETED') {
      console.log('[ERROR] Session already completed');
      return NextResponse.json(
        { success: false, error: 'Session has already ended' },
        { status: 400 }
      );
    }

    // Add or update participant in session
    console.log(`[UPSERT] Adding/updating participant: ${userId} (${username}) in session ${session.id}`);
    
    const participant = await prisma.sessionParticipant.upsert({
      where: {
        sessionId_userId: {
          sessionId: session.id,
          userId: userId
        }
      },
      update: {
        username,
        leftAt: null, // Reset if rejoining
        joinedAt: new Date() // Update join time
      },
      create: {
        sessionId: session.id,
        userId,
        username,
        joinedAt: new Date()
      }
    });

    console.log('[PARTICIPANT] Added/updated:', participant);

    // Update session start time if this is the first time recording starts
    if (session.status === 'ACTIVE' && !session.startTime) {
      console.log('[UPDATE] Setting session start time');
      await prisma.recordingSession.update({
        where: { id: session.id },
        data: { 
          startTime: new Date()
        }
      });
      console.log('[UPDATED] Session start time');
    }

    console.log('[SUCCESS] Participant joined session successfully');

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        sessionKey: session.sessionKey,
        participantId: participant.id,
        roomName: session.roomName,
        status: session.status
      }
    });

  } catch (error) {
    console.error('[ERROR] Failed to join recording session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to join recording session' },
      { status: 500 }
    );
  }
}