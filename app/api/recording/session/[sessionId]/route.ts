// /api/recording/session/[sessionId]

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get('userId') || '0');

    // Verify user was participant in this session
    const participant = await prisma.sessionParticipant.findFirst({
      where: {
        sessionId: params.sessionId,
        userId
      }
    });

    if (!participant) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }

    // Get session with all participants and their chunks
    const session = await prisma.recordingSession.findUnique({
      where: { id: params.sessionId },
      include: {
        participants: {
          include: {
            user: {
              select: { firstName: true, lastName: true, email: true }
            },
            chunks: {
              orderBy: { chunkNumber: 'asc' }
            }
          }
        }
      }
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      );
    }

    // Generate presigned URLs for all chunks
    const participantsWithUrls = await Promise.all(
      session.participants.map(async (participant) => {
        const chunksWithUrls = await Promise.all(
          participant.chunks.map(async (chunk) => {
            const command = new GetObjectCommand({
              Bucket: chunk.s3Bucket,
              Key: chunk.s3Key,
            });
            
            const presignedUrl = await getSignedUrl(s3Client, command, {
              expiresIn: 3600, // 1 hour
            });

            return {
              id: chunk.id,
              chunkNumber: chunk.chunkNumber,
              duration: chunk.duration,
              fileSize: chunk.fileSize.toString(),
              uploadedAt: chunk.uploadedAt,
              downloadUrl: presignedUrl
            };
          })
        );

        return {
          id: participant.id,
          username: participant.username,
          joinedAt: participant.joinedAt,
          leftAt: participant.leftAt,
          user: participant.user,
          chunks: chunksWithUrls
        };
      })
    );

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        roomName: session.roomName,
        status: session.status,
        startTime: session.startTime,
        endTime: session.endTime,
        participants: participantsWithUrls
      }
    });

  } catch (error) {
    console.error('Get session error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}
