// /api/recording/start-session

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function POST(request: NextRequest) {
  try {
    console.log('[START] Handling POST /api/recording/start-session');

    const body = await request.json();
    const { roomName, sessionKey, userId, username } = body;

    console.log('[REQUEST BODY]', body);

    // Check if session already exists
    let session = await prisma.recordingSession.findUnique({
      where: { sessionKey }
    });

    if (session) {
      console.log(`[FOUND] Existing session for key: ${sessionKey}`, session);
    } else {
      // Create new session
      console.log(`[CREATE] No existing session found. Creating new session with key: ${sessionKey}`);
      session = await prisma.recordingSession.create({
        data: {
          roomName,
          sessionKey,
          createdBy: userId,
        }
      });
      console.log('[CREATED] New session:', session);
    }

    // Add participant to session
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
        leftAt: null // Reset if rejoining
      },
      create: {
        sessionId: session.id,
        userId,
        username
      }
    });

    console.log('[PARTICIPANT]', participant);

    console.log('[SUCCESS] Session and participant handled successfully');

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        sessionKey: session.sessionKey,
        participantId: participant.id
      }
    });

  } catch (error) {
    console.error('[ERROR] Failed to start recording session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to start recording session' },
      { status: 500 }
    );
  }
}
