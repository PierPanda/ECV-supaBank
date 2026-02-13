import { nextUrl } from "../../utils/env";

export async function getClient(id) {
  try {
    const clientRes = await fetch(`${nextUrl}/api/clients/${id}`);
    const result = await clientRes.json();
    return result;
  } catch {
    throw Error("Client not found");
  }
}
