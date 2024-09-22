
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {

  return knex.schema.createTable('accounts', table => {
    table.increments('id').primary();
    table.timestamps();
    table.integer('user_id').unsigned().notNullable();
    table.boolean('closed').notNullable().defaultTo(false);
    table.enu('type', ['checkings', 'savings']).notNullable();

    table.foreign('user_id').references('users.id');
  }) 
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {

  return knex.schema.dropTable('accounts');
  
};
