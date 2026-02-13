"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

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
    <Input
      type="text"
      placeholder="Rechercher un client..."
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
      className="max-w-md"
    />
  );
}
