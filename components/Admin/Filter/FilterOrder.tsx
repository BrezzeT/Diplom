"use client";
import { useState } from "react";
import { FILTER_STATUS } from "@/config/constants";
import { IOrder } from "@/types/types";
import { OrderCard } from "../Card/OrderCart";
import { useOrderDrawerStore } from "@/lib/store/general";
import {
  Search,
  ChevronDown,
  Filter as FilterIcon,
  Package,
} from "lucide-react";

export default function FilterOrder({ orders }: { orders: IOrder[] }) {
  const openDrawer = useOrderDrawerStore((s) => s.openDrawer);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      activeFilter === "all" || order.status === activeFilter;
    const matchesSearch =
      order.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id?.toString().toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {FILTER_STATUS.map((status) => {
          const count =
            status.id === "all"
              ? orders.length
              : orders.filter((o) => o.status === status.id).length;

          const isActive = activeFilter === status.id;
          const Icon = status.icon;

          return (
            <button
              key={status.id}
              onClick={() => setActiveFilter(status.id)}
              className={`group p-5 md:p-7 rounded-[28px] border transition-all duration-500 flex flex-col gap-5 text-left relative overflow-hidden ${
                isActive
                  ? `bg-slate-950 border-slate-950 text-white shadow-xl shadow-slate-200`
                  : "bg-white border-slate-100 text-slate-500 hover:border-orange-500/30 hover:shadow-lg hover:shadow-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                    isActive
                      ? "bg-white/10"
                      : "bg-slate-50 group-hover:bg-orange-50 text-slate-400 group-hover:text-orange-500"
                  }`}
                >
                  <Icon
                    size={isActive ? 22 : 20}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <div
                  className={`text-2xl md:text-3xl font-black tracking-tighter ${isActive ? "text-white" : "text-slate-900"}`}
                >
                  {count}
                </div>
              </div>

              <div>
                <div
                  className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] opacity-60`}
                >
                  {status.label}
                </div>
              </div>

              {isActive && (
                <div className="absolute -right-2 -bottom-2 opacity-10 rotate-12">
                  <Icon size={80} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white border border-slate-100 p-3 rounded-[24px]">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Пошук за ім'ям або ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-6 bg-slate-50/50 border border-transparent focus:border-slate-100 rounded-xl outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-px bg-slate-100 hidden md:block" />
          <button className="flex items-center gap-2 px-4 h-12 rounded-xl text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-all">
            <FilterIcon size={14} />
            Сортування
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order._id?.toString()}
              onClick={() => openDrawer(order)}
              className="cursor-pointer"
            >
              <OrderCard order={order} />
            </div>
          ))
        ) : (
          <div className="p-20 flex flex-col items-center justify-center text-center bg-white border border-slate-100 rounded-[32px]">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
              <Package size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              Замовлень не знайдено
            </h3>
            <p className="text-sm font-bold text-slate-400 max-w-64">
              Спробуйте змінити фільтр або параметри пошуку
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
