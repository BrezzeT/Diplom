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
  const { items, addItem, toggleCart } = useCartStore();
  const cartItem = items.find((i) => i.id === product._id);
  const currentQty = cartItem?.quantity || 0;
  const isOutStock =
    (product.stock ?? 0) <= 0 || currentQty >= (product.stock ?? 0);
  const handleDelete = async () => {
    if (window.confirm("Ви точно хочете видалити товар?")) {
      await deleteProduct(product._id as string);
    }
  };

  if (isAdmin) {
    return (
      <div className="group flex items-center gap-4 md:gap-6 p-3 md:p-4 bg-white border border-slate-100 rounded-[24px] hover:border-orange-500/20 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
        <div className="relative w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-[18px] overflow-hidden flex items-center justify-center bg-slate-50">
          <ImageIcon size={24} className="text-slate-200 md:w-8 md:h-8" />
          <div className="absolute top-1.5 right-1.5">
            <span
              className={`px-2 py-1 text-[8px] font-black uppercase rounded-lg border ${
                (product.stock ?? 0) <= 5
                  ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20"
                  : "bg-white/90 border-slate-100 text-slate-500"
              }`}
            >
              {product.stock ?? 0}
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
                {product.brand || "Brand"}
              </span>
              {product.category && (
                <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[8px] font-bold uppercase rounded-md border border-slate-100">
                  {product.category}
                </span>
              )}
            </div>
            <h3 className="font-bold text-slate-800 text-sm md:text-base group-hover:text-slate-950 line-clamp-1 transition-colors">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center gap-4 md:gap-10 shrink-0">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-0.5">
                Ціна
              </span>
              <span className="text-lg font-black text-slate-950 tracking-tighter">
                {(product.price ?? 0).toLocaleString()}{" "}
                <span className="text-[10px] opacity-30 font-bold">₴</span>
              </span>
            </div>
            <div className="flex gap-2">
              <button
                className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 rounded-xl transition-all border border-transparent hover:border-blue-100 active:scale-90"
                title="Редагувати"
              >
                <Edit size={16} className="md:w-5 md:h-5" />
              </button>
              <button
                onClick={handleDelete}
                className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-xl hover:shadow-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-100 active:scale-90"
                title="Видалити"
              >
                <Trash2 size={16} className="md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col rounded-[32px] bg-slate-950/40 border border-white/5 backdrop-blur-xl hover:bg-slate-950/60 hover:shadow-[0_0_40px_-15px_rgba(249,115,22,0.3)] transition-all duration-500 overflow-hidden">
      <div className="relative aspect-4/5 m-2 rounded-[26px] overflow-hidden flex items-center justify-center bg-slate-800/40 group-hover:bg-slate-800/60 transition-colors duration-500">
        <ImageIcon
          size={42}
          strokeWidth={1}
          className="text-slate-700 group-hover:text-orange-400 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
        />
        {product.category && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-lg bg-black/40 border border-white/10 text-orange-400 backdrop-blur-md">
              {product.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-40">
            {product.brand || "Brand"}
          </span>
          <h3 className="text-sm md:text-base font-bold text-white group-hover:text-orange-400 mt-1 line-clamp-2 leading-tight transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest opacity-30 text-white mb-0.5">
              Ціна
            </span>
            <span className="text-lg md:text-xl font-black text-white tracking-tight">
              {(product.price ?? 0).toLocaleString()}{" "}
              <span className="text-[10px] md:text-xs font-bold opacity-40">
                ₴
              </span>
            </span>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              if (!isOutStock) {
                addItem({
                  id: product._id as string,
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
            disabled={isOutStock}
            title={
              (product.stock ?? 0) <= 0
                ? "Немає в наявності"
                : currentQty >= (product.stock ?? 0)
                  ? "Досягнуто ліміт на складі"
                  : "Додати в кошик"
            }
            className={`h-11 px-6 rounded-xl transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-2 ${
              isOutStock
                ? "bg-white/5 text-white/10 cursor-not-allowed border border-white/5"
                : "bg-orange-500 text-white hover:bg-orange-600 shadow-xl shadow-orange-500/20 active:scale-95"
            }`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
