"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { CreditCard, Truck, User, Phone, MapPin } from "lucide-react";
import { createOrder } from "@/lib/action/order.action";
import { IOrder } from "@/types/types";

export default function CheckoutForm() {
  const { items, getTotalPrice, clearCart, toggleCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    payment: "card",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData: IOrder = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        payment: formData.payment,
        totalPrice: getTotalPrice(),
        status: "pending",
        items,
      };
      const res = await createOrder(orderData);
      if (res) {
        alert("Дякуємо! Ваше замовлення прийнято.");
        clearCart();
        toggleCart();
      }
    } catch (error) {
      console.log(error);
      alert("Помилка створення замовлення");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/50">
            Контакти
          </h4>

          <div className="space-y-3">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
              <input
                required
                type="text"
                placeholder="Ваше ім'я"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-orange-500/30 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
              />
            </div>

            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
              <input
                required
                type="tel"
                placeholder="+380"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-orange-500/30 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/50">
            Доставка
          </h4>

          <div className="space-y-3">
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
              <input
                required
                type="text"
                placeholder="Місто"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-orange-500/30 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
              />
            </div>

            <div className="relative group">
              <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
              <input
                required
                type="text"
                placeholder="Відділення пошти / Адреса"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-orange-500/30 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/50">
            Оплата
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, payment: "card" })}
              className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                formData.payment === "card"
                  ? "bg-orange-500/10 border-orange-500 text-white shadow-lg shadow-orange-500/10"
                  : "bg-white/5 border-white/5 text-slate-500 hover:bg-white/10"
              }`}
            >
              <CreditCard size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Карткою
              </span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, payment: "cash" })}
              className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                formData.payment === "cash"
                  ? "bg-orange-500/10 border-orange-500 text-white shadow-lg shadow-orange-500/10"
                  : "bg-white/5 border-white/5 text-slate-500 hover:bg-white/10"
              }`}
            >
              <Truck size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                При отриманні
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 border-t border-white/5 bg-slate-900/50 backdrop-blur-xl shrink-0 space-y-5">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 pb-1">
            До сплати
          </span>
          <span className="text-3xl font-black text-white tracking-tighter">
            {getTotalPrice()} ₴
          </span>
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-4.5 bg-orange-500 text-white font-bold rounded-[22px] shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Оформлення...
            </span>
          ) : (
            "Підтвердити замовлення"
          )}
        </button>
      </div>
    </form>
  );
}
