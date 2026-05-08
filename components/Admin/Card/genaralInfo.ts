import { Package, AlertCircle, Coins, ShoppingBag } from "lucide-react";

export const getCardHome = (
  productsCount: number,
  outOfStock: number,
  ProductCash: number,
  ordersCount: number,
) => [
  {
    title: "Всього товарів",
    value: productsCount,
    unit: "шт.",
    icon: Package,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "Немає в наявності",
    value: outOfStock,
    unit: "поз.",
    icon: AlertCircle,
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    title: "Загальна вартість",
    value: ProductCash.toLocaleString(),
    unit: "₴",
    icon: Coins,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    title: "Виконано замовлень",
    value: ordersCount,
    unit: "замов.",
    icon: ShoppingBag,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];
