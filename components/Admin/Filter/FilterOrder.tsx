"use client";
import { FILTER_STATUS } from "@/config/constants";
import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { IOrder } from "@/types/types";
import { OrderCard } from "../Card/OrderCart";
import OrderDetailsDrawer from "../Order/OrderDetailsDrawer";

export function FilterOrder({ orders = [] }: { orders: IOrder[] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const getCount = (id: string) => {
    if (id === "all") return orders.length;
    return orders.filter((order) => order.status === id).length;
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      activeFilter === "all" || order.status === activeFilter;
    const matchesSearch =
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order._id?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <OrderDetailsDrawer
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Керування <span className="text-orange-500">замовленнями</span>
          </h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
            Аналітика та обробка продажів магазину
          </p>
        </div>

        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Швидкий пошук..."
            className="w-full h-11 pl-11 pr-4 bg-white border border-slate-100 rounded-xl outline-none focus:border-orange-500/20 transition-all font-bold text-[13px] text-slate-700 placeholder:text-slate-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {FILTER_STATUS.map((status) => {
          const Icon = status.icon;
          const isActive = activeFilter === status.id;

          return (
            <button
              key={status.id}
              onClick={() => setActiveFilter(status.id)}
              className={`p-6 rounded-[24px] border transition-all duration-300 flex items-center gap-4 text-left relative overflow-hidden ${
                isActive
                  ? `bg-white border-slate-950 text-slate-950`
                  : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                  isActive
                    ? `${status.bg} ${status.color}`
                    : "bg-slate-50 text-slate-300"
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 3 : 2} />
              </div>

              <div className="min-w-0">
                <span className="block text-[10px] font-black uppercase tracking-widest opacity-60 truncate">
                  {status.label}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black tracking-tight leading-none">
                    {getCount(status.id)}
                  </span>
                  <span className="text-[9px] font-black uppercase opacity-30">
                    замов.
                  </span>
                </div>
              </div>

              {isActive && (
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-orange-500" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-3 bg-slate-50/50 rounded-xl border border-slate-50 mb-2">
          <div className="col-span-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            ID Замовлення
          </div>
          <div className="col-span-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Клієнт
          </div>
          <div className="col-span-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Дата
          </div>
          <div className="col-span-2 text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">
            Статус
          </div>
          <div className="col-span-2 text-[10px] font-black text-slate-300 uppercase tracking-widest text-right">
            Сума
          </div>
          <div className="col-span-1"></div>
        </div>

        <div className="flex flex-col gap-2">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order._id} onClick={() => setSelectedOrder(order)}>
                <OrderCard order={order} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-50 border-dashed rounded-[32px]">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mb-4">
                <ShoppingCart size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                Замовлень не знайдено
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                Спробуйте інший статус або пошуковий запит
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
