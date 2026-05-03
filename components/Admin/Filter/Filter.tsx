"use client";
import { Search, Trash2 } from "lucide-react";
import { CATEGORIES, CATEGORY_DEPENDENCIES } from "@/config/constants";
import { useAdminFilterStore } from "@/lib/store/general";

export default function Filter() {
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
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col lg:flex-row lg:items-center  gap-2">
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Швидкий пошук..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat === category ? null : cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 border active:scale-95 ${
                  category === cat
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {category && (
            <button
              aria-label="Очистити фільтри"
              type="button"
              onClick={() => {
                setCategory(null);
                setBrand(null, null);
                setColor(null);
                setStockStatus("all");
              }}
              className="flex items-center justify-center p-2.5 bg-red-50 text-red-500 border border-red-100 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90 shrink-0"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {category && CATEGORY_DEPENDENCIES[category] && (
        <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 justify-start">
            <div className="flex items-center gap-2 shrink-0">
              {CATEGORY_DEPENDENCIES[category].brands.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setBrand(item, null)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-xs transition-all border active:scale-95 ${
                    brand === item
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 justify-start">
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setColor(null)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-xs transition-all border active:scale-95 ${
                  color === null
                    ? "bg-slate-800 border-slate-800 text-white"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                Всі
              </button>
              {CATEGORY_DEPENDENCIES[category].colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c === color ? null : c)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-xs transition-all border active:scale-95 ${
                    color === c
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 justify-start">
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setStockStatus("all")}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-xs transition-all border active:scale-95 ${
                  stockStatus === "all"
                    ? "bg-slate-800 border-slate-800 text-white"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                Всі
              </button>
              <button
                type="button"
                onClick={() => setStockStatus("inStock")}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-xs transition-all border active:scale-95 ${
                  stockStatus === "inStock"
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-md"
                    : "bg-white border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600"
                }`}
              >
                В наявності
              </button>
              <button
                type="button"
                onClick={() => setStockStatus("outOfStock")}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-xs transition-all border active:scale-95 ${
                  stockStatus === "outOfStock"
                    ? "bg-amber-600 border-amber-600 text-white shadow-md"
                    : "bg-white border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-600"
                }`}
              >
                Немає в наявності
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
