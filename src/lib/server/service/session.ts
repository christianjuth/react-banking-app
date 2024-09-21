import { db } from '../db'
import bcrypt from 'bcrypt'

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
    throw new Error('Email not found')
  }
  
  const passwordMatch = await bcrypt.compare(password, user.password_hash)

  if (!passwordMatch) {
    throw new Error('Password incorrect')
  }
}
