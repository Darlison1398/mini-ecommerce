import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem } from "../types/Cart";
import type { Product } from "../types/Product";
import type { ReactNode } from "react";
import type { Order } from "../types/Order";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increase: (productId: number) => void;
  decrease: (productId: number) => void;
  total: number;
  clearCart: () => void;
  checkout: () => void;
  isAnimating: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("cart");
            if (stored) {
                setItems(JSON.parse(stored));
            }
        } catch (error) {
            console.error("Erro ao carregar carrinho");
            localStorage.removeItem("cart");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);

            if (existing) {
                return prev.map((item) =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }

            return [...prev, { product, quantity: 1 }];
        });

        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 300);
    };

    const removeFromCart = (productId: number) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const increase = (productId: number) => {
        setItems((prev) =>
        prev.map((item) =>
            item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        );
    };

    const decrease = (productId: number) => {
        setItems((prev) =>
        prev
            .map((item) =>
            item.product.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)
        );
    };

    const total = Number(
        items
            .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
            .toFixed(2)
    );

    const clearCart = () => {
        setItems([]);
    };

    const checkout = () => {
        const newOrder: Order = {
            id: crypto.randomUUID(),
            items,
            total,
            date: new Date().toISOString(),
        };

        const storedOrders = localStorage.getItem("orders");
        const orders = storedOrders ? JSON.parse(storedOrders) : [];

        orders.push(newOrder);

        localStorage.setItem("orders", JSON.stringify(orders));

        setItems([]); 
    };

    return (
        <CartContext.Provider
        value={{ 
            items, 
            addToCart, 
            removeFromCart, 
            increase, decrease,
            total,
            clearCart,
            checkout,
            isAnimating
        }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro do CartProvider");
  }

  return context;
};