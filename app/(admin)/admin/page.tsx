import Card from "@/components/Admin/Card/Card";
import { getAllProduct } from "@/lib/action/product.action";
import { IProduct } from "@/types/types";

export default async function AdminPage() {
  const products = await getAllProduct();
  const outOfStock = products.filter(
    (p: IProduct) => (p.stock ?? 0) <= 0,
  ).length;
  const productCast = products.reduce(
    (acc: number, p: IProduct) => acc + (p.price ?? 0) * (p.stock ?? 0),
    0,
  );
  return (
    <div>
      <section className="p-1">
        <Card
          productsCount={products?.length as number}
          outOfStock={outOfStock as number}
          productCash={productCast as number}
        />
      </section>
    </div>
  );
}
