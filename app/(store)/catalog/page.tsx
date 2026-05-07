export const dynamic = "force-dynamic";

import FilterCatalog from "@/components/Catalog/Filter";
import ProductList from "@/components/Admin/Product/ProductList";
import { getAllProduct } from "@/lib/action/product.action";
export default async function CatalogPage() {
  const products = await getAllProduct();
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <FilterCatalog />
      </div>
      <div className="w-full">
        <ProductList initialProducts={products} isAdmin={false} />
      </div>
    </div>
  );
}
