"use client";

import { useState } from "react";
import { sileo } from "sileo";
import { Input } from "@/components/ui/input";
import { createAccount } from "@/services/accounts/create-account";

const ACCOUNT_TYPES = ["checking", "savings", "investment"];

export function CreateAccountForm({ clientId, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(formData) {
    setIsLoading(true);
    setError(null);

    const result = await createAccount(formData);

    if (result.error) {
      sileo.error({
        title: "❌ Échec de la création",
        description: result.error,
      });
      setError(result.error);
      setIsLoading(false);
      return;
    }

    sileo.success({
      title: "✅ Compte créé",
      description: "Le compte a été créé avec succès",
    });
    setIsLoading(false);
    onClose?.();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="clientId" value={clientId} />

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Nom du compte
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Ex: Compte principal"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Type de compte
        </label>
        <select
          id="type"
          name="type"
          required
          disabled={isLoading}
          className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
        >
          {ACCOUNT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type} account
            </option>
          ))}
        </select>
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
          {isLoading ? "Création..." : "Créer le compte"}
        </button>
      </div>
    </form>
  );
}
