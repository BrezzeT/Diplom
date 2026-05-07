"use client";
import { useState } from "react";
import {
  ImagePlus,
  UploadCloud,
  Info,
  Check,
  Package,
  DollarSign,
  Layers,
} from "lucide-react";
import { CATEGORIES, CATEGORY_DEPENDENCIES } from "@/config/constants";
import { createProduct } from "@/lib/action/product.action";
import { IProduct } from "@/types/types";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<IProduct>({
    name: "",
    description: "",
    price: 0,
    image: [],
    category: "",
    brand: "",
    color: "",
    stock: 0,
  });

  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert("Будь ласка, заповніть обов'язкові поля!");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createProduct(formData);
      if (result) {
        alert("Товар успішно створено!");
        router.push("/admin/products");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const MediaBlock = ({ className }: { className?: string }) => (
    <div
      className={`bg-white border border-slate-100 rounded-[32px] p-6 md:p-12 space-y-8 md:space-y-10 ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 text-indigo-500 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
          <UploadCloud className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
            Медіа та фото
          </h2>
          <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Зображення товару
          </p>
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        <label className="relative group cursor-pointer block">
          <input type="file" className="hidden" accept="image/*" />
          <div className="h-48 md:h-80 border-2 border-dashed border-slate-100 bg-slate-50/30 rounded-[32px] md:rounded-[40px] flex flex-col items-center justify-center hover:bg-orange-500/5 hover:border-orange-500/20 transition-all duration-500">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center text-slate-200 group-hover:text-orange-500 mb-4 md:mb-6 transition-all border border-slate-50">
              <ImagePlus className="w-7 h-7 md:w-10 md:h-10" />
            </div>
            <p className="text-[10px] md:text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em] group-hover:text-orange-600 transition-colors">
              Завантажити фото
            </p>
          </div>
        </label>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-white border border-slate-50 border-dashed rounded-xl md:rounded-2xl flex items-center justify-center text-slate-100"
            >
              <ImagePlus className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Новий <span className="text-orange-500">товар</span>
          </h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
            Створення позиції в каталозі магазину
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="px-6 h-12 border border-slate-100 text-slate-400 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-slate-50 transition-all active:scale-95"
          >
            Скасувати
          </button>
          <button
            disabled={isSubmitting}
            onClick={handleSave}
            className="px-8 h-12 bg-slate-950 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Збереження..." : "Створити товар"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8 order-1">
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-12 space-y-8 md:space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                <Info size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
                  Основна інформація
                </h2>
                <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Назва та опис товару
                </p>
              </div>
            </div>

            <div className="space-y-6 md:space-y-10">
              <div className="space-y-2 md:space-y-3">
                <label className="text-xs font-bold text-slate-500 ml-1">
                  Назва продукту
                </label>
                <input
                  type="text"
                  placeholder="Наприклад: iPhone 15 Pro Max 256GB"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full h-12 md:h-16 px-5 md:px-8 bg-white border border-slate-100 rounded-xl md:rounded-[22px] outline-none focus:border-orange-500/20 text-sm md:text-lg font-bold text-slate-800 placeholder:text-slate-300 transition-all"
                />
              </div>

              <div className="space-y-2 md:space-y-3">
                <label className="text-xs font-bold text-slate-500 ml-1">
                  Опис товару
                </label>
                <textarea
                  placeholder="Додайте детальні характеристики та переваги товару..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-5 md:p-8 bg-white border border-slate-100 rounded-2xl md:rounded-[32px] outline-none focus:border-orange-500/20 text-sm md:text-lg font-bold text-slate-800 placeholder:text-slate-300 transition-all resize-none"
                />
              </div>
            </div>
          </div>
          <MediaBlock className="hidden lg:block" />
        </div>

        <div className="lg:col-span-4 space-y-6 md:space-y-8 order-2">
          <section className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4 md:pb-6">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-emerald-50 text-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center">
                <DollarSign size={18} strokeWidth={3} />
              </div>
              <h2 className="text-[13px] md:text-[14px] font-black text-slate-900 uppercase tracking-widest">
                Ціна та Склад
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-8">
              <div className="space-y-2 md:space-y-3">
                <label className="text-xs font-bold text-slate-500 ml-1">
                  Вартість (UAH)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  className="w-full h-12 md:h-16 px-5 md:px-8 bg-slate-50/50 border border-slate-100 rounded-xl md:rounded-2xl outline-none focus:border-orange-500/20 text-base md:text-2xl font-black text-slate-800 placeholder:text-slate-200 transition-all"
                />
              </div>

              <div className="space-y-2 md:space-y-3">
                <label className="text-xs font-bold text-slate-500 ml-1">
                  На складі (ШТ)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.stock || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                  }
                  className="w-full h-12 md:h-16 px-5 md:px-8 bg-slate-50/50 border border-slate-100 rounded-xl md:rounded-2xl outline-none focus:border-orange-500/20 text-base md:text-2xl font-black text-slate-800 placeholder:text-slate-200 transition-all"
                />
              </div>
            </div>
          </section>

          <section className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4 md:pb-6">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-orange-50 text-orange-500 rounded-lg md:rounded-xl flex items-center justify-center">
                <Layers size={18} strokeWidth={3} />
              </div>
              <h2 className="text-[13px] md:text-[14px] font-black text-slate-900 uppercase tracking-widest">
                Категорія
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      category: cat,
                      brand: "",
                      color: "",
                    })
                  }
                  className={`h-10 md:h-12 px-4 md:px-6 rounded-xl md:rounded-2xl text-[10px] md:text-[12px] font-black uppercase tracking-widest border transition-all flex items-center justify-between ${
                    formData.category === cat
                      ? "bg-slate-950 border-slate-950 text-white"
                      : "bg-white border-slate-50 text-slate-400 hover:border-slate-200"
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  {formData.category === cat && (
                    <Check size={14} strokeWidth={3} />
                  )}
                </button>
              ))}
            </div>
          </section>

          {formData.category && CATEGORY_DEPENDENCIES[formData.category] && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              <section className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 space-y-6 md:space-y-8">
                <div className="flex items-center gap-3 border-b border-slate-50 pb-4 md:pb-6">
                  <div className="w-9 h-9 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                    <Package size={18} strokeWidth={3} />
                  </div>
                  <h2 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">
                    Бренд
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_DEPENDENCIES[formData.category].brands.map(
                    (brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setFormData({ ...formData, brand })}
                        className={`h-9 md:h-11 px-4 md:px-5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                          formData.brand === brand
                            ? "bg-slate-100 border-slate-200 text-slate-900"
                            : "bg-white border-slate-50 text-slate-400 hover:border-slate-200"
                        }`}
                      >
                        {brand}
                      </button>
                    ),
                  )}
                </div>
              </section>

              <section className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 space-y-6 md:space-y-8">
                <div className="flex items-center gap-3 border-b border-slate-50 pb-4 md:pb-6">
                  <div className="w-9 h-9 bg-slate-50 text-slate-900 rounded-lg flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  </div>
                  <h2 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">
                    Колір
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_DEPENDENCIES[formData.category].colors.map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`h-9 md:h-11 px-4 md:px-5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                          formData.color === color
                            ? "bg-slate-100 border-slate-200 text-slate-900"
                            : "bg-white border-slate-50 text-slate-400 hover:border-slate-200"
                        }`}
                      >
                        {color}
                      </button>
                    ),
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
        <MediaBlock className="lg:hidden order-3" />
      </div>

      <div className="md:hidden flex flex-col gap-3 pt-6 border-t border-slate-100 mt-4">
        <button
          disabled={isSubmitting}
          onClick={handleSave}
          className="w-full h-14 bg-slate-950 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? "Збереження..." : "Створити товар"}
        </button>
        <button
          onClick={() => router.back()}
          className="w-full h-14 bg-white border border-slate-100 text-slate-400 rounded-2xl font-black uppercase text-[11px] tracking-widest active:scale-95"
        >
          Скасувати
        </button>
      </div>
    </div>
  );
}
