import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

export async function authenticate(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized: User not found" }, { status: 401 });
    }

    return { user };
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized: Invalid or expired token" }, { status: 401 });
  }
}
