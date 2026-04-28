import { useEffect, useState } from "react";
import type { Order } from "../types/Order";

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("orders");

    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        Nenhuma compra realizada ainda 🧾
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Histórico de Compras</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
          >
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">
                {new Date(order.date).toLocaleString()}
              </span>
              <span className="font-bold text-green-600">
                R$ {order.total.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-700 dark:text-white">
                    {item.product.title}
                  </span>
                  <span>x{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};