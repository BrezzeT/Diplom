export interface IProduct {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string[];
  category?: string;
  brand?: string;
  color?: string;
  stock?: number;
  createdAt?: Date;
}
export interface IOrder {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  payment: string;
  items: CartItem[];
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
  createdAt?: Date;
}
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock?: number;
  category?: string;
  color?: string;
  brand?: string;
}
