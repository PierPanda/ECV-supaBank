import { nextUrl } from "../../utils/env";

export async function getClient(id) {
  const clientRes = await fetch(`${nextUrl}/api/clients/${id}`);

  if (!clientRes.ok) {
    const error = await clientRes.json().catch(() => ({}));
    console.error("getClient error:", error);
    return null;
  }

  return clientRes.json();
}
