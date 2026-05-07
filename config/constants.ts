import { LayoutGrid, Wallet, CheckCircle2, XCircle, Clock } from "lucide-react";

export const FilterCategories = [
  {
    title: "Категорія",
    content: ["Телефони", "Ноутбуки", "Планшети", "Аксесуари"],
  },
  {
    title: "Бренд",
    content: ["Samsung", "Apple", "Xiaomi", "Huawei"],
  },
  {
    title: "Колір",
    content: ["Чорний", "Білий", "Синій", "Червоний"],
  },
];
export const CATEGORIES = ["Телефони", "Ноутбуки", "Планшети", "Аксесуари"];
export const CATEGORY_DEPENDENCIES: Record<
  string,
  { brands: string[]; colors: string[] }
> = {
  Телефони: {
    brands: ["Apple", "Samsung", "Xiaomi", "Google"],
    colors: ["Чорний", "Білий", "Срібний", "Синій"],
  },
  Ноутбуки: {
    brands: ["Apple", "Asus", "Lenovo", "HP", "Dell"],
    colors: ["Space Gray", "Срібний", "Чорний"],
  },
  Планшети: {
    brands: ["Apple", "Samsung", "Lenovo"],
    colors: ["Space Gray", "Рожевий", "Срібний"],
  },
  Аксесуари: {
    brands: ["Apple", "Baseus", "Hoco", "Belkin"],
    colors: ["Чорний", "Білий"],
  },
};
export const FILTER_STATUS = [
  {
    id: "all",
    label: "Всі замовлення",
    icon: LayoutGrid,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "pending",
    label: "В обробці",
    icon: Clock,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: "completed",
    label: "Виконані",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: "cancelled",
    label: "Скасовані",
    icon: XCircle,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];
