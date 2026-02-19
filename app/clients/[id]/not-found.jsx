import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl">Sorry Bro ! Client not found</p>
      <Link href="/" className="text-blue-500 underline mt-4 block">
        Retour
      </Link>
    </div>
  );
}
