import { Category } from "./category.model";
import { Product } from "./product.model";

export interface ServerResponse {
  success: boolean,
  message: string
}

// product
export interface ProductsResponse {
  success: boolean;
  message: string;
  products: Product[];
}

export interface ProductResponse {
  success: boolean;
  message: string;
  product: Product;
}

// category
export interface CategoriesResponse {
  success: boolean;
  message: string;
  categories: Category[];
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  category: Category;
}
