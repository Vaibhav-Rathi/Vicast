// /api/recording/start-session

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    const { roomName, sessionKey, userId, username } = body;


    // Check if session already exists
    let session = await prisma.recordingSession.findUnique({
      where: { sessionKey }
    });

    if (session) {
    } else {
      // Create new session
      session = await prisma.recordingSession.create({
        data: {
          roomName,
          sessionKey,
          createdBy: userId,
        }
      });
    }

    // Add participant to session
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
