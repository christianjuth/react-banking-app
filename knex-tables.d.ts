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

  interface Account extends TimeStamps {
    id: number;
    user_id: number;
    closed: boolean;
    type: 'checkings' | 'savings';
  }

  interface Transaction extends TimeStamps {
    id: number;
    amount_cents: number;
    type: 'deposit' | 'withdrawal' | 'transfer';
    from_account_id: number | null;
    to_account_id: number | null;
  }

  interface Tables {
    users: User;
    sessions: Session;
    permissions: Permission;
    accounts: Account;
    transactions: Transaction;
  }
}
