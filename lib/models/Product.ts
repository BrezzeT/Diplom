import { Schema, model, models } from "mongoose";
import { IProduct } from "@/types/types";

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, default: 0 },
    image: [{ type: String }],
    category: { type: String, required: true },
    brand: { type: String },
    color: { type: String },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

const Product = models.Product || model<IProduct>("Product", ProductSchema);
export default Product;
