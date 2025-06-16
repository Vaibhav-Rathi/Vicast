import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


export async function POST(req:NextRequest){
    const data = await req.json()
    const { token } = data;

    if (!token){
        return NextResponse.json({message : "Invalid or expited token"}, {status:401})
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
        const user = await prisma.user.findUnique({where:{email}})
        return NextResponse.json({id:user?.id})
    }catch(error){
        console.log(error);  
        return NextResponse.json({message : "Error while fetching the UserId!"}, {status: 500})      
    }
}