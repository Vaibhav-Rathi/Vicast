//  /api/recording/upload-chunk

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('chunk') as File;
    const sessionId = formData.get('sessionId') as string;
    const participantId = formData.get('participantId') as string;
    const userId = parseInt(formData.get('userId') as string);
    const chunkNumber = parseInt(formData.get('chunkNumber') as string);
    const duration = parseFloat(formData.get('duration') as string);

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Generate S3 key
    const timestamp = Date.now();
    const s3Key = `recordings/${sessionId}/${participantId}/chunk-${chunkNumber}-${timestamp}.webm`;
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to S3
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: s3Key,
      Body: buffer,
      ContentType: file.type || 'video/webm',
    });

    await s3Client.send(uploadCommand);

    // Save chunk info to database
    const chunk = await prisma.recordingChunk.create({
      data: {
        sessionId,
        participantId,
        userId,
        chunkNumber,
        s3Key,
        s3Bucket: process.env.AWS_S3_BUCKET_NAME!,
        fileSize: BigInt(file.size),
        duration,
        mimeType: file.type || 'video/webm',
        uploadStatus: 'COMPLETED',
        uploadedAt: new Date(),
      }
    });

    return NextResponse.json({
      success: true,
      chunk: {
        id: chunk.id,
        chunkNumber: chunk.chunkNumber,
        s3Key: chunk.s3Key
      }
    });

  } catch (error) {
    console.error('Upload chunk error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload chunk' },
      { status: 500 }
    );
  }
}
