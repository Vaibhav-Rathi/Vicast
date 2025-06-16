// /api/auth/signin
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { signinSchema } from '../../components/schema'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();  
    const data = signinSchema.safeParse(body)
        if (!data.success) {
          return NextResponse.json({message : "Incorrect email or password."}, {status:401})
        }

    const { email, password } = data.data

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    if (!user.verified) {
      return NextResponse.json({ message: 'Please complete the verification process first' }, { status: 403 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 403 })
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '24h' })

    const { password: _, ...safeUser } = user;
    return NextResponse.json({ message: 'Signin successful', user:safeUser, token  }, { status: 200 })

  } catch (err) {
    console.error('Signin error:', err)
    return NextResponse.json({ message: 'Error while logging in' }, { status: 500 })
  }
}
