"use client";
import { useState } from "react";
import {
  Search,
  Trash2,
  SlidersHorizontal,
  X,
  Check,
  Plus,
} from "lucide-react";
import { CATEGORIES, CATEGORY_DEPENDENCIES } from "@/config/constants";
import { useAdminFilterStore } from "@/lib/store/general";
import Link from "next/link";

export default function Filter() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const {
    category,
    setCategory,
    brand,
    setBrand,
    color,
    setColor,
    stockStatus,
    setStockStatus,
  } = useAdminFilterStore();

  return (
    <div className="w-full space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative group flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <input
            type="text"
            placeholder="Пошук..."
            className="w-full h-11 pl-11 pr-4 bg-white border border-slate-100 rounded-xl text-[13px] font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-orange-500/20 transition-all"
          />
        </div>

        <Link
          href="/admin/add-products"
          title="Додати товар"
          className="flex lg:hidden items-center justify-center h-11 w-11 bg-orange-500 text-white rounded-xl active:scale-90 shrink-0 transition-all border border-orange-400/20"
        >
          <Plus size={18} strokeWidth={3} />
        </Link>

        <button
          onClick={() => setIsMobileOpen(true)}
          title="Відкрити фільтри"
          className="flex lg:hidden items-center justify-center h-11 w-11 bg-slate-950 text-white rounded-xl active:scale-90 shrink-0 transition-all border border-slate-900"
        >
          <SlidersHorizontal size={18} />
        </button>

        <div className="hidden lg:flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[60%]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat === category ? null : cat)}
              className={`whitespace-nowrap h-11 px-6 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all border ${
                category === cat
                  ? "bg-slate-950 border-slate-950 text-white active:scale-95"
                  : "bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600 active:scale-95"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {category && (
            <button
              onClick={() => {
                setCategory(null);
                setBrand(null, null);
                setColor(null);
                setStockStatus("all");
              }}
              title="Очистити всі фільтри"
              className="flex items-center justify-center h-11 w-11 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all active:scale-90 border border-transparent hover:border-rose-100"
            >
              <Trash2 size={18} />
            </button>
          )}
          <Link
            href="/admin/add-products"
            className="flex items-center gap-2 h-11 px-6 bg-slate-950 text-white rounded-xl font-black uppercase text-[11px] tracking-widest hover:bg-slate-800 transition-all active:scale-95 border border-slate-900"
          >
            <Plus size={16} strokeWidth={3} />
            Додати товар
          </Link>
        </div>
      </div>

      {category && CATEGORY_DEPENDENCIES[category] && (
        <div className="hidden lg:flex items-center flex-wrap gap-4 pt-2 border-t border-slate-50 animate-in fade-in slide-in-from-top-1 duration-300">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mr-2">
              Бренд:
            </span>
            {CATEGORY_DEPENDENCIES[category].brands.map((item) => (
              <button
                key={item}
                onClick={() => setBrand(item, null)}
                className={`h-9 px-4 rounded-lg font-bold text-[11px] transition-all border ${
                  brand === item
                    ? "bg-slate-100 border-slate-200 text-slate-900"
                    : "bg-white border-slate-100 text-slate-400 hover:bg-slate-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-100" />

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mr-2">
              Колір:
            </span>
            {CATEGORY_DEPENDENCIES[category].colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c === color ? null : c)}
                className={`h-9 px-4 rounded-lg font-bold text-[11px] transition-all border ${
                  color === c
                    ? "bg-slate-100 border-slate-200 text-slate-900"
                    : "bg-white border-slate-100 text-slate-400 hover:bg-slate-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-100" />

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mr-2">
              Наявність:
            </span>
            <button
              onClick={() => setStockStatus("all")}
              className={`h-9 px-4 rounded-lg font-bold text-[11px] border transition-all ${
                stockStatus === "all"
                  ? "bg-slate-100 border-slate-200 text-slate-900"
                  : "bg-white border-slate-100 text-slate-400"
              }`}
            >
              Всі
            </button>
            <button
              onClick={() => setStockStatus("inStock")}
              className={`h-9 px-4 rounded-lg font-bold text-[11px] border transition-all ${
                stockStatus === "inStock"
                  ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                  : "bg-white border-slate-100 text-slate-400"
              }`}
            >
              В наявності
            </button>
          </div>
        </div>
      )}

      <div
        className={`fixed inset-0 z-100 transition-all duration-500 ${isMobileOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-500 ${isMobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileOpen(false)}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 pb-10 space-y-6 transition-transform duration-500 ease-out shadow-none border-t border-slate-100 ${isMobileOpen ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                Фільтрація
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Налаштуйте вигляд списку
              </p>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              title="Закрити"
              className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 active:scale-90"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto no-scrollbar space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                Категорія
              </span>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat === category ? null : cat)}
                    className={`h-11 px-4 rounded-xl font-bold text-[11px] uppercase border transition-all flex items-center justify-between ${
                      category === cat
                        ? "bg-slate-950 border-slate-950 text-white"
                        : "bg-white border-slate-100 text-slate-500"
                    }`}
                  >
                    {cat}
                    {category === cat && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {category && CATEGORY_DEPENDENCIES[category] && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    Бренди
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORY_DEPENDENCIES[category].brands.map((item) => (
                      <button
                        key={item}
                        onClick={() => setBrand(item, null)}
                        className={`h-9 px-4 rounded-xl font-bold text-[11px] border transition-all ${
                          brand === item
                            ? "bg-slate-100 border-slate-200 text-slate-900"
                            : "bg-white border-slate-100 text-slate-500"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    Кольори
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORY_DEPENDENCIES[category].colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`h-9 px-4 rounded-xl font-bold text-[11px] border transition-all ${
                          color === c
                            ? "bg-slate-100 border-slate-200 text-slate-900"
                            : "bg-white border-slate-100 text-slate-500"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    Статус складу
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setStockStatus("inStock")}
                      className={`h-11 px-4 rounded-xl font-bold text-[11px] border transition-all ${
                        stockStatus === "inStock"
                          ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                          : "bg-white border-slate-100 text-slate-500"
                      }`}
                    >
                      В наявності
                    </button>
                    <button
                      onClick={() => setStockStatus("all")}
                      className={`h-11 px-4 rounded-xl font-bold text-[11px] border transition-all ${
                        stockStatus === "all"
                          ? "bg-slate-50 border-slate-100 text-slate-900"
                          : "bg-white border-slate-100 text-slate-500"
                      }`}
                    >
                      Показати всі
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setCategory(null);
                setBrand(null, null);
                setColor(null);
                setStockStatus("all");
                setIsMobileOpen(false);
              }}
              className="flex-1 h-12 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase text-[11px] tracking-widest active:scale-95"
            >
              Скинути
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="flex-2 h-12 bg-slate-950 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest active:scale-95"
            >
              Застосувати
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
