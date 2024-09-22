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

      const now = knex.fn.now();

      const [userId] = await knex('users')
        .insert({
          created_at: now,
          updated_at: now,
          email: 'admin@example.com',
          password_hash: hash,
          first_name: 'Admin',
          last_name: 'Admin',
        })
        .transacting(trx);

      await knex('permissions')
        .insert({
          created_at: now,
          updated_at: now,
          user_id: userId,
          permission: 'admin.read'
        })
        .transacting(trx);

      await knex('permissions')
        .insert({
          created_at: now,
          updated_at: now,
          user_id: userId,
          permission: 'admin.write'
        })
        .transacting(trx);

      const [accountId] = await knex('accounts')
        .insert({
          created_at: now,
          updated_at: now,
          user_id: userId,
          closed: false,
          type: 'checkings',
        })
        .transacting(trx);

      await knex('transactions')
        .insert({
          created_at: now,
          updated_at: now,
          amount_cents: 100 * 100 * 10, // $1000
          type: 'deposit',
          to_account_id: accountId,
        })
        .transacting(trx);
      

    } catch (err) {
      console.error(err);
    }

  })
};
