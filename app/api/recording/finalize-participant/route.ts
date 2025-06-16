// /api/recording/finalize-participant/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('[START] Handling POST /api/recording/finalize-participant');

    const body = await request.json();
    const { sessionId, participantId } = body;

    console.log('[REQUEST BODY]', body);

    if (!sessionId || !participantId) {
      return NextResponse.json(
        { success: false, error: 'Session ID and Participant ID required' },
        { status: 400 }
      );
    }

    // Update participant's leftAt timestamp
    const participant = await prisma.sessionParticipant.update({
      where: { id: participantId },
      data: { leftAt: new Date() }
    });

    console.log('[UPDATED] Participant finalized:', participant);

    // Get total chunks for this participant
    const chunkCount = await prisma.recordingChunk.count({
      where: {
        sessionId,
        participantId
      }
    });

    console.log(`[CHUNKS] Participant ${participantId} has ${chunkCount} chunks`);

    return NextResponse.json({
      success: true,
      participant: {
        id: participant.id,
        leftAt: participant.leftAt,
        totalChunks: chunkCount
      }
    });

  } catch (error) {
    console.error('[ERROR] Failed to finalize participant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to finalize participant' },
      { status: 500 }
    );
  }
}