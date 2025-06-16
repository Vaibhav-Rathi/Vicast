import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const data = await req.json();
    const { key } = data;

    if (!key){
        return NextResponse.json({message: "Invalid Key"}, {status: 401})
    }

    try{
        const podcast = await prisma.podcast.findUnique({where:{key}})
        return NextResponse.json({userId:podcast?.userId})
    }catch(error){
        console.log(error);
        return NextResponse.json({message: "Error while fetching the userId from key"}, {status:500})        
    }
}