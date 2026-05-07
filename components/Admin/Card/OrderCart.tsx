"use client";
import { IOrder } from "@/types/types";
import { User, Package, Calendar, ArrowRight, Phone } from "lucide-react";
import { FILTER_STATUS } from "@/config/constants";

export function OrderCard({ order }: { order: IOrder }) {
  const statusInfo = FILTER_STATUS.find((s) => s.id === order.status) || FILTER_STATUS[1];
  const StatusIcon = statusInfo.icon;
  const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString("uk-UA") : "";

  return (
    <div className="group bg-white border border-slate-100 md:border-slate-50 rounded-2xl md:rounded-[22px] p-4 md:px-8 md:py-4 hover:border-orange-500/20 transition-all duration-300 cursor-pointer">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* ID & Client */}
        <div className="md:col-span-2 flex flex-col">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
            ID-{order._id?.slice(-5).toUpperCase()}
          </span>
          <div className="flex items-center gap-1.5 text-slate-400 md:hidden mb-2">
             <Calendar size={12} />
             <span className="text-[10px] font-bold">{date}</span>
          </div>
        </div>

        <div className="md:col-span-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 shrink-0 group-hover:bg-white group-hover:text-slate-900 transition-all border border-transparent group-hover:border-slate-100">
            <User size={18} />
          </div>
          <div className="min-w-0 flex flex-col">
            <h3 className="text-sm font-black text-slate-900 truncate leading-tight uppercase tracking-tight">
              {order.name}
            </h3>
            <div className="flex items-center gap-1 text-slate-400">
              <Phone size={10} />
              <span className="text-[11px] font-bold">{order.phone}</span>
            </div>
          </div>
        </div>

        {/* Date (Desktop only) */}
        <div className="hidden md:flex md:col-span-2 flex-col">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Оформлено</span>
          <span className="text-[12px] font-bold text-slate-600">{date}</span>
        </div>

        {/* Status */}
        <div className="md:col-span-2 flex justify-start md:justify-center">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${statusInfo.bg} ${statusInfo.color} border border-transparent`}>
            <StatusIcon size={12} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              {statusInfo.label}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="md:col-span-2 flex flex-col md:items-end">
          <div className="flex items-center gap-1 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
            <Package size={10} className="text-orange-500" />
            {order.items.length} тов.
          </div>
          <span className="text-lg font-black text-slate-950 tracking-tighter">
            {order.totalPrice.toLocaleString()} <span className="text-[11px] opacity-30 font-bold">₴</span>
          </span>
        </div>

        {/* Action */}
        <div className="md:col-span-1 flex justify-end">
          <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300 border border-transparent group-hover:border-slate-900">
            <ArrowRight size={16} strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
