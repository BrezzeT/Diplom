"use client";

import { useAdminFilterStore } from "@/lib/store/general";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types/types";

export default function ProductList({
  initialProducts,
  isAdmin = false,
}: {
  initialProducts: IProduct[];
  isAdmin?: boolean;
}) {
  const { category, brand, stockStatus, color } = useAdminFilterStore();

  const filterdProduct = initialProducts.filter((product) => {
    const catMatch = category ? product.category === category : true;
    const brandMatch = brand ? product.brand === brand : true;
    const colorMatch = color ? product.color === color : true;

    let stockMatch = true;
    if (stockStatus === "inStock") stockMatch = (product.stock ?? 0) > 0;
    if (stockStatus === "outOfStock") stockMatch = (product.stock ?? 0) <= 0;

    return catMatch && brandMatch && stockMatch && colorMatch;
  });
  return (
    <div
      className={`grid grid-cols-2 gap-2 ${isAdmin ? "md:grid-cols-3 lg:grid-cols-5" : "md:grid-cols-3 lg:grid-cols-4"}`}
    >
      {filterdProduct.length === 0 ? (
        <div className="col-span-full text-center text-slate-500 py-8">
          Продуктів не знайдено за цими фільтрами
        </div>
      ) : (
        filterdProduct.map((item: IProduct) => (
          <ProductCard key={item._id} product={item} isAdmin={isAdmin} />
        ))
      )}
    </div>
  );
}
