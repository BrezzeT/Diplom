"use client";
import { IOrder } from "@/types/types";
import { Calendar, ArrowRight, Phone } from "lucide-react";
import { FILTER_STATUS } from "@/config/constants";

export function OrderCard({ order }: { order: IOrder }) {
  const statusInfo =
    FILTER_STATUS.find((s) => s.id === order.status) || FILTER_STATUS[1];
  const StatusIcon = statusInfo.icon;
  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("uk-UA")
    : "";

  return (
    <div className="group bg-white transition-all duration-500 cursor-pointer border border-slate-200 rounded-[28px] md:rounded-[32px] overflow-hidden relative hover:border-orange-500/30 hover:shadow-xl hover:shadow-slate-100/50">
      <div className="hidden md:grid grid-cols-12 items-center px-10 py-7 gap-4">
        <div className="col-span-3 flex items-center gap-4 min-w-0">
          <div className="bg-slate-950 text-white px-3 py-1.5 rounded-xl">
            <span className="text-[12px] font-black tracking-widest">
              {order._id?.toString()?.slice(-5).toUpperCase() || "NEW"}
            </span>
          </div>
          <span className="text-[18px] font-black text-slate-950 truncate tracking-tight">
            {order.name}
          </span>
        </div>
        <div className="col-span-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
            <Phone size={16} />
          </div>
          <span className="text-[15px] font-bold text-slate-700 tracking-tight">
            {order.phone}
          </span>
        </div>
        <div className="col-span-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors">
            <Calendar size={16} />
          </div>
          <span className="text-[15px] font-bold text-slate-700 tracking-tight">
            {date}
          </span>
        </div>

        <div className="col-span-2 flex justify-center">
          <div
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full ${statusInfo.bg} ${statusInfo.color} border border-transparent transition-all duration-300`}
          >
            <StatusIcon size={14} strokeWidth={3} />
            <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
              {statusInfo.label}
            </span>
          </div>
        </div>
        <div className="col-span-3 flex items-center justify-end gap-5">
          <div className="text-right">
            <span className="text-2xl font-black text-slate-950 tracking-tighter">
              {order.totalPrice?.toLocaleString() || 0}
            </span>
            <span className="text-[14px] text-slate-300 font-bold ml-1">₴</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-950 group-hover:text-white transition-all duration-500 shadow-sm">
            <ArrowRight size={22} strokeWidth={3} />
          </div>
        </div>
      </div>

      <div className="md:hidden p-6 flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-slate-950 text-white px-2.5 py-1 rounded-lg">
                <span className="text-[10px] font-black tracking-widest">
                  #{order._id?.toString()?.slice(-5).toUpperCase() || "NEW"}
                </span>
              </div>
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${statusInfo.bg} ${statusInfo.color}`}
              >
                <StatusIcon size={10} strokeWidth={3} />
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  {statusInfo.label}
                </span>
              </div>
            </div>
            <h4 className="text-[22px] font-black text-slate-950 tracking-tight leading-tight">
              {order.name}
            </h4>
          </div>
          <div className="text-right pt-1">
            <span className="text-2xl font-black text-slate-950 tracking-tighter">
              {order.totalPrice?.toLocaleString() || 0}
            </span>
            <span className="text-[12px] text-slate-300 font-bold ml-1">₴</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 text-slate-600">
              <Phone size={16} className="text-slate-300" />
              <span className="text-[16px] font-bold tracking-tight">
                {order.phone}
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Calendar size={16} className="text-slate-300" />
              <span className="text-[15px] font-medium">{date}</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-[20px] bg-slate-950 flex items-center justify-center text-white active:scale-95 transition-transform shadow-xl shadow-slate-200">
            <ArrowRight size={24} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
