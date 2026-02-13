import * as React from "react";

export default async function ClientPage({ params }) {
  console.log("PARAMS", await params);
  const { id } = await params;

  return (
    <>
      <h1>Page client</h1>
      <p>ID : {id}</p>
    </>
  );
}
