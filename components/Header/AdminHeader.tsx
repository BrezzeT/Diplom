"use client";
import { useUIStore } from "@/lib/store/general";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
export default function AdminHeader() {
  const { toggleSidebar, isSidebarOpen } = useUIStore();
  return (
    <header className="sticky top-0 z-40 h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-orange-500/5 transition-all duration-300">
      <div className="flex items-center justify-between px-6 md:px-8 h-full">
        <div className="flex items-center gap-3 md:gap-6">
          <button
            aria-label="Переключити меню"
            type="button"
            onClick={() => toggleSidebar()}
            className={`p-2 md:p-2.5 rounded-xl md:rounded-[14px] transition-all duration-300 group ${
              isSidebarOpen
                ? "bg-slate-950 text-white shadow-lg shadow-slate-900/10"
                : "bg-slate-50 text-slate-400 hover:text-orange-600 hover:bg-orange-500/5 border border-slate-100 hover:border-orange-500/10"
            }`}
          >
            {isSidebarOpen ? (
              <X size={18} className="md:w-5 md:h-5" strokeWidth={2.5} />
            ) : (
              <Menu size={18} className="md:w-5 md:h-5" strokeWidth={2.5} />
            )}
          </button>

          <div className="hidden md:flex flex-col">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] leading-none mb-1">
              Система
            </span>
            <span className="text-sm font-bold text-slate-800 tracking-tight">
              Панель управління
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-8 w-px bg-slate-100 hidden md:block mx-2" />
          <Link
            href={"/"}
            className="flex items-center gap-2 md:gap-3 p-1 md:p-1.5 md:pr-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-500/20 hover:bg-orange-500/5 transition-all group"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors">
              <User size={16} className="md:w-4.5 md:h-4.5" strokeWidth={2} />
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span className="text-[11px] font-bold text-slate-800">
                Адміністратор
              </span>
              <span className="text-[9px] font-bold text-green-500 uppercase tracking-wider mt-1">
                Online
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
