import jwt from 'jsonwebtoken';
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { token, key, name} = data
  
    if (!token || !key) {
      return NextResponse.json({ error: 'Missing or invalid token or missing key' }, {status:401});
    }

    try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

    if (!decoded?.email) {
      return NextResponse.json({ error: 'Invalid token payload' }, {status: 401});
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, {status:404});
    }

    const isPodcast = await prisma.podcast.findUnique({where:{key}})
    if (isPodcast){
        return NextResponse.json({message : "PodCast with this key already exists"})
    }

    const podcast = await prisma.podcast.create({
      data: {
        userId: user.id,
        key,
        name
      },
    });

    return NextResponse.json({podcast:podcast}, {status:201})
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, {status:500});
  }
}
