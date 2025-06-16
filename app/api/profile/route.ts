import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    // Get token from request body
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
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

    // Get user data by email
    const user = await prisma.user.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        verified: true,
        createdAt: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Format the response
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      verified: user.verified,
      createdAt: user.createdAt
    };

    return NextResponse.json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}