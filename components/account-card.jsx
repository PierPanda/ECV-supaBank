import Link from "next/link";

export function AccountCard({ account }) {
  return (
    <Link href={`/accounts/${account.id}`} className="block">
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="font-semibold">{account.name}</h3>
        <p className="text-gray-600">{account.type}</p>
        <p className="text-2xl font-bold mt-2">
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
          }).format(account.balance)}
        </p>
      </div>
    </Link>
  );
}
