import Link from "next/link";
import database from "@/services/database";
import SearchClients from "@/components/SearchClients";

async function getClients(search) {
  let query = database.from("clients").select();

  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%`,
    );
  }

  const { data, error } = await query;

  if (error) {
    throw new Error("Erreur lors de la récupération des clients");
  }

  return data;
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const search = params?.search || "";
  const clients = search ? await getClients(search) : [];

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Super Bank</h1>

      <div className="mb-6">
        <SearchClients />
      </div>

      {!search ? (
        <p className="text-muted-foreground">
          Tapez un nom ou prénom pour rechercher un client.
        </p>
      ) : clients.length === 0 ? (
        <p className="text-muted-foreground">Aucun client trouvé.</p>
      ) : (
        <ul className="space-y-2">
          {clients.map((client) => (
            <li key={client.id}>
              <Link
                href={`/clients/${client.id}`}
                className="block p-4 rounded-lg border hover:bg-accent transition-colors"
              >
                {client.first_name} {client.last_name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
