import React from "react";
import { getClient } from "@/services/client/get-client";
import { getAccount } from "@/services/accounts/get-account";

export default async function AccountPage({ params }) {
  const { id } = await params;
  const account = await getAccount(id);
  const client = await getClient(account.client_id);
  console.log(account);

  return (
    <div>
      <h1>Account Details</h1>
      <p>
        Bénéficiaire: {client.last_name} {client.first_name}
      </p>
      <p>ID: {account.id}</p>
      <p>Name: {account.name}</p>
      <p>Solde: {account.balance} €</p>
    </div>
  );
}
