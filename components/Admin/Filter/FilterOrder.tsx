"use client";

import { FILTER_STATUS } from "@/config/constants";
import { Search, ListFilter, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { IOrder } from "@/types/types";
import { OrderCard } from "../Card/OrderCart";

export function FilterOrder({ orders = [] }: { orders: IOrder[] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getCount = (id: string) => {
    if (id === "all") return orders.length;
    return orders.filter((order) => order.status === id).length;
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      activeFilter === "all" || order.status === activeFilter;
    const matchesSearch =
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 md:gap-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Замовлення
          </h1>
          <p className="text-sm text-slate-500">
            Керування та аналітика продажів
          </p>
        </div>

        <div className="relative group w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Пошук..."
            className="w-full pl-11 pr-4 py-3.5 md:py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500/30 focus:bg-white transition-all font-medium text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {FILTER_STATUS.map((status) => {
          const Icon = status.icon;
          const isActive = activeFilter === status.id;

          const activeStyles: Record<string, string> = {
            all: "border-blue-500/20 shadow-blue-500/5",
            pending: "border-orange-500/20 shadow-orange-500/5",
            completed: "border-emerald-500/20 shadow-emerald-500/5",
            cancelled: "border-rose-500/20 shadow-rose-500/5",
          };

          const currentStyle = activeStyles[status.id] || activeStyles.all;

          return (
            <button
              key={status.id}
              onClick={() => setActiveFilter(status.id)}
              className={`p-4 md:p-6 rounded-2xl md:rounded-[32px] border transition-all duration-300 flex flex-col gap-3 md:gap-4 text-left group relative overflow-hidden ${
                isActive
                  ? `bg-white ${currentStyle} shadow-xl scale-[1.02]`
                  : "bg-white border-slate-100 hover:border-slate-200 shadow-sm"
              }`}
            >
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? `${status.bg} ${status.color} rotate-6`
                    : "bg-slate-50 text-slate-400"
                }`}
              >
                <Icon size={20} className="md:w-6 md:h-6" />
              </div>

              <div>
                <span
                  className={`text-[11px] md:text-[12px] font-bold transition-colors ${
                    isActive ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {status.label}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl md:text-3xl font-bold text-slate-900 tracking-tighter">
                    {getCount(status.id)}
                  </span>
                  <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase">
                    шт
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 md:py-20 bg-slate-50 rounded-2xl md:rounded-[32px] border border-dashed border-slate-200">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white text-slate-300 mb-4">
              <ShoppingCart size={24} className="md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
              Замовлень не знайдено
            </h3>
            <p className="text-slate-500 text-xs md:text-sm">
              Спробуйте змінити фільтр або пошук
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
