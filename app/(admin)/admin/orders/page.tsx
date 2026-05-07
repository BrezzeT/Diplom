export const dynamic = "force-dynamic";

import { FilterOrder } from "@/components/Admin/Filter/FilterOrder";
import { getOrders } from "@/lib/action/order.action";
export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <div>
      <FilterOrder orders={orders} />
    </div>
  );
}
