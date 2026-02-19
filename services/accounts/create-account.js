"use server";

import { nextUrl } from "@/utils/env";
import { revalidatePath } from "next/cache";

export async function createAccount(formData) {
  const name = formData.get("name");
  const type = formData.get("type");
  const clientId = formData.get("clientId");

  if (!name || !type || !clientId) {
    return { error: "Tous les champs sont requis" };
  }

  const res = await fetch(`${nextUrl}/api/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, type, client_id: clientId }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { error: data.error || "Erreur lors de la création du compte" };
  }

  const account = await res.json();
  revalidatePath(`/clients/${clientId}`);

  return { success: true, account };
}