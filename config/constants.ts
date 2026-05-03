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
