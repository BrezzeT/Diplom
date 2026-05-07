import mongoose, { Schema, model, models } from "mongoose";
import { IOrder } from "@/types/types";
const OrderSchema = new Schema<IOrder>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  city: { type: String, required: true },
  address: { type: String, required: true },
  payment: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String },
      quantity: { type: Number, required: true },
      brand: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
export const Order = models.Order || model<IOrder>("Order", OrderSchema);
export default Order;
