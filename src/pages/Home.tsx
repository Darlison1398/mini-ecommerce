import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { ProductSkeleton } from "../components/ProductSkeleton";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Produtos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        Nenhum produto encontrado
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Produtos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition p-4"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain mb-4"
            />

            <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
              {product.title}
            </h2>

            <p className="text-green-600 font-bold mt-2">
              R$ {product.price.toFixed(2)}
            </p>

            {user?.role === "client" && (
              <button
                  onClick={() => {
                    addToCart(product); 
                    toast.success("Produto adicionado ao carrinho!");
                  }}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                Adicionar ao carrinho
              </button>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};