"use client";

import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/store/general";

export default function CartDrawer() {
  const { isCartOpen, toggleCart } = useCartStore();
  return (
    <>
      <div
        onClick={toggleCart}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 
        ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        className={`fixed top-0 right-0 z-50 w-full md:max-w-md h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out 
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-blue-900/10 backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="text-blue-600" size={28} />
            Ваш кошик
          </h3>
          <button
            type="button"
            onClick={toggleCart}
            aria-label="Закрити кошик"
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </aside>
    </>
  );
}
