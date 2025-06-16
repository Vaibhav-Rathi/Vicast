// /api/auth/reset-enter-password
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { resetPasswordSchema } from '../../components/schema'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const data = await req.json()
    const success = resetPasswordSchema.safeParse(data)
    if (!success.success){
        return NextResponse.json({message : "Please eneter the correct format for the password, atleast 1 capital case, 1 small case, 1 special character, 1 number and minimum of 8 charaters."}, {status:401})
    }
    const newPassword = data.password 
    const newHashedPassword = await bcrypt.hash(newPassword, 10)

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload & { email: string };

    if (!decoded) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 404 })
    }

    await prisma.user.update({
      where: { email: decoded.email },
      data: {
        password: newHashedPassword,
      }
    })

    return NextResponse.json({ message: 'Password changed successfully.' }, { status: 200 })

  } catch (err) {
    console.log(err);
    
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
