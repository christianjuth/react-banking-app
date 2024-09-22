import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  return knex.transaction(async trx => {
    try {
      const hash = await bcrypt.hash("admin", SALT_ROUNDS)

      const [userId] = await knex('users')
        .insert({
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
          email: 'admin@example.com',
          password_hash: hash,
          first_name: 'Admin',
          last_name: 'Admin',
        }, 'id')
        .transacting(trx);

      await knex('permissions')
        .insert({
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
          user_id: userId,
          permission: 'admin.read'
        })
        .transacting(trx)

      await knex('permissions')
        .insert({
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
          user_id: userId,
          permission: 'admin.write'
        })
        .transacting(trx)

    } catch (err) {
      console.error(err);
    }

  })
};
