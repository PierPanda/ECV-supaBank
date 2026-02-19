import React from "react";
import Link from "next/link";
import { getClient } from "@/services/client/get-client";
import { getAccount } from "@/services/accounts/get-account";
import { getAccountTransactions } from "@/services/transactions/get-account-transactions";
import { TransactionList } from "@/components/transaction/transaction-list";
import { DeleteAccountButton } from "@/components/account/delete-account-button";

export default async function AccountPage({ params }) {
  const { id } = await params;
  const account = await getAccount(id);
  const client = await getClient(account.client_id);
  const transactions = await getAccountTransactions(id);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <nav className="mb-6">
          <Link
            href={`/clients/${client.id}`}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour au profil de {client.first_name}
          </Link>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-200 text-sm font-medium uppercase tracking-wide">
                  Compte {account.type}
                </p>
                <h1 className="text-white text-2xl font-bold mt-1">
                  {account.name}
                </h1>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 space-y-4">
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-500">Bénéficiaire</span>
              <span className="font-semibold text-slate-900">
                {client.first_name} {client.last_name}
              </span>
            </div>
          </div>

          <div className="px-8 py-8 flex items-end justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">
                Solde actuel
              </p>
              <p className="text-4xl font-bold text-slate-900 mt-2">
                {formatCurrency(account.balance)}
              </p>
            </div>
            <DeleteAccountButton
              accountId={id}
              clientId={client.id}
              balance={account.balance}
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Transactions ({transactions.length})
          </h2>
          <TransactionList transactions={transactions} currentAccountId={id} />
        </div>
      </div>
    </main>
  );
}
