
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {

  return knex.schema.createTable('sessions', table => {
    table.string('session_id', 64).primary();
    table.timestamps();
    table.integer('user_id').notNullable();

    // Constraints
    table.foreign('user_id').references('users.id');
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {

  return knex.schema.dropTable('sessions');
  
};
