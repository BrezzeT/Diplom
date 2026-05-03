import {
  Box,
  BarChart,
  Home,
  LayoutDashboard,
  Settings,
  Store,
  Plus,
} from "lucide-react";
export const SabHeaderLinks = [
  {
    title: "Главная",
    href: "/",
  },
  {
    title: "Каталог",
    href: "/catalog",
  },
  {
    title: "Корзина",
    href: "/cart",
  },
  {
    title: "Войти",
    href: "/login",
  },
];
export const AdminSidebarLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    subLinks: [
      { title: "Головна", href: "/admin", icon: Home },
      { title: "Аналітика", href: "/admin/analytics", icon: BarChart },
    ],
  },
  {
    title: "E-Commerce",
    icon: Store,
    subLinks: [
      { title: "Товари", href: "/admin/products", icon: Box },
      { title: "Додати товар", href: "/admin/add-products", icon: Plus },
    ],
  },
  {
    title: "Налаштування",
    icon: Settings,
    href: "/admin/settings",
  },
];
