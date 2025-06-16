import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    // Get token from request body
    const body = await req.json();
    const { token, firstName, lastName } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    if (!firstName || firstName.trim() === '') {
      return NextResponse.json(
        { error: 'First name is required' },
        { status: 400 }
      );
    }

    // Verify JWT token and extract email
    let email: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      email = (decoded as any).email;
      
      if (!email) {
        return NextResponse.json(
          { error: 'Invalid token: email not found' },
          { status: 401 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Update user details
    const updatedUser = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        firstName: firstName.trim(),
        lastName: lastName ? lastName.trim() : null
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        verified: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update details error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}