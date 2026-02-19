import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getClient } from "@/services/client/get-client";
import { getClientAccounts } from "@/services/accounts/get-client-accounts";
import { AccountCard } from "@/components/account-card";
import { CreateAccountButton } from "@/components/create-account-button";

export default async function ClientPage({ params }) {
  const { id } = await params;
  const client = await getClient(id);
  const clientAccounts = await getClientAccounts(id);

  if (!client?.id) {
    notFound();
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const totalBalance =
    clientAccounts?.reduce((sum, acc) => sum + Number(acc.balance), 0) || 0;

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link
            href="/"
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
            Retour à l&apos;accueil
          </Link>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-8 py-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {client.first_name?.[0]}
                  {client.last_name?.[0]}
                </span>
              </div>
              <div>
                <p className="text-indigo-200 text-sm font-medium uppercase tracking-wide">
                  Client
                </p>
                <h1 className="text-white text-3xl font-bold mt-1">
                  {client.first_name} {client.last_name}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Mes comptes{" "}
              <span className="text-xl font-bold text-slate-900">
                ({clientAccounts?.length || 0})
              </span>
            </h2>
            <CreateAccountButton clientId={id} />
          </div>

          {clientAccounts?.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {clientAccounts.map((clientAccount) => (
                <AccountCard key={clientAccount.id} account={clientAccount} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-slate-400"
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
              <p className="text-slate-500">Aucun compte pour le moment</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
