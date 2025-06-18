import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import bcrypt from 'bcrypt'

interface GoogleUser {
  email: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  id?: string;
}

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

    const googleUser = googleResponse.data as GoogleUser

    if (!googleUser.email) {
      return NextResponse.json({ message: 'Failed to get user email from Google' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: googleUser.email }
    })

    if (existingUser) {
      // If user exists, sign them in instead
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
      )

      const { password: _password, ...safeUser } = existingUser

      return NextResponse.json({
        message: 'User already exists, signed in successfully',
        user: safeUser,
        token
      }, { status: 200 })
    }

    // Create new user
    const randomPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10)
    
    const newUser = await prisma.user.create({
      data: {
        firstName: googleUser.given_name || googleUser.name?.split(' ')[0] || '',
        lastName: googleUser.family_name || googleUser.name?.split(' ').slice(1).join(' ') || '',
        email: googleUser.email,
        password: randomPassword, // Random password for Google users
        verified: true, // Auto-verify Google users
        token: jwt.sign({ email: googleUser.email }, process.env.JWT_SECRET as string)
      }
    })

    // Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, id: newUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    )

    const { password: _password, ...safeUser } = newUser

    return NextResponse.json({
      message: 'Google signup successful',
      user: safeUser,
      token
    }, { status: 200 })

  } catch (error) {
    console.error('Google signup error:', error)
    return NextResponse.json({ message: 'Google signup failed' }, { status: 500 })
  }
}