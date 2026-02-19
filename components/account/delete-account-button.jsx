"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sileo } from "sileo";
import { deleteAccount } from "@/services/accounts/delete-account";

export function DeleteAccountButton({ accountId, clientId, balance }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const canDelete = balance <= 0;

  async function handleDelete(formData) {
    setIsLoading(true);

    const result = await deleteAccount(formData);

    if (result?.error) {
      sileo.error({
        title: "Suppression impossible",
        description: result.error,
      });
      setIsLoading(false);
      setIsOpen(false);
      return;
    }

    sileo.success({
      title: "Compte supprimé",
      description: "Le compte a été supprimé avec succès",
      duration: 3000,
    });

    router.push(`/clients/${result.clientId}`);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={!canDelete}
        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title={
          !canDelete ? "Le solde doit être à 0 pour supprimer ce compte" : ""
        }
      >
        Supprimer ce compte
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isLoading && setIsOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Confirmer la suppression
            </h3>
            <p className="text-slate-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce compte ? Cette action est
              irréversible.
            </p>

            <form action={handleDelete}>
              <input type="hidden" name="accountId" value={accountId} />
              <input type="hidden" name="clientId" value={clientId} />
              <input type="hidden" name="balance" value={balance} />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Suppression..." : "Supprimer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
