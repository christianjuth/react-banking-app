import { db } from '../db';
import type { User } from 'knex/types/tables'

function sanitizeUser(user: User): Omit<User, 'password_hash'> {
  const { password_hash, ...rest } = user;
  return rest;
}

export async function getUserById(id: number): Promise<Omit<User, 'password_hash'> | undefined> {
  const user = await db.select().from('users').where('id', id).first();
  return user ? sanitizeUser(user) : undefined;
}
