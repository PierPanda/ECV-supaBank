export function TransactionList({ transactions, currentAccountId }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-6 h-6 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-slate-500">Aucune transaction</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="divide-y divide-slate-100">
        {transactions.map((transaction) => {
          const isOutgoing = transaction.source_account_id === currentAccountId;
          const amount = isOutgoing ? -transaction.amount : transaction.amount;

          return (
            <div
              key={transaction.id}
              className="px-6 py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isOutgoing ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${isOutgoing ? "text-red-600" : "text-green-600"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isOutgoing ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {transaction.type === "transfer" ? "Transfert" : transaction.type}
                  </p>
                  {transaction.description && (
                    <p className="text-sm text-slate-500">{transaction.description}</p>
                  )}
                  <p className="text-xs text-slate-400">
                    {formatDate(transaction.created_at)}
                  </p>
                </div>
              </div>
              <p
                className={`font-bold ${
                  isOutgoing ? "text-red-600" : "text-green-600"
                }`}
              >
                {isOutgoing ? "-" : "+"}{formatCurrency(Math.abs(amount))}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
