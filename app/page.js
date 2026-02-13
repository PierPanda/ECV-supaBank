import Link from "next/link";
import database from "@/services/database";
import SearchClients from "@/components/search-clients";

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
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <header className="bg-linear-to-r from-indigo-600 to-purple-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Super Bank
          </h1>
          <p className="text-indigo-200 text-lg mb-8">
            Gérez vos clients et leurs comptes en toute simplicité
          </p>

          <div className="max-w-xl mx-auto">
            <SearchClients />
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {!search ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Recherchez un client
            </h2>
            <p className="text-slate-500">
              Tapez un nom ou prénom dans la barre de recherche pour commencer.
            </p>
          </div>
        ) : clients.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-6xl mb-4">😕</p>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Aucun résultat
            </h2>
            <p className="text-slate-500">
              Aucun client trouvé pour &quot;{search}&quot;
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Résultats ({clients.length})
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {clients.map((client) => (
                <Link
                  key={client.id}
                  href={`/clients/${client.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-xl font-bold text-white">
                          {client.first_name?.[0]}
                          {client.last_name?.[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-slate-900 truncate">
                          {client.first_name} {client.last_name}
                        </h3>
                      </div>
                      <span className="text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
