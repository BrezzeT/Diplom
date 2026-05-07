"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { SabHeaderLinks } from "@/config/site";
import { useCartStore } from "@/lib/store/cart";

export default function StoreHeader() {
  const { toggleCart, items } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl text-zinc-50 tracking-tight">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white font-black text-lg shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
              E
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tighter">
                E-Commerce
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Store
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Відкрити кошик"
            onClick={toggleCart}
            className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-orange-500/10 text-slate-400 hover:text-orange-500 transition-all active:scale-90 group"
          >
            <ShoppingCart size={22} strokeWidth={2} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-black text-white shadow-lg shadow-orange-500/40 animate-in zoom-in duration-300">
                {itemCount}
              </span>
            )}
          </button>

          <Link
            href="/admin"
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-90"
          >
            <User size={22} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SubHeader() {
  return (
    <div className="w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-md overflow-x-auto no-scrollbar">
      <div className="container mx-auto h-11 flex divide-x divide-white/5 md:border-x border-white/5 min-w-max">
        {SabHeaderLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="h-full px-8 flex items-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-white hover:bg-white/5 transition-all whitespace-nowrap"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
