// app/api/recording/download-all/[sessionId]/route.ts

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
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const {sessionId} = await params;
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get('userId') || '0');

    // Verify access
    const participant = await prisma.sessionParticipant.findFirst({
      where: {
        sessionId: sessionId,
        userId
      }
    });

    if (!participant) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }

    // Get all chunks for the session
    const chunks = await prisma.recordingChunk.findMany({
      where: { sessionId: sessionId },
      include: {
        participant: {
          select: { username: true }
        }
      },
      orderBy: [
        { participantId: 'asc' },
        { chunkNumber: 'asc' }
      ]
    });

    // Generate download URLs
    const downloadUrls = await Promise.all(
      chunks.map(async (chunk) => {
        const command = new GetObjectCommand({
          Bucket: chunk.s3Bucket,
          Key: chunk.s3Key,
        });

        const presignedUrl = await getSignedUrl(s3Client, command, {
          expiresIn: 3600,
        });

        return {
          participantName: chunk.participant.username,
          chunkNumber: chunk.chunkNumber,
          downloadUrl: presignedUrl,
          filename: `${chunk.participant.username}_chunk_${chunk.chunkNumber}.webm`
        };
      })
    );

    return NextResponse.json({
      success: true,
      downloads: downloadUrls
    });

  } catch (error) {
    console.error('Download all error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate download URLs' },
      { status: 500 }
    );
  }
}