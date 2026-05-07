"use client";
import { Edit, Trash2, Image as ImageIcon, ShoppingCart } from "lucide-react";
import { IProduct } from "@/types/types";
import { deleteProduct } from "@/lib/action/product.action";
import { useCartStore } from "@/lib/store/cart";

interface Props {
  product: IProduct;
  isAdmin?: boolean;
}

export default function ProductCard({ product, isAdmin }: Props) {
  const { addItem, toggleCart } = useCartStore();
  const isOutStock = (product.stock ?? 0) <= 0;
  const handleDelete = async () => {
    if (window.confirm("Ви точно хочете видалити товар?")) {
      await deleteProduct(product._id as string);
    }
  };

  return (
    <div
      className={`group flex flex-col rounded-[28px] transition-all duration-500 border overflow-hidden
        ${
          isAdmin
            ? "bg-white border-orange-500/10 hover:shadow-2xl hover:shadow-orange-500/5 hover:-translate-y-1"
            : "bg-slate-950/40 border-white/5 backdrop-blur-xl hover:bg-slate-950/60 hover:shadow-[0_0_40px_-15px_rgba(249,115,22,0.3)] hover:-translate-y-1"
        }
      `}
    >
      <div
        className={`relative aspect-square m-2 rounded-[22px] overflow-hidden flex items-center justify-center transition-colors duration-500 ${
          isAdmin
            ? "bg-slate-50 group-hover:bg-orange-50/50"
            : "bg-slate-800/40 group-hover:bg-slate-800/60"
        }`}
      >
        <ImageIcon
          size={48}
          strokeWidth={1}
          className={`transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 ${
            isAdmin
              ? "text-slate-200 group-hover:text-orange-300"
              : "text-slate-700 group-hover:text-orange-400"
          }`}
        />
        <div className="absolute top-3 left-3 right-3 flex justify-between gap-2">
          {product.category && (
            <span
              className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg backdrop-blur-md border ${
                isAdmin
                  ? "bg-white/80 border-orange-500/10 text-orange-600"
                  : "bg-black/40 border-white/10 text-orange-400"
              }`}
            >
              {product.category}
            </span>
          )}
          {isAdmin && (
            <span
              className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg backdrop-blur-md border ${
                (product.stock ?? 0) <= 5
                  ? "bg-red-500/10 border-red-500/20 text-red-500"
                  : "bg-white/80 border-slate-100 text-slate-500"
              }`}
            >
              {product.stock ?? 0} ШТ
            </span>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest opacity-50 ${isAdmin ? "text-slate-500" : "text-slate-400"}`}
          >
            {product.brand || "Brand"}
          </span>
          <h3
            className={`text-base font-bold mt-1 line-clamp-1 transition-colors ${
              isAdmin
                ? "text-slate-800 group-hover:text-orange-600"
                : "text-white group-hover:text-orange-400"
            }`}
          >
            {product.name}
          </h3>
        </div>
        <div
          className={`mt-auto flex items-center justify-between pt-4 border-t ${
            isAdmin ? "border-slate-50" : "border-white/5"
          }`}
        >
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 text-slate-400">
              Ціна
            </span>
            <span
              className={`text-xl font-black tracking-tight ${isAdmin ? "text-slate-900" : "text-white"}`}
            >
              {product.price}{" "}
              <span className="text-sm font-bold opacity-70">₴</span>
            </span>
          </div>

          <div className="flex gap-1.5">
            {isAdmin ? (
              <>
                <button
                  className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-xl transition-all border border-transparent hover:border-slate-100 active:scale-90"
                  aria-label="Редагувати"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={handleDelete}
                  aria-label="Видалити"
                  className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-md rounded-xl transition-all border border-transparent hover:border-slate-100 active:scale-90"
                >
                  <Trash2 size={16} />
                </button>
              </>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (!isOutStock) {
                    addItem({
                      id: product._id,
                      name: product.name || "",
                      price: product.price || 0,
                      image: Array.isArray(product.image)
                        ? product.image[0]
                        : product.image || "",
                      category: product.category || "",
                      color: product.color || "",
                      brand: product.brand || "",
                      stock: product.stock,
                      quantity: 1,
                    });
                    toggleCart();
                  }
                }}
                className={`p-3 rounded-xl transition-all group/btn ${
                  isOutStock
                    ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20 active:scale-90"
                }`}
                aria-label="В кошик"
                disabled={isOutStock}
              >
                <ShoppingCart
                  size={18}
                  className="transition-transform group-hover/btn:-rotate-12"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
