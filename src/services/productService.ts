import { api } from "./api";
import type { Product } from "../types/Product";

export const productService = {
  async getAll(): Promise<Product[]> {
    const response = await api.get<Product[]>("/products");
    return response.data;
  },

  async getById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // MOCK (não salva na API)
  async create(product: Product): Promise<Product> {
    const products = JSON.parse(localStorage.getItem("products") || "[]");

    const newProduct = {
      ...product,
      id: Date.now(),
    };

    const updated = [...products, newProduct];
    localStorage.setItem("products", JSON.stringify(updated));

    return newProduct;
  },

  async update(product: Product): Promise<Product> {
    const products = JSON.parse(localStorage.getItem("products") || "[]");

    const updated = products.map((p: Product) =>
      p.id === product.id ? product : p
    );

    localStorage.setItem("products", JSON.stringify(updated));

    return product;
  },

  async delete(id: number): Promise<void> {
    const products = JSON.parse(localStorage.getItem("products") || "[]");

    const updated = products.filter((p: Product) => p.id !== id);

    localStorage.setItem("products", JSON.stringify(updated));
  },
};