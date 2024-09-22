import { Knex } from 'knex';

interface TimeStamps {
  created_at: number;
  updated_at: number;
}

declare module 'knex/types/tables' {
  interface User extends TimeStamps {
    id: number;
    name: string;
    password_hash: string;
    first_name: string;
    last_name: string;
  }

  interface Session extends TimeStamps {
    user_id: number;
    session_id: string;
  }

  interface Permission extends TimeStamps {
    id: string;
    user_id: number;
    permission: string;
  }

  interface Tables {
    users: User;
    sessions: Session;
  }
}
