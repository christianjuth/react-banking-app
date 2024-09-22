
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {

  return knex.schema.createTable('transactions', table => {
    table.increments('id').primary();
    table.timestamps()
    table.float('amount_cents').notNullable();
    table.enu('type', ['deposit', 'withdrawal', 'transfer']).notNullable();
    table.integer('from_account_id').unsigned();
    table.integer('to_account_id').unsigned();

    table.foreign('from_account_id').references('users.id');
    table.foreign('to_account_id').references('users.id');

    table.check(`
      (type = 'deposit' AND to_account_id IS NOT NULL AND from_account_id IS NULL) OR
      (type = 'withdrawal' AND from_account_id IS NOT NULL AND to_account_id IS NULL) OR
      (type = 'transfer' AND from_account_id IS NOT NULL AND to_account_id IS NOT NULL)
    `);
  });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {

  return knex.schema.dropTable('transactions');
  
};
