
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {

  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.timestamps();
    table.string('email', 30).unique().notNullable();
    table.string('password_hash', 60).notNullable();
    table.string('first_name', 20).notNullable();
    table.string('last_name', 20).notNullable();
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {

  return knex.schema.dropTable('users')
  
};
