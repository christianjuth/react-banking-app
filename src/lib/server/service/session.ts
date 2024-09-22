import { db } from '../db'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { cookies } from 'next/headers'
import { getUserById } from './user'

export async function createSession({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const user = await db.from('users')
    .select("*")
    .where('email', email)
    .first();

  if (!user) {
    throw new Error('Username password combo incorrect')
  }
  
  const passwordMatch = await bcrypt.compare(password, user.password_hash)

  if (!passwordMatch) {
    throw new Error('Username password combo incorrect')
  }

  const sessionId = crypto.randomBytes(32).toString('hex');

  const createdAt = Date.now()

  await db('sessions')
    .insert({
      session_id: sessionId,
      user_id: user.id,
      created_at: createdAt,
      updated_at: createdAt,
    })

  return await db.from('sessions')
    .where('session_id', sessionId)
    .first()
}

async function getSession(sessionId: string) {
  const session = await db.from('sessions')
    .where('session_id', sessionId)
    .first()

  if (session) {
    return await getUserById(session.user_id)
  }
}

export async function getSessionFromCookie() {
  const session = cookies().get('session_id')?.value
  return session ? await getSession(session) : undefined
}
