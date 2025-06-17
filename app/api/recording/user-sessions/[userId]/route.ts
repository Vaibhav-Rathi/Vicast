// app/api/recording/user-sessions/[userId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Create a single instance of PrismaClient

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  
  try {
    // Validate userId
    const userId = parseInt(params.userId);
    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID' },
        { status: 400 }
      );
    }


    // First, check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!userExists) {
      return NextResponse.json({
        success: true,
        sessions: []
      });
    }

    // Fetch sessions
    const sessions = await prisma.recordingSession.findMany({
      where: {
        participants: {
          some: { userId }
        }
      },
      include: {
        participants: {
          include: {
            user: {
              select: { firstName: true, lastName: true, email: true }
            }
          }
        },
        _count: {
          select: { chunks: true }
        }
      },
      orderBy: { startTime: 'desc' }
    });


    // Map the response
    const response = {
      success: true,
      sessions: sessions.map(session => ({
        id: session.id,
        roomName: session.roomName,
        status: session.status,
        startTime: session.startTime,
        endTime: session.endTime,
        participants: session.participants.map(p => ({
          id: p.id,
          username: p.username,
          joinedAt: p.joinedAt,
          leftAt: p.leftAt,
          user: p.user
        })),
        totalChunks: session._count.chunks
      }))
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('[USER-SESSIONS] Detailed error:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
    
    // Check for specific Prisma errors
    if (error.code === 'P2021') {
      return NextResponse.json(
        { success: false, error: 'Database table does not exist. Please run: npx prisma db push' },
        { status: 500 }
      );
    }
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Database constraint violation' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch user sessions',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}