// /api/auth/forgot
import { NextRequest, NextResponse } from "next/server";
import { transporter } from '@/lib/transporter'
import jwt from 'jsonwebtoken'
import { prisma } from "@/lib/prisma";

export async function POST(req:NextRequest) {
    const data = await req.json();
    const email = data.email    
    if (!email){
        return NextResponse.json({message : "Email is required"}, {status: 401})
    }
    const user = await prisma.user.findUnique({where :{email}})
    if (!user){
        return NextResponse.json({message : "Invalid Email"}, {status:401})
    }
    const token = jwt.sign({email}, process.env.JWT_SECRET as string)
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset",
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px; text-align: center;">
            <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
              <img src="https://yourdomain.com/email_image.png" alt="App Banner" style="max-width: 100%; height: auto; border-radius: 6px;" />
              <h2 style="color: #333; margin-top: 30px;">Reset Your Password</h2>
              <p style="color: #555; font-size: 16px;">
                You recently requested to reset your password. Click the button below to continue.
              </p>
              <a href="${process.env.baseURL}/reset-password?token=${token}"
                style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Reset Password
              </a>
              <p style="margin-top: 30px; color: #999; font-size: 14px;">
                If you did not request a password reset, please ignore this email or contact support.
              </p>
            </div>
          </div>
        `,
      });  
    return NextResponse.json({message : "We have sent a email on the provided email address, Please check and complete the verification process"}, {status : 200})        
}