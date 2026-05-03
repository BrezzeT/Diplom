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
          className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all active:scale-90"
        >
          Додати товар
        </Link>
      </div>
      <Filter />
      <ProductList initialProducts={products} isAdmin={true} />
    </div>
  );
}
