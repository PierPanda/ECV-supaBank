import { nextUrl } from "../../utils/env";

export async function getClient(id) {
  const clientRes = await fetch(`${nextUrl}/api/clients/${id}`);

  if (!clientRes.ok) {
    const error = await clientRes.json().catch(() => ({}));
    return null;
  }

  return clientRes.json();
}
