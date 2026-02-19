"use server";

import { nextUrl } from "@/utils/env";
import { revalidatePath } from "next/cache";

export async function createTransferTransaction(formData) {
  const amount = formData.get("amount");
  const sourceAccountId = formData.get("sourceAccountId");
  const targetAccountId = formData.get("targetAccountId");
  const description = formData.get("description") || "";

  if (!amount || !sourceAccountId || !targetAccountId) {
    return { error: "Tous les champs sont requis" };
  }

  if (sourceAccountId === targetAccountId) {
    return {
      error: "Les comptes source et destination doivent être différents",
    };
  }

  if (Number(amount) <= 0) {
    return { error: "Le montant doit être supérieur à 0" };
  }

  const res = await fetch(`${nextUrl}/api/transactions/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: Number(amount),
      source_account_id: sourceAccountId,
      account_id: targetAccountId,
      description,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { error: data.error || "Erreur lors du transfert" };
  }

  const transaction = await res.json();
  revalidatePath(`/accounts/${sourceAccountId}`);
  revalidatePath(`/accounts/${targetAccountId}`);

  return { success: true, transaction };
}
