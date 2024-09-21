import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface User {
    id: number;
    name: string;
    password_hash: string;
    created_at: string;
    updated_at: string;
  }

  interface Tables {
    users: User;
  }
}
