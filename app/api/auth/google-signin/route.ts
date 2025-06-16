import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const { access_token } = await req.json()

    if (!access_token) {
      return NextResponse.json({ message: 'Access token is required' }, { status: 400 })
    }

    // Verify token with Google
    const googleResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
    )

    const googleUser = googleResponse.data as any

    if (!googleUser.email) {
      return NextResponse.json({ message: 'Failed to get user email from Google' }, { status: 400 })
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: googleUser.email }
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found. Please sign up first.' }, { status: 404 })
    }

    if (!user.verified) {
      // Auto-verify Google users
      await prisma.user.update({
        where: { id: user.id },
        data: { verified: true }
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    )

    const { password: _, ...safeUser } = user

    return NextResponse.json({
      message: 'Google signin successful',
      user: safeUser,
      token
    }, { status: 200 })

  } catch (error) {
    console.error('Google signin error:', error)
    return NextResponse.json({ message: 'Google signin failed' }, { status: 500 })
  }
}