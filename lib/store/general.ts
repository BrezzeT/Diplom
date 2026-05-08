import { create } from "zustand";

// State для фильтров
interface UIState {
  isFilterOpen: boolean;
  isSidebarOpen: boolean;
  toggleFilter: () => void;
  toggleSidebar: () => void;
  expanded: string | null;
  toggleExpanded: (title: string) => void;
}
export const useUIStore = create<UIState>((set) => ({
  isFilterOpen: false,
  isSidebarOpen: false,
  expanded: null,
  toggleExpanded: (title: string) =>
    set((state) => ({
      expanded: state.expanded === title ? null : title,
    })),
  toggleFilter: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
interface FilterStateAdmin {
  category: string | null;
  brand: string | null;
  stockStatus: "all" | "inStock" | "outOfStock";
  color: string | null;

  setCategory: (cat: string | null) => void;
  setBrand: (brand: string | null, color: string | null) => void;
  setStockStatus: (status: "all" | "inStock" | "outOfStock") => void;
  setColor: (color: string | null) => void;
}

export const useAdminFilterStore = create<FilterStateAdmin>((set) => ({
  category: null,
  brand: null,
  stockStatus: "all",
  color: null,

  setCategory: (cat) =>
    set({
      category: cat,
      brand: null,
      stockStatus: "all",
    }),
  setBrand: (brand, color) =>
    set({
      brand,
      color,
    }),
  setStockStatus: (status) =>
    set({
      stockStatus: status,
    }),
  setColor: (color) =>
    set({
      color,
    }),
}));

import { IOrder } from "@/types/types";

interface OrderDrawerState {
  isOpen: boolean;
  order: IOrder | null;
  openDrawer: (order: IOrder) => void;
  closeDrawer: () => void;
}

export const useOrderDrawerStore = create<OrderDrawerState>((set) => ({
  isOpen: false,
  order: null,
  openDrawer: (order) => set({ isOpen: true, order }),
  closeDrawer: () => set({ isOpen: false, order: null }),
}));
