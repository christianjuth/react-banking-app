
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {

  return knex.raw(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      email VARCHAR(30) UNIQUE NOT NULL,
      password_hash VARCHAR(60) NOT NULL
    );
  `)
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {

  return knex.raw(`
    DROP TABLE users;
  `)
  
};
