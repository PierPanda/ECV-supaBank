import * as React from "react";
import { notFound } from "next/navigation";
import { getClient } from "@/services/client/get-client";
import { getClientAccounts } from "@/services/accounts/get-client-accounts";
import { AccountCard } from "@/components/account-card";

export default async function ClientPage({ params }) {
  const { id } = await params;
  const client = await getClient(id);
  const clientAccounts = await getClientAccounts(id);

  console.log(client);
  console.log(clientAccounts);

  if (!client?.id) {
    notFound();
  }

  return (
    <>
      <p>{client.first_name}</p>
      <p>{client.last_name}</p>
      <br></br>
      <div className="grid gap-4">
        {clientAccounts?.map((clientAccount) => (
          <AccountCard key={clientAccount.id} account={clientAccount} />
        ))}
      </div>
    </>
  );
}
