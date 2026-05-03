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
