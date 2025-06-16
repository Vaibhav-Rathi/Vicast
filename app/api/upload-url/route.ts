// /api/upload-url
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

const s3 = new S3Client({ 
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const filename = searchParams.get('filename');
    const sessionId = searchParams.get('sessionId');
    const participantId = searchParams.get('participantId');
    const chunkNumber = searchParams.get('chunkNumber');
    const contentType = searchParams.get('contentType');

    // Validation
    if (!filename || !sessionId || !participantId || !chunkNumber) {
      return NextResponse.json({ 
        error: 'Missing required parameters: filename, sessionId, participantId, chunkNumber' 
      }, { status: 400 });
    }

    // Generate structured S3 key using participantId (matches schema)
    const s3Key = `recordings/${sessionId}/${participantId}/chunk_${chunkNumber}_${filename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: s3Key,
      ContentType: contentType || 'video/webm', // Default to webm for video chunks
    });

    // Generate presigned URL (5 minutes should be enough for chunk upload)
    const url = await getSignedUrl(s3, command, { expiresIn: 300 });

    return NextResponse.json({ 
      url,
      s3Key,
      expiresIn: 300,
      metadata: {
        sessionId,
        participantId,
        chunkNumber: parseInt(chunkNumber)
      }
    });

  } catch (error) {
    console.error('Error generating upload URL:', error);
    return NextResponse.json({ 
      error: 'Failed to generate upload URL' 
    }, { status: 500 });
  }
}

// Alternative POST method for more complex upload configurations
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      filename, 
      sessionId, 
      participantId, // Changed from participantId
      chunkNumber, 
      contentType = 'video/webm',
      metadata = {} 
    } = body;

    if (!filename || !sessionId || !participantId || !chunkNumber) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    const s3Key = `recordings/${sessionId}/${participantId}/chunk_${chunkNumber}_${filename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: s3Key,
      ContentType: contentType,
      Metadata: {
        sessionId,
        participantId: participantId.toString(),
        chunkNumber: chunkNumber.toString(),
        ...metadata
      }
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 300 });

    return NextResponse.json({ 
      url,
      s3Key,
      expiresIn: 300,
      metadata: {
        sessionId,
        participantId,
        chunkNumber,
        s3Key
      }
    });

  } catch (error) {
    console.error('Error generating upload URL:', error);
    return NextResponse.json({ 
      error: 'Failed to generate upload URL' 
    }, { status: 500 });
  }
}