"use server";

import { connectDB } from "../db";
import Order from "../models/Order";
import { IOrder } from "@/types/types";
import Product from "../models/Product";

export async function createOrder(OrderData: IOrder) {
  try {
    await connectDB();
    const newOrder = await Order.create(OrderData);
    await newOrder.save();
    for (const item of OrderData.items) {
      await Product.findByIdAndUpdate(item.id, {
        $inc: { stock: -item.quantity },
      });
    }
    return { success: true, message: "Замовлення створено" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Помилка створення замовлення" };
  }
}
export async function getOrders() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.log(error);
    throw new Error("Помилка завантаження замовлень");
  }
}
