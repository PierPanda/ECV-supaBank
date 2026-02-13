"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchClients() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = React.useState(searchParams.get("search") || "");

  const handleSearch = (value) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <input
      type="text"
      placeholder=" Rechercher un client par nom ou prénom..."
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full bg-white px-6 py-4 text-lg rounded-2xl border-0 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 placeholder:text-slate-400"
    />
  );
}
