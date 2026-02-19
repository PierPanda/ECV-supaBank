"use client";

import { useState } from "react";
import { TransferForm } from "./transfer-form";

export function TransferButton({ sourceAccountId, clientAccounts }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm"
      >
        + Nouveau transfert
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl text-center font-bold text-slate-900 mb-4">
              Effectuer un transfert
            </h3>
            <TransferForm
              sourceAccountId={sourceAccountId}
              clientAccounts={clientAccounts}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
