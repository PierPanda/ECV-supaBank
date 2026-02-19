import { nextUrl } from "@/utils/env";

export async function getAccountTransactions(accountId) {
  const res = await fetch(`${nextUrl}/api/transactions?accountId=${accountId}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    return [];
  }

  return res.json();
}
