"use client";

import { useState } from "react";
import { ImagePlus, UploadCloud, Info } from "lucide-react";
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

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Додати товар
          </h1>
          <p className="text-slate-500">
            Створіть новий продукт у вашому каталозі
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 border border-slate-200 rounded-2xl font-semibold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Скасувати
          </button>
          <button
            disabled={isSubmitting}
            onClick={handleSave}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Збереження..." : "Зберегти товар"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm space-y-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Info size={22} className="text-indigo-500" />
              Основна інформація
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Назва продукту
                </label>
                <input
                  type="text"
                  placeholder="Введіть назву продукту"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-200 focus:bg-white transition-all font-medium mt-1"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Опис продукту
                </label>
                <textarea
                  placeholder="Введіть опис продукту"
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-200 focus:bg-white transition-all font-medium resize-none mt-1"
                />
              </div>
            </div>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm space-y-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <ImagePlus size={22} className="text-indigo-500" />
              Медіафайли
            </h2>
            <label className="relative group cursor-pointer block">
              <input type="file" className="hidden" accept="image/*" />
              <div className="h-72 border-2 border-dashed border-slate-200 bg-slate-50 rounded-3xl flex flex-col items-center justify-center group-hover:bg-indigo-50/50 group-hover:border-indigo-200 transition-all duration-300">
                <div className="p-5 bg-white rounded-full shadow-sm text-slate-300 group-hover:text-indigo-500 mb-4 transition-all">
                  <UploadCloud size={36} />
                </div>
                <p className="font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">
                  Натисніть для завантаження
                </p>
                <p className="text-xs  mt-1 font-medium italic text-indigo-500">
                  Тільки картинки до 5MB
                </p>
              </div>
            </label>
            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-slate-50 border border-slate-100 border-dashed rounded-2xl flex items-center justify-center text-slate-300"
                >
                  <ImagePlus size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              Вартість та Кількість
            </h2>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder="123"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-200 transition-all font-bold text-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                  UAH
                </span>
              </div>
              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder="123"
                  value={formData.stock || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                  }
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-200 transition-all font-bold text-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                  ШТ
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              Категорія
            </h2>
            <div className="flex flex-wrap gap-2">
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
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all active:scale-95 ${
                    formData.category === cat
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                      : "bg-slate-50 border-slate-100 text-slate-600 hover:border-indigo-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {formData.category && CATEGORY_DEPENDENCIES[formData.category] && (
            <>
              <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Бренд
                </h2>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_DEPENDENCIES[formData.category].brands.map(
                    (brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setFormData({ ...formData, brand })}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all active:scale-95 ${
                          formData.brand === brand
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:border-indigo-200"
                        }`}
                      >
                        {brand}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Колір
                </h2>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_DEPENDENCIES[formData.category].colors.map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all active:scale-95 ${
                          formData.color === color
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:border-indigo-200"
                        }`}
                      >
                        {color}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
