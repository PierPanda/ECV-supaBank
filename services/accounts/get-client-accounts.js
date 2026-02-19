import { nextUrl } from "@/utils/env";

export async function getClientAccounts(clientId) {
  const clientAccountRes = await fetch(
    `${nextUrl}/api/accounts?clientId=${clientId}`,
  );

  if (!clientAccountRes.ok) {
    const error = await clientAccountRes.json().catch(() => ({}));
    console.error("getClientAccounts error:", error);
    return [];
  }

  return clientAccountRes.json();
}
