"use client";

import { IOrder } from "@/types/types";
import { User, Package, Calendar, ArrowRight } from "lucide-react";
import { FILTER_STATUS } from "@/config/constants";

export function OrderCard({ order }: { order: IOrder }) {
  const statusInfo =
    FILTER_STATUS.find((s) => s.id === order.status) || FILTER_STATUS[1];
  const StatusIcon = statusInfo.icon;
  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("uk-UA")
    : "";

  const activeStyles: Record<string, string> = {
    pending: "border-orange-500/20 shadow-orange-500/5",
    completed: "border-emerald-500/20 shadow-emerald-500/5",
    cancelled: "border-rose-500/20 shadow-rose-500/5",
  };

  const currentStyle = activeStyles[order.status] || activeStyles.pending;

  return (
    <div
      className={`group bg-white p-5 md:p-7 rounded-2xl md:rounded-[32px] border transition-all duration-500 cursor-pointer flex flex-col gap-5 md:gap-6 relative overflow-hidden ${currentStyle} border-slate-100 hover:border-transparent hover:shadow-2xl hover:shadow-black/5`}
    >
      <div className="flex justify-between items-center">
        <span className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
          ID-{order._id?.slice(-5).toUpperCase()}
        </span>
        <div
          className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl ${statusInfo.bg} ${statusInfo.color}`}
        >
          <StatusIcon size={10} className="md:w-3 md:h-3" strokeWidth={3} />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">
            {statusInfo.label}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-slate-400">
          <User size={12} className="md:w-3.5 md:h-3.5" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">
            Клієнт
          </span>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-slate-900 truncate tracking-tight">
          {order.name}
        </h3>
        <p className="text-xs md:text-sm font-medium text-slate-500">
          {order.phone}
        </p>
      </div>

      <div className="mt-1 md:mt-2 pt-4 md:pt-6 border-t border-slate-50 flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">
            <Package size={10} className="md:w-3 md:h-3 text-orange-500" />
            {order.items.length} товари
          </div>
          <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">
            {order.totalPrice.toLocaleString()} ₴
          </span>
        </div>

        <div className="flex flex-col items-end gap-2 md:gap-3">
          <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-slate-400">
            <Calendar size={10} className="md:w-3 md:h-3" />
            {date}
          </div>
          <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
