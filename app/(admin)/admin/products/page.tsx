import ProductList from "@/components/Admin/Product/ProductList";
import { getAllProduct } from "@/lib/action/product.action";
import Link from "next/link";
import Filter from "@/components/Admin/Filter/Filter";
export default async function ProductsPage() {
  const products = await getAllProduct();
  return (
    <div className="space-y-8 flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <h1 className="text-3xl font-bold">Управління товарами</h1>
        <Link
          href={"/admin/add-products"}
          className="mt-4 md:mt-0 px-8 py-3 bg-orange-500 text-white rounded-2xl font-bold shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-95"
        >
          Додати товар
        </Link>
      </div>
      <Filter />
      <ProductList initialProducts={products} isAdmin={true} />
    </div>
  );
}
