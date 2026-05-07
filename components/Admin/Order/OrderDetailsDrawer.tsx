"use client";
import { X, User, Phone, MapPin, Package, Calendar } from "lucide-react";
import { IOrder } from "@/types/types";
import { FILTER_STATUS } from "@/config/constants";
import { updateOrderStatus } from "@/lib/action/order.action";
import { useState } from "react";

interface Props {
  order: IOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsDrawer({ order, isOpen, onClose }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!order) return null;

  const handleStatusUpdate = async (newStatus: string) => {
    if (newStatus === order.status) return;
    setIsUpdating(true);
    try {
      const result = await updateOrderStatus(order._id as string, newStatus);
      if (result.success) {
        window.location.reload();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleString("uk-UA")
    : "";

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-100 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-500 
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        className={`fixed top-0 right-0 z-100 w-full md:max-w-xl h-full bg-white flex flex-col transform transition-transform duration-500 ease-out border-l border-slate-100
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-50 shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
              Деталі замовлення
            </span>
            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
              ID-{order._id?.slice(-8).toUpperCase()}
            </h3>
          </div>
          <button
            aria-label="close"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-90"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8 space-y-10">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">
              Статус замовлення
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {FILTER_STATUS.filter((s) => s.id !== "all").map((status) => {
                const isActive = order.status === status.id;
                const Icon = status.icon;
                return (
                  <button
                    key={status.id}
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate(status.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all gap-2 ${
                      isActive
                        ? `${status.bg} ${status.color} border-transparent scale-105`
                        : "bg-white border-slate-50 text-slate-300 hover:border-slate-100"
                    }`}
                  >
                    <Icon size={18} strokeWidth={isActive ? 3 : 2} />
                    <span className="text-[9px] font-black uppercase tracking-tighter">
                      {status.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">
                Контактна особа
              </h4>
              <div className="bg-slate-50 rounded-[24px] p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    {order.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm">
                    <Phone size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    {order.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm">
                    <Calendar size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-500">
                    {date}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">
                Доставка
              </h4>
              <div className="bg-slate-50 rounded-[24px] p-5">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                    <MapPin size={16} />
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    Самовивіз / Доставка кур&apos;єром
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between ml-1">
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                Товари у замовленні
              </h4>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded-md">
                {order.items.length} ПОЗИЦІЇ
              </span>
            </div>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-white border border-slate-50 rounded-[20px] hover:border-slate-100 transition-all"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-200 shrink-0">
                    <Package size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-[13px] font-black text-slate-900 truncate uppercase tracking-tight">
                      {item.name}
                    </h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Кількість: {item.quantity} шт.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-slate-950">
                      {(item.price * item.quantity).toLocaleString()} ₴
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-slate-50 bg-slate-50/30 space-y-6 shrink-0">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                Загальна сума
              </span>
              <span className="text-4xl font-black text-slate-950 tracking-tighter leading-none">
                {order.totalPrice.toLocaleString()}{" "}
                <span className="text-lg opacity-30">₴</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="h-14 px-10 bg-slate-950 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-slate-800 transition-all active:scale-95 border border-slate-900"
            >
              Закрити
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
