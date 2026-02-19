"use server";

import { nextUrl } from "@/utils/env";
import { revalidatePath } from "next/cache";

export async function deleteAccount(formData) {
  const accountId = formData.get("accountId");
  const clientId = formData.get("clientId");
  const balance = Number(formData.get("balance"));

  if (!accountId || !clientId) {
    return { error: "Informations manquantes" };
  }

  if (balance > 0) {
    return { error: "Impossible de supprimer un compte avec un solde positif" };
  }

  const res = await fetch(`${nextUrl}/api/accounts/${accountId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { error: data.error || "Erreur lors de la suppression du compte" };
  }

  revalidatePath(`/clients/${clientId}`);
  return { success: true, clientId };
}