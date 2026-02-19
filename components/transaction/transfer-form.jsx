"use client";

import { useState } from "react";
import { sileo } from "sileo";
import { Input } from "@/components/ui/input";
import { createTransferTransaction } from "@/services/transactions/create-transfer-transaction";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function TransferForm({ sourceAccountId, clientAccounts, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSourceId, setSelectedSourceId] = useState(
    sourceAccountId || clientAccounts[0]?.id,
  );

  const otherAccounts = clientAccounts.filter(
    (account) => account.id !== selectedSourceId,
  );

  async function handleSubmit(formData) {
    setIsLoading(true);
    setError(null);

    await delay(5000);
    const result = await createTransferTransaction(formData);

    if (result.error) {
      sileo.error({
        title: "Échec du transfert",
        description: result.error,
      });
      setError(result.error);
      setIsLoading(false);
      return;
    }

    sileo.success({
      title: "Transfert réussi",
      description: "Le transfert a été effectué avec succès",
    });
    setIsLoading(false);
    onClose?.();
  }

  if (clientAccounts.length < 2) {
    return (
      <div className="text-center py-4">
        <p className="text-slate-500">
          Il faut au moins 2 comptes pour effectuer un transfert.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          Fermer
        </button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="sourceAccountId"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Compte source
        </label>
        <select
          id="sourceAccountId"
          name="sourceAccountId"
          required
          disabled={isLoading || !!sourceAccountId}
          value={selectedSourceId}
          onChange={(e) => setSelectedSourceId(e.target.value)}
          className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
        >
          {clientAccounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} ({account.type})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="targetAccountId"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Compte destinataire
        </label>
        <select
          id="targetAccountId"
          name="targetAccountId"
          required
          disabled={isLoading}
          className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
        >
          {otherAccounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} ({account.type})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Montant (€)
        </label>
        <Input
          id="amount"
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Description (optionnel)
        </label>
        <Input
          id="description"
          name="description"
          type="text"
          placeholder="Ex: Remboursement"
          disabled={isLoading}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors disabled:opacity-50"
        >
          {isLoading ? "Transfert..." : "Transférer"}
        </button>
      </div>
    </form>
  );
}
