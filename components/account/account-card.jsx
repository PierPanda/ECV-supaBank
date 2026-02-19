import Link from "next/link";
import Icon from "@iconify/react";

export function AccountCard({ account }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <Link href={`/accounts/${account.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
        <h3 className="font-bold text-lg text-slate-900 mb-1">
          {account.name}
        </h3>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Solde
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {formatCurrency(account.balance)}
            </p>
          </div>
          <div className="text-indigo-600 group-hover:translate-x-1 transition-transform">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
