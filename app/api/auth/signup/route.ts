// /api/auth/signup
import { NextRequest, NextResponse } from 'next/server';
import { signupSchema } from '../../components/schema';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config();

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

export async function POST(req:NextRequest){
    const body = await req.json();  
    const data = signupSchema.safeParse(body)
    
    if (!data.success){
      return NextResponse.json({message : "Please eneter the correct format for the password, atleast 1 capital case, 1 small case, 1 special character, 1 number and minimum of 8 charaters."}, {status:401})
    }

    const { firstName, lastName, email, password } = data.data;
    const user = await prisma.user.findUnique({where:{email}})
    if (user){
      return NextResponse.json({message : "User with this email already exist!"}, {status : 400})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({email}, process.env.JWT_SECRET as string, {expiresIn: '24h'})
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL
    
    try {
        const createdUser = await prisma.user.create({
            data : {
                firstName,
                lastName : lastName || undefined,
                email,
                password : hashedPassword,
                token,
            }
        })
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Email Verification",
            html: `
              <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
                  <img src="${baseURL}/email_image.png" alt="Verify Email" style="max-width: 100px; margin-bottom: 10px;" />
                  <h2 style="color: #333;">Welcome to Our Platform</h2>
                </div>
                <div style="padding: 30px; color: #444;">
                  <p>Hi <strong>${firstName}</strong>,</p>
                  <p>Thank you for signing up. Please verify your email address to complete your registration.</p>
                  <p style="text-align: center; margin: 30px 0;">
                    <a href="${baseURL}/signup/verify?token=${token}" style="background-color: #4f46e5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                      Verify Email
                    </a>
                  </p>
                  <p>If you did not sign up, you can ignore this email.</p>
                  <p style="margin-top: 40px;">Regards,<br/>The Team</p>
                </div>
                <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #999;">
                  &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
                </div>
              </div>
            `,
          });    
          return NextResponse.json({message : "We have sent a email on the provided email address, Please check and complete the verification process"}, {status : 200})      
    }catch(error){
        console.log(error);
        return NextResponse.json({message  : "Error while signing up"}, {status : 400})
    }
}