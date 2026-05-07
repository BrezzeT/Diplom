import { Package, AlertCircle, DollarSign, ShoppingCart } from "lucide-react";

export const getCardHome = (
  productsCount: number,
  outOfStock: number,
  ProductCash: number,
  ordersCount: number,
) => [
  {
    title: "Всього товарів",
    value: productsCount,
    icon: Package,
    color: "text-indigo-500",
    bg: "bg-indigo-500/20",
  },
  {
    title: "Немає в наявності",
    value: outOfStock,
    icon: AlertCircle,
    color: "text-red-500",
    bg: "bg-red-500/20",
  },
  {
    title: "Загальна вартість",
    value: ProductCash,
    icon: DollarSign,
    color: "text-green-500",
    bg: "bg-green-500/20",
  },
  {
    title: "Всього замовлень",
    value: ordersCount,
    icon: ShoppingCart,
    color: "text-yellow-500",
    bg: "bg-yellow-500/20",
  },
];
