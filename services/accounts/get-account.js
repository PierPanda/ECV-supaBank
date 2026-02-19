import { nextUrl } from "@/utils/env";

export async function getAccount(accountId) {
  try {
    const response = await fetch(`${nextUrl}/api/accounts/${accountId}`);
    const account = await response.json();
    return account;
  } catch (e) {
    console.error(e.message);
    throw new Error("Account not found");
  }
}
