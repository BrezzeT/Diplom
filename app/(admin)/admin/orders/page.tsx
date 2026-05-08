export const dynamic = "force-dynamic";

import FilterOrder from "@/components/Admin/Filter/FilterOrder";
import OrderDrawer from "@/components/Admin/Order/OrderDrawer";
import { getOrders } from "@/lib/action/order.action";

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <div>
      <FilterOrder orders={orders} />
      <OrderDrawer />
    </div>
  );
}
