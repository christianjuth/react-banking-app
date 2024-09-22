import { getSessionFromCookie } from "@/lib/server/service/session";
import { getUserAccounts, getAccountBalanceCents } from "@/lib/server/service/account";

const currencyFormatter = Intl.NumberFormat('en', {
  currency: 'USD',
  style: 'currency',
})

export default async function Page() {
  const user = await getSessionFromCookie();

  if (!user) {
    return null;
  }

  const accounts = await getUserAccounts(user.id);

  const balances = await Promise.all(accounts.map(a => (
    getAccountBalanceCents({
      accountId: a.id,
      userId: user.id,
    })
  )))

  return (
    <main className="p-6 space-y-2">
      <h1>Accounts</h1>
      {accounts.map((account, i) => (
        <div key={account.id} className="border p-3 rounded flex flex-col">
          <span>{account.type}</span>
          <span>{currencyFormatter.format(balances[i]! / 100)}</span>
        </div>
      ))}
    </main>
  );
}
