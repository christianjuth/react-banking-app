import { type NextRequest, NextResponse } from "next/server";
import { db } from '@/lib/server/db'

export async function GET(request: NextRequest) {
  const users = await db.select().from('users');
  return NextResponse.json(users.map(({ password_hash, ...rest }) => rest));
}
