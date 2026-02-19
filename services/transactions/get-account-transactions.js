import { nextUrl } from "@/utils/env";

export async function getAccountTransactions(accountId) {
  const res = await fetch(`${nextUrl}/api/transactions?accountId=${accountId}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error("getAccountTransactions error:", error);
    return [];
  }

  return res.json();
}
