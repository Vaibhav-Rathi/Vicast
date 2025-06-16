// /api/auth/polling

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const data = await req.json();
    const email = data.email

    try {
        if (!email){
            return NextResponse.json({message : "Invalid Email"})
        }
        const user = await prisma.user.findUnique({
            where : {
                email
            }
        })
        if (!user){
            return NextResponse.json({message : "User not found"}, {status:404})
        }
        if (user.verified){
            return NextResponse.json({firstName: user.firstName, lastName : user.lastName, email: user.email},{status : 200})
        }
        return false;
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "Error while polling"}, {status:401})   
    }

}