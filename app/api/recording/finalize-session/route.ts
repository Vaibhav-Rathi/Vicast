// /api/recording/finalize-session

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, participantId } = await request.json();

    // Validate required parameters
    if (!sessionId || !participantId) {
      return NextResponse.json(
        { success: false, error: 'Session ID and Participant ID are required' },
        { status: 400 }
      );
    }

    // Check if participant exists
    const existingParticipant = await prisma.sessionParticipant.findUnique({
      where: { id: participantId }
    });

    if (!existingParticipant) {
      return NextResponse.json(
        { success: false, error: 'Participant not found' },
        { status: 404 }
      );
    }

    // Mark participant as left if not already marked
    if (!existingParticipant.leftAt) {
      await prisma.sessionParticipant.update({
        where: { id: participantId },
        data: { leftAt: new Date() }
      });
    }

    // Check if all participants have left
    const activeParticipants = await prisma.sessionParticipant.count({
      where: {
        sessionId,
        leftAt: null
      }
    });

    // If no active participants, mark session as completed
    if (activeParticipants === 0) {
      const updatedSession = await prisma.recordingSession.update({
        where: { id: sessionId },
        data: {
          status: 'COMPLETED',
          endTime: new Date()
        }
      });
      
      return NextResponse.json({ 
        success: true, 
        sessionCompleted: true,
        sessionStatus: updatedSession.status
      });
    } else {
      return NextResponse.json({ 
        success: true, 
        sessionCompleted: false,
        activeParticipants
      });
    }

  } catch (error) {
    console.error('Finalize session error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to finalize session'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}