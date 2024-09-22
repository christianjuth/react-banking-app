
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {

  return knex.schema.createTable('permissions', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.timestamps();
    table.string('permission', 30).notNullable();

    // Constraints
    table.unique(['user_id', 'permission']);
    table.foreign('user_id').references('users.id');
  });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {

  return knex.schema.dropTable('permissions');
  
};
