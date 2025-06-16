// **app/api/upload/chunk/route.ts**
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// Initialize S3 client
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
    const chunk = formData.get('chunk') as File;
    const chunkIndex = formData.get('chunkIndex');
    const totalChunks = formData.get('totalChunks');
    const uploadId = formData.get('uploadId') || uuidv4();
    
    if (!chunk || chunkIndex === null || totalChunks === null) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Convert chunk to buffer
    const buffer = Buffer.from(await chunk.arrayBuffer());
    
    // Upload chunk to S3
    const key = `uploads/${uploadId}/chunk_${chunkIndex}`;
    
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: chunk.type || 'application/octet-stream',
      Metadata: {
        uploadId: uploadId.toString(),
        chunkIndex: chunkIndex.toString(),
        totalChunks: totalChunks.toString(),
      },
    });
    
    await s3Client.send(command);
    
    // Check if this is the last chunk
    const isLastChunk = parseInt(chunkIndex.toString()) === parseInt(totalChunks.toString()) - 1;
    
    return NextResponse.json({ 
      success: true,
      uploadId,
      chunkIndex,
      totalChunks,
      isComplete: isLastChunk,
      s3Key: key,
    });
    
  } catch (error: any) {
    console.error('Chunk upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload chunk', details: error.message },
      { status: 500 }
    );
  }
}
