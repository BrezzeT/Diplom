"use client";

import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, items, updateQuantity, getTotalPrice } =
    useCartStore();

  const [step, setStep] = useState<"cart" | "checkout">("cart");

  useEffect(() => {
    if (!isCartOpen) {
      const timer = setTimeout(() => setStep("cart"), 300);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  return (
    <>
      <div
        onClick={toggleCart}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 
        ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        className={`fixed top-0 right-0 z-50 w-full md:max-w-md h-full bg-slate-950/80 backdrop-blur-3xl shadow-2xl flex flex-col transform transition-all duration-500 ease-in-out border-l border-white/5
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/50 shrink-0">
          <div className="flex items-center gap-3">
            {step === "checkout" ? (
              <button
                type="button"
                aria-label="Назад до кошика"
                onClick={() => setStep("cart")}
                className="p-2 -ml-2 bg-white/5 hover:bg-orange-500/10 rounded-xl text-orange-500 transition-all active:scale-90"
              >
                <ArrowLeft size={20} />
              </button>
            ) : (
              <div className="p-2 bg-orange-500/10 rounded-xl">
                <ShoppingBag className="text-orange-500" size={20} />
              </div>
            )}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {step === "cart" ? "Ваш кошик" : "Оформлення"}
              </h3>
              {step === "cart" && (
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  {items.reduce((acc, item) => acc + item.quantity, 0)} ТОВАРІВ
                </span>
              )}
            </div>
          </div>
          <button
            aria-label="Закрити кошик"
            type="button"
            onClick={toggleCart}
            className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {step === "cart" ? (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
                      <ShoppingBag size={32} className="text-slate-700" />
                    </div>
                    <p className="text-slate-500 font-medium tracking-tight">
                      Ваш кошик порожній
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-5 group animate-in fade-in slide-in-from-bottom-2 duration-500"
                    >
                      <div className="relative h-16 w-16 bg-white/5 rounded-2xl overflow-hidden shrink-0 border border-white/5 group-hover:border-orange-500/20 transition-all duration-300 flex items-center justify-center">
                        <ImageIcon
                          className="w-7 h-7 text-slate-700 group-hover:text-orange-500/50 transition-colors"
                          strokeWidth={1}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <h3 className="text-[15px] font-bold text-slate-200 line-clamp-1 group-hover:text-white transition-colors tracking-tight">
                          {item.name}
                        </h3>

                        <div className="flex items-center justify-between gap-4 mt-2">
                          <div className="flex flex-col">
                            <span className="text-xl font-black text-white tracking-tighter">
                              {item.price}{" "}
                              <span className="text-[10px] font-bold text-orange-500 uppercase ml-0.5">
                                ₴
                              </span>
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="relative flex items-center bg-white/5 rounded-xl border border-white/10 p-1 scale-90 md:scale-100">
                              {item.quantity >= (item.stock ?? 0) && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-[8px] font-black px-1.5 py-0.5 rounded-full text-white uppercase tracking-tighter animate-bounce shadow-lg shadow-orange-500/20">
                                  max
                                </div>
                              )}
                              <button
                                aria-label="Зменшити кількість"
                                type="button"
                                onClick={() => updateQuantity(item.id, "minus")}
                                className="p-1.5 text-slate-500 hover:text-orange-500 transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span
                                className={`w-8 text-center font-bold text-xs tabular-nums transition-colors ${
                                  item.quantity >= (item.stock ?? 0)
                                    ? "text-orange-500"
                                    : "text-white"
                                }`}
                              >
                                {item.quantity}
                              </span>
                              <button
                                aria-label="Збільшити кількість"
                                type="button"
                                disabled={
                                  item.quantity >= (item.stock ?? Infinity)
                                }
                                onClick={() => updateQuantity(item.id, "plus")}
                                className={`p-1.5 transition-colors ${
                                  item.quantity >= (item.stock ?? Infinity)
                                    ? "text-slate-700 cursor-not-allowed"
                                    : "text-slate-500 hover:text-orange-500"
                                }`}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() =>
                                useCartStore.getState().removeItem(item.id)
                              }
                              className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                              aria-label="Видалити"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-slate-900/50 backdrop-blur-xl shrink-0 space-y-5">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 pb-1">
                      Разом
                    </span>
                    <span className="text-3xl font-black text-white tracking-tighter">
                      {getTotalPrice()} ₴
                    </span>
                  </div>
                  <button
                    onClick={() => setStep("checkout")}
                    className="w-full py-4.5 bg-orange-500 text-white font-bold rounded-[22px] shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    Оформити замовлення
                  </button>
                </div>
              )}
            </>
          ) : (
            <CheckoutForm />
          )}
        </div>
      </aside>
    </>
  );
}
