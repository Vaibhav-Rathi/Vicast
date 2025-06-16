// /api/auth/me
import { NextRequest } from "next/server";
import { authenticate } from "../../../../lib/middleware/auth";

export async function GET(req: NextRequest) {
  const result = await authenticate(req);

  if ("user" in result) {
    const { password, token, ...safeUser } = result.user;
    return Response.json({ user: safeUser });
  } else {
    return result;
  }
}
