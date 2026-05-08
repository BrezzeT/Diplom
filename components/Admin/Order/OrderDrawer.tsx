"use client";
import { useOrderDrawerStore } from "@/lib/store/general";
import { FILTER_STATUS } from "@/config/constants";
import { X } from "lucide-react";

export default function OrderDrawer() {
  const { isOpen, order, closeDrawer } = useOrderDrawerStore();

  const statusInfo = order
    ? FILTER_STATUS.find((s) => s.id === order.status) || FILTER_STATUS[1]
    : null;

  void statusInfo;

  return (
    <>
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-100 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 z-110 w-full md:max-w-2xl h-full bg-white flex flex-col shadow-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 md:px-12 py-8 border-b border-slate-100 shrink-0">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
              Адміністрування
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tighter">
              Деталі замовлення
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            title="Закрити"
            className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-950 hover:text-white transition-all duration-300 active:scale-90 shrink-0"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-8 scrollbar-hide">
          <p className="text-slate-300 font-bold text-sm">
            Деталі будуть тут...
          </p>
        </div>
      </aside>
    </>
  );
}
