"use client";
import { FilterCategories } from "@/config/constants";
import { useUIStore } from "@/lib/store/general";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export default function FilterCatalog() {
  const { isFilterOpen, toggleFilter } = useUIStore();
  return (
    <>
      <div
        className={`flex flex-col border border-indigo-500/20  rounded-2xl bg-slate-950/40 backdrop-blur-xl transition-all duration-300 shadow-2xl`}
      >
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-slate-100">
              Каталог
            </h1>
          </div>

          <button
            onClick={() => toggleFilter()}
            type="button"
            className={`
              group flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all duration-300 font-medium text-sm border
              ${
                isFilterOpen
                  ? "bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border-transparent"
                  : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20"
              }
            `}
          >
            <SlidersHorizontal
              className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
            />
            <span>Фільтрація</span>
            <ChevronDown
              className={`w-4 h-4 opacity-50 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
            isFilterOpen
              ? "grid-rows-[1fr] opacity-100 border-t border-white/5"
              : "grid-rows-[0fr] opacity-0 border-t border-transparent"
          }`}
        >
          <div className="overflow-hidden min-h-0">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {FilterCategories.map((category) => (
                  <div key={category.title} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        {category.title}
                      </h3>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {category.content.map((item) => {
                        const isColor = category.title === "Колір";
                        const colorMap: Record<string, string> = {
                          Чорний: "bg-black",
                          Білий: "bg-white",
                          Синій: "bg-blue-600",
                          Червоний: "bg-red-600",
                        };

                        return (
                          <label
                            key={item}
                            className="group relative flex items-center justify-between p-3 rounded-2xl border border-white/5 hover:border-indigo-500/30 hover:bg-white/5 cursor-pointer transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              {isColor && (
                                <div
                                  className={`w-3 h-3 rounded-full border border-white/10 ${colorMap[item] || "bg-slate-500"}`}
                                />
                              )}
                              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                                {item}
                              </span>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="radio"
                                name={category.title}
                                className="peer hidden"
                              />
                              <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 transition-all">
                                <div className="w-2 h-2 rounded-full bg-indigo-500 scale-0 peer-checked:scale-100 transition-transform duration-200" />
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-end gap-3">
                <button className="px-5 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  Скинути
                </button>
                <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                  Застосувати
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
