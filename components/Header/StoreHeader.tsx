"use client";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { SabHeaderLinks } from "@/config/site";
import { useCartStore } from "@/lib/store/general";
export default function StoreHeader() {
  const { toggleCart } = useCartStore();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-500/20 bg-slate-950 backdrop-blur-2xl text-zinc-50 tracking-tight">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <Link href={"/"} className="flex items-center gap-1 group">
            <span className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              E-Commerce
            </span>{" "}
            <span className="text-xl font-light text-slate-300 group-hover:text-indigo-400 transition-colors">
              Store
            </span>
          </Link>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Відкрити кошик"
            onClick={toggleCart}
            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-indigo-500/20 transition-colors"
          >
            <ShoppingCart size={24} strokeWidth={1.5} />
          </button>
          <Link
            href={"/admin"}
            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-indigo-500/20 transition-colors"
          >
            <User size={24} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
export function SubHeader() {
  return (
    <div className="w-full border-b border-indigo-500/20 overflow-x-auto no-scrollbar">
      <div className="container mx-auto h-10 flex divide-x divide-indigo-500/20 md:border-x border-indigo-500/20 min-w-max">
        {SabHeaderLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="h-full px-6 flex items-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 hover:text-white hover:bg-indigo-500/10 transition-all shadow-inner last:border-r border-indigo-500/20 whitespace-nowrap"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
