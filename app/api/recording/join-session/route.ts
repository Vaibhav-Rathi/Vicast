// /api/recording/join-session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    const { sessionKey, sessionId, userId, username } = body;


    // Find the session by sessionId or sessionKey
    let session;
    
    if (sessionId) {
      // If sessionId is provided (from broadcast), use it directly
      session = await prisma.recordingSession.findUnique({
        where: { id: sessionId }
      });
    } else if (sessionKey) {
      // Fallback to sessionKey if sessionId not provided
      session = await prisma.recordingSession.findUnique({
        where: { sessionKey }
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Session ID or key required' },
        { status: 400 }
      );
    }

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      );
    }


    // Check if session is still active
    if (session.status === 'COMPLETED') {
      return NextResponse.json(
        { success: false, error: 'Session has already ended' },
        { status: 400 }
      );
    }

    // Add or update participant in session
    
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


    // Update session start time if this is the first time recording starts
    if (session.status === 'ACTIVE' && !session.startTime) {
      await prisma.recordingSession.update({
        where: { id: session.id },
        data: { 
          startTime: new Date()
        }
      });
    }


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