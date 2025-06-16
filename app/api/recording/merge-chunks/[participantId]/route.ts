// /api/recording/merge-chunks/[participantId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { S3Client, GetObjectCommand, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Helper function to download S3 object to buffer
async function downloadS3Object(bucket: string, key: string): Promise<Buffer> {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  const response = await s3Client.send(command);
  
  if (!response.Body) {
    throw new Error('No body in S3 response');
  }
  
  // Convert stream to buffer
  const chunks: Uint8Array[] = [];
  const stream = response.Body as Readable;
  
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  
  return Buffer.concat(chunks);
}

// Helper function to check if object exists in S3
async function checkS3ObjectExists(bucket: string, key: string): Promise<boolean> {
  try {
    await s3Client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch (error) {
    return false;
  }
}

// Helper function to merge WebM files using FFmpeg
async function mergeWebMWithFFmpeg(chunkPaths: string[], outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Create concat file
    const concatFilePath = path.join(path.dirname(outputPath), 'concat.txt');
    const concatContent = chunkPaths.map(p => `file '${p}'`).join('\n');
    
    fs.writeFile(concatFilePath, concatContent).then(() => {
      const ffmpeg = spawn('ffmpeg', [
        '-f', 'concat',
        '-safe', '0',
        '-i', concatFilePath,
        '-c', 'copy',
        '-avoid_negative_ts', 'make_zero',
        '-fflags', '+genpts',
        outputPath
      ]);

      let errorData = '';
      
      ffmpeg.stderr.on('data', (data) => {
        errorData += data.toString();
      });

      ffmpeg.on('close', async (code) => {
        // Clean up concat file
        try {
          await fs.unlink(concatFilePath);
        } catch (e) {
          // Ignore cleanup errors
        }
        
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`FFmpeg exited with code ${code}: ${errorData}`));
        }
      });

      ffmpeg.on('error', (err) => {
        reject(err);
      });
    }).catch(reject);
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { participantId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get('userId') || '0');
    const format = searchParams.get('format') || 'url'; // 'url' or 'download'

    // Verify access
    const participant = await prisma.sessionParticipant.findFirst({
      where: {
        id: params.participantId,
        session: {
          participants: {
            some: { userId }
          }
        }
      },
      include: {
        session: true
      }
    });

    if (!participant) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }

    // Check if merged video already exists with proper duration
    const mergedKey = `recordings/${participant.sessionId}/${params.participantId}/merged_recording_fixed.webm`;
    
    const mergedExists = await checkS3ObjectExists(process.env.AWS_S3_BUCKET_NAME!, mergedKey);
    
    if (mergedExists) {
      // File exists, return presigned URL
      const getCommand = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: mergedKey,
      });
      
      const presignedUrl = await getSignedUrl(s3Client, getCommand, {
        expiresIn: 3600, // 1 hour
      });
      
      // Get total duration from chunks
      const chunks = await prisma.recordingChunk.findMany({
        where: { participantId: params.participantId },
        orderBy: { chunkNumber: 'asc' }
      });
      
      const totalDuration = chunks.reduce((acc, chunk) => acc + (chunk.duration || 0), 0);
      
      return NextResponse.json({
        success: true,
        mergedVideo: {
          url: presignedUrl,
          key: mergedKey,
          cached: true,
          duration: totalDuration
        }
      });
    }

    // Get all chunks for this participant
    const chunks = await prisma.recordingChunk.findMany({
      where: { participantId: params.participantId },
      orderBy: { chunkNumber: 'asc' }
    });

    if (chunks.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No chunks found for this participant' },
        { status: 404 }
      );
    }

    const totalDuration = chunks.reduce((acc, chunk) => acc + (chunk.duration || 0), 0);

    // For client-side merging (lightweight approach)
    if (format === 'url') {
      // Generate presigned URLs for all chunks
      const chunkUrls = await Promise.all(
        chunks.map(async (chunk) => {
          const command = new GetObjectCommand({
            Bucket: chunk.s3Bucket,
            Key: chunk.s3Key,
          });
          
          const presignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
          });
          
          return {
            chunkNumber: chunk.chunkNumber,
            url: presignedUrl,
            duration: chunk.duration
          };
        })
      );
      
      return NextResponse.json({
        success: true,
        chunks: chunkUrls,
        totalDuration
      });
    }

    // For server-side merging with FFmpeg (if available)
    const tempDir = path.join(os.tmpdir(), `merge-${params.participantId}-${Date.now()}`);
    
    try {
      // Create temp directory
      await fs.mkdir(tempDir, { recursive: true });
      
      console.log(`Starting merge for participant ${params.participantId} with ${chunks.length} chunks`);
      
      // Download all chunks
      const chunkPaths: string[] = [];
      for (const chunk of chunks) {
        console.log(`Downloading chunk ${chunk.chunkNumber}...`);
        const buffer = await downloadS3Object(chunk.s3Bucket, chunk.s3Key);
        const chunkPath = path.join(tempDir, `chunk-${chunk.chunkNumber.toString().padStart(4, '0')}.webm`);
        await fs.writeFile(chunkPath, buffer);
        chunkPaths.push(chunkPath);
      }
      
      // Check if FFmpeg is available
      const ffmpegAvailable = await new Promise<boolean>((resolve) => {
        const test = spawn('ffmpeg', ['-version']);
        test.on('close', (code) => resolve(code === 0));
        test.on('error', () => resolve(false));
      });
      
      let mergedBuffer: Buffer;
      
      if (ffmpegAvailable) {
        console.log('Using FFmpeg to merge chunks...');
        // Use FFmpeg for proper merging
        const outputPath = path.join(tempDir, 'merged.webm');
        await mergeWebMWithFFmpeg(chunkPaths, outputPath);
        mergedBuffer = await fs.readFile(outputPath);
      } else {
        console.log('FFmpeg not available, using simple concatenation...');
        // Fallback to simple concatenation
        const chunkBuffers = await Promise.all(
          chunkPaths.map(path => fs.readFile(path))
        );
        mergedBuffer = Buffer.concat(chunkBuffers);
      }
      
      // Upload merged file to S3
      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: mergedKey,
        Body: mergedBuffer,
        ContentType: 'video/webm',
        Metadata: {
          participantId: params.participantId,
          sessionId: participant.sessionId,
          totalChunks: chunks.length.toString(),
          totalDuration: totalDuration.toString(),
          mergedAt: new Date().toISOString(),
          mergeMethod: ffmpegAvailable ? 'ffmpeg' : 'concatenation'
        }
      });
      
      await s3Client.send(uploadCommand);
      
      // Clean up temp directory
      await fs.rm(tempDir, { recursive: true, force: true });
      
      // Generate presigned URL for the merged file
      const getCommand = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: mergedKey,
      });
      
      const presignedUrl = await getSignedUrl(s3Client, getCommand, {
        expiresIn: 3600,
      });
      
      return NextResponse.json({
        success: true,
        mergedVideo: {
          url: presignedUrl,
          key: mergedKey,
          size: mergedBuffer.length,
          duration: totalDuration,
          method: ffmpegAvailable ? 'ffmpeg' : 'concatenation'
        }
      });
      
    } catch (error) {
      // Clean up on error
      try {
        await fs.rm(tempDir, { recursive: true, force: true });
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
      throw error;
    }

  } catch (error) {
    console.error('Merge chunks error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to merge chunks' },
      { status: 500 }
    );
  }
}

// POST endpoint for forcing re-merge with FFmpeg
export async function POST(
  request: NextRequest,
  { params }: { params: { participantId: string } }
) {
  try {
    const { userId, forceFFmpeg = false } = await request.json();
    
    // Verify access
    const participant = await prisma.sessionParticipant.findFirst({
      where: {
        id: params.participantId,
        session: {
          participants: {
            some: { userId }
          }
        }
      }
    });

    if (!participant) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }

    // Delete existing merged file to force re-merge
    const mergedKey = `recordings/${participant.sessionId}/${params.participantId}/merged_recording_fixed.webm`;
    
    try {
      await s3Client.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: mergedKey,
      }));
    } catch (error) {
      // Ignore if file doesn't exist
    }

    // Now call GET to trigger re-merge
    return GET(request, { params });

  } catch (error) {
    console.error('Force merge error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to force merge' },
      { status: 500 }
    );
  }
}

