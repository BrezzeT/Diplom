"use server";
import { connectDB } from "../db";
import Product from "../models/Product";
import { IProduct } from "@/types/types";
import { revalidatePath } from "next/cache";

export const createProduct = async (product: IProduct) => {
  try {
    await connectDB();
    const newProduct = await Product.create(product);
    revalidatePath("/admin/products");
    revalidatePath("/catalog");
    return { success: true, data: JSON.parse(JSON.stringify(newProduct)) };
  } catch (error) {
    console.log(error, "Ошибка при створенні продукту");
    return { success: false, error: "Помилка при створенні продукту" };
  }
};
export const getAllProduct = async () => {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log(error, "Помилка при отриманні продуктів");
    return [];
  }
};
export const deleteProduct = async (id: string) => {
  try {
    await connectDB();
    const product = await Product.deleteOne({ _id: id });
    revalidatePath("/admin/products");
    revalidatePath("/catalog");
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.log(error, "Помилка при видаленні продукту");
    return null;
  }
};
