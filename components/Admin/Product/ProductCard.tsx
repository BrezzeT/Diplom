"use client";

import { Edit, Trash2, Image as ImageIcon, ShoppingCart } from "lucide-react";
import { IProduct } from "@/types/types";
import { deleteProduct } from "@/lib/action/product.action";

interface Props {
  product: IProduct;
  isAdmin?: boolean;
}

export default function ProductCard({ product, isAdmin }: Props) {
  const handleDelete = async () => {
    if (window.confirm("Ви точно хочете видалити товар?")) {
      await deleteProduct(product._id as string);
    }
  };
  return (
    <div
      className={`flex flex-col group rounded-[24px] transition-all duration-500 overflow-hidden border
        ${
          isAdmin
            ? "bg-white border-slate-200 hover:shadow-2xl hover:shadow-blue-500/10"
            : "bg-slate-900/30 border-white/5 backdrop-blur-md hover:bg-slate-900/60 hover:shadow-[0_0_30px_-10px_rgba(79,70,229,0.3)]"
        }
      `}
    >
      <div
        className={`relative aspect-square rounded-[24px] flex items-center justify-center text-slate-200 overflow-hidden transition-all duration-500
        ${
          isAdmin
            ? "bg-slate-50 border border-slate-50 group-hover:bg-blue-50/30"
            : "bg-slate-800/30 group-hover:bg-slate-800/50"
        }
      `}
      >
        <ImageIcon
          size={52}
          strokeWidth={1}
          className="group-hover:scale-110 group-hover:text-blue-400 transition-all duration-700"
        />
        {isAdmin && (
          <>
            <div className="absolute top-3 left-3 px-3 py-1 bg-white/80 backdrop-blur-md border border-white/50 rounded-full shadow-sm">
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none">
                {product.category || "General"}
              </p>
            </div>

            <div className="absolute top-3 right-3 px-3 py-1 bg-white/80 backdrop-blur-md border border-white/50 rounded-full shadow-sm">
              <p
                className={`text-[9px] font-black uppercase tracking-widest leading-none ${
                  (product.stock ?? 0) <= 5 ? "text-red-500" : "text-blue-600"
                }`}
              >
                {product.stock ?? 0} шт
              </p>
            </div>
          </>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {product.brand || "Brand"}
          </span>
          <h3
            className={`text-base font-bold transition-colors line-clamp-1 ${
              isAdmin
                ? "text-slate-900 group-hover:text-blue-600"
                : "text-white group-hover:text-blue-400"
            }`}
          >
            {product.name}
          </h3>
        </div>

        <div
          className={`flex items-center justify-between pt-3 border-t ${
            isAdmin ? "border-slate-50" : "border-white/5"
          }`}
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-slate-400">
              Ціна
            </span>
            <span
              className={`text-xl font-black ${
                isAdmin ? "text-slate-900" : "text-white"
              }`}
            >
              {product.price} ₴
            </span>
          </div>

          <div className="flex gap-1.5">
            {isAdmin ? (
              <>
                <button
                  className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-xl transition-all border border-transparent hover:border-slate-100"
                  aria-label="Редагувати"
                >
                  <Edit size={16} />
                </button>
                <button
                  className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-md rounded-xl transition-all border border-transparent hover:border-slate-100"
                  aria-label="Видалити"
                  onClick={handleDelete}
                >
                  <Trash2 size={16} />
                </button>
              </>
            ) : (
              <button
                className={`p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all active:scale-90 shadow-lg ${
                  isAdmin ? "shadow-blue-100" : "shadow-blue-500/20"
                }`}
                aria-label="Додати в кошик"
              >
                <ShoppingCart size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
