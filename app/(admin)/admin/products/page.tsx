export const dynamic = "force-dynamic";

import ProductList from "@/components/Admin/Product/ProductList";
import { getAllProduct } from "@/lib/action/product.action";
import Filter from "@/components/Admin/Filter/Filter";

export default async function ProductsPage() {
  const products = await getAllProduct();
  return (
    <div className="space-y-6 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
          Управління <span className="text-orange-500">товарами</span>
        </h1>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
          Керування асортиментом магазину
        </p>
      </div>
      <Filter />
      <ProductList initialProducts={products} isAdmin={true} />
    </div>
  );
}
