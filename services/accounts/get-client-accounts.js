import { nextUrl } from "@/utils/env";

export async function getClientAccounts(clientId) {
  try {
    const clientAccountRes = await fetch(
      `${nextUrl}/api/accounts?clientId=${clientId}`,
    );
    const result = await clientAccountRes.json();
    return result;
  } catch (e) {
    console.log(e.message);
    return [];
  }
}
