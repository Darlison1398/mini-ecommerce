import type { Product } from "../types/Product";

const STORAGE_KEY = "products";

const getLocalProducts = (): Product[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLocalProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const productService = {
  async getAll(): Promise<Product[]> {
    const local = getLocalProducts();

    if (local.length > 0) return local;

    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    saveLocalProducts(data);

    return data;
  },

  create(product: Omit<Product, "id">): Product {
    const products = getLocalProducts();

    const newProduct: Product = {
      ...product,
      id: Date.now(),
    };

    const updated = [...products, newProduct];
    saveLocalProducts(updated);

    return newProduct;
  },

  update(updatedProduct: Product): Product {
    const products = getLocalProducts();

    const updated = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );

    saveLocalProducts(updated);

    return updatedProduct;
  },

  delete(id: number) {
    const products = getLocalProducts();

    const updated = products.filter((p) => p.id !== id);

    saveLocalProducts(updated);
  },
};