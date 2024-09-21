import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  return knex.transaction(async trx => {
    try {
      const hash = await bcrypt.hash("password", SALT_ROUNDS)

      const createdAt = Date.now();
      
      await trx.raw(`
        INSERT INTO users (created_at, updated_at, email, password_hash)
        VALUES (?, ?, 'admin@example.com', ?);
      `, [
        createdAt,
        createdAt,
        hash,
      ]);

      const [{ userId }] = await trx.raw(`
        SELECT LAST_INSERT_ROWID() AS userId;
      `);

      await trx.raw(`
        INSERT INTO permissions (created_at, updated_at, user_id, permission)
        VALUES (':createdAt:', ':updatedAt:', ':userId:', 'admin.read');
      `, {
        userId, 
        createdAt,
        updatedAt: createdAt,
      })

      await trx.raw(`
        INSERT INTO permissions (created_at, updated_at, user_id, permission)
        VALUES (':createdAt:', ':updatedAt:', ':userId:', 'admin.write');
      `, {
        userId, 
        createdAt,
        updatedAt: createdAt,
      })

    } catch (err) {
      console.error(err);
      trx.rollback();
    }

  })
};
