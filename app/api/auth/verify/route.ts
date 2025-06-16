// /api/auth/verify
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 })
    }
    
    const user = await prisma.user.findUnique({
      where: { token } 
    })

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 404 })
    }
    const { password: _, ...safeUser } = user;
    if (user.verified) {
      return NextResponse.json({ message: 'Email is already verified', user:safeUser}, { status: 201 })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verified: true,
      }
    })

    return NextResponse.json({ message: 'Email verified successfully', user:safeUser }, { status: 200 })

  } catch (err) {
    console.log(err);
    
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
