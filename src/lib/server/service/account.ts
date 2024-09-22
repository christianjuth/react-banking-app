import { db } from '../db'

export async function getAccountBalanceCents({ userId, accountId }: { userId: number, accountId: number }) {

  const { verifyAccount, transactions } = await db.transaction(async trx => {

    const verifyAccount = await trx.from('accounts')
      .select('*')
      .where({ user_id: userId, id: accountId })
      .first();

    const transactions = await trx.from('transactions')
      .select("*")
      .where({ from_account_id: accountId })
      .orWhere({ to_account_id: accountId })
      .orderBy('created_at', 'desc');

    return { verifyAccount, transactions }
      
  })

  if (verifyAccount?.id !== accountId && verifyAccount?.user_id === userId) {
    throw new Error('This account does not exsists')
  }

  return transactions.reduce((acc, crnt) => {
    const sign = crnt.from_account_id === userId ? -1 : 1
    return acc + (crnt.amount_cents * sign)
  }, 0)
}

export function getUserAccounts(userId: number) {
  return db.from('accounts').select('*').where({ user_id: userId });
}
