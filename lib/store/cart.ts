import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/types";

interface CartStore {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, type: "plus" | "minus") => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  isCartOpen: boolean;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id,
        );
        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, type) => {
        const currentItems = get().items;
        const item = currentItems.find((i) => i.id === id);
        if (!item) return;

        if (item.quantity === 1 && type === "minus") {
          get().removeItem(id);
          return;
        }

        if (type === "plus" && item.stock && item.quantity >= item.stock) {
          return;
        }

        set({
          items: currentItems.map((i) => {
            if (i.id === id) {
              const newQuantity =
                type === "plus" ? i.quantity + 1 : i.quantity - 1;
              return { ...i, quantity: newQuantity };
            }
            return i;
          }),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
