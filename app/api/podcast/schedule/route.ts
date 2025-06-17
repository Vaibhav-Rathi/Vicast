import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    // Parse request body to get token
    const body = await request.json();
    const { token } = body;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 401 }
      );
    }

    // Verify JWT token
    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Extract email from decoded token
    const userEmail = decodedToken.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Email not found in token' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse request body
    const { title, description, scheduledAt, participants } = body;

    // Validate required fields
    if (!title || !scheduledAt) {
      return NextResponse.json(
        { error: 'Title and scheduledAt are required' },
        { status: 400 }
      );
    }

    // Validate scheduledAt is a valid date
    const scheduledDate = new Date(scheduledAt);
    if (isNaN(scheduledDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid scheduledAt date format' },
        { status: 400 }
      );
    }

    // Validate participants is an array if provided
    if (participants && !Array.isArray(participants)) {
      return NextResponse.json(
        { error: 'Participants must be an array of strings' },
        { status: 400 }
      );
    }

    // Create the schedule
    const schedule = await prisma.schedule.create({
      data: {
        title,
        description: description || null,
        scheduledAt: scheduledDate,
        createdById: user.id, // Both are now String type
        participants: participants || [],
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(
      {
        success: true,
        data: schedule,
        message: 'Schedule created successfully'
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Optional: GET method to retrieve schedules
export async function GET(request: NextRequest) {
  try {
    // Get token from query parameters for GET request
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 401 }
      );
    }

    // Verify JWT token
    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const userEmail = decodedToken.email;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user's schedules
    const schedules = await prisma.schedule.findMany({
      where: {
        createdById: user.id
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: {
        scheduledAt: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      data: schedules
    });

  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE method to delete a schedule
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, scheduleId } = body;

    if (!token || !scheduleId) {
      console.warn('[WARN] Missing token or scheduleId');
      return NextResponse.json(
        { error: 'Token and scheduleId are required' },
        { status: 400 }
      );
    }

    // Verify JWT token
    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      console.error('[ERROR] Invalid token:', error);
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const userEmail = decodedToken.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Email not found in token' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    });

    if (!user) {
      console.warn('[WARN] User not found for email:', userEmail);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }


    // Check if the schedule exists and belongs to the user
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    if (!schedule) {
      console.warn('[WARN] Schedule not found:', scheduleId);
      return NextResponse.json(
        { error: 'Schedule not found' },
        { status: 404 }
      );
    }

    // Check if the user is authorized to delete this schedule
    if (schedule.createdById !== user.id) {
      console.warn('[WARN] Unauthorized delete attempt:', {
        userId: user.id,
        scheduleCreator: schedule.createdById
      });
      return NextResponse.json(
        { error: 'Unauthorized to delete this schedule' },
        { status: 403 }
      );
    }

    // Delete the schedule
    await prisma.schedule.delete({
      where: { id: scheduleId }
    });


    return NextResponse.json(
      {
        success: true,
        message: 'Schedule deleted successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('[ERROR] Error deleting schedule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}