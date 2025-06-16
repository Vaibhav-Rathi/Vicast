// /api/auth/reset

import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload & { email: string };

    if (!decoded) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Token Verification success.' , decoded}, { status: 200 })
  } catch (err) {
    console.log(err);
    
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 500 })
  }
}
