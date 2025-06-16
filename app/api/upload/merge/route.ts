// **app/api/upload/merge/route.ts** (Additional endpoint for merging chunks)
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { uploadId, fileName } = await request.json();
    
    if (!uploadId || !fileName) {
      return NextResponse.json(
        { error: 'Missing uploadId or fileName' },
        { status: 400 }
      );
    }
    
    // List all chunks for this upload
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Prefix: `uploads/${uploadId}/`,
    });
    
    const listResponse = await s3Client.send(listCommand);
    const chunks = listResponse.Contents || [];
    
    // Sort chunks by index
    chunks.sort((a, b) => {
      const aIndex = parseInt(a.Key!.split('chunk_')[1]);
      const bIndex = parseInt(b.Key!.split('chunk_')[1]);
      return aIndex - bIndex;
    });
    
    // Download and merge chunks
    const buffers: Buffer[] = [];
    
    for (const chunk of chunks) {
      const getCommand = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: chunk.Key!,
      });
      
      const response = await s3Client.send(getCommand);
      const buffer = await streamToBuffer(response.Body as any);
      buffers.push(buffer);
    }
    
    // Merge buffers
    const mergedBuffer = Buffer.concat(buffers);
    
    // Upload merged file
    const mergedKey = `videos/${uploadId}/${fileName}`;
    const putCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: mergedKey,
      Body: mergedBuffer,
      ContentType: 'video/webm',
    });
    
    await s3Client.send(putCommand);
    
    // Clean up chunks
    for (const chunk of chunks) {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: chunk.Key!,
      });
      await s3Client.send(deleteCommand);
    }
    
    // Generate presigned URL for download
    const getCommand = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: mergedKey,
    });
    
    const presignedUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });
    
    return NextResponse.json({
      success: true,
      s3Key: mergedKey,
      url: presignedUrl,
    });
    
  } catch (error: any) {
    console.error('Merge error:', error);
    return NextResponse.json(
      { error: 'Failed to merge chunks', details: error.message },
      { status: 500 }
    );
  }
}

async function streamToBuffer(stream: any): Promise<Buffer> {
  const chunks: any[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}