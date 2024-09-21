// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      extension: 'mjs',
      loadExtensions: ['.mjs', '.js'],
    },
    seeds: {
      extension: 'mjs',
      loadExtensions: ['.mjs', '.js'],
    }
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      extension: 'mjs',
      loadExtensions: ['.mjs', '.js'],
    },
    seeds: {
      extension: 'mjs',
      loadExtensions: ['.mjs', '.js'],
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      extension: 'mjs',
      loadExtensions: ['.mjs', '.js'],
    },
    seeds: {
      extension: 'mjs',
      loadExtensions: ['.mjs', '.js'],
    }
  },

};
