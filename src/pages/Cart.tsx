import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { items, increase, decrease, removeFromCart, total } = useCart();
  const navigate = useNavigate();
  const { checkout } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        Seu carrinho está vazio 🛒
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Carrinho</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
          >
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-20 h-20 object-contain"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-gray-800 dark:text-white">
                {item.product.title}
              </h2>

              <p className="text-green-600 font-bold">
                R$ {item.product.price.toFixed(2)}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decrease(item.product.id)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increase(item.product.id)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                removeFromCart(item.product.id);
                toast.success("Produto removido do carrinho!");
              }}
              className="text-red-500 hover:text-red-700"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span className="text-green-600">
            R$ {total.toFixed(2)}
          </span>
        </div>

        <button
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
          onClick={() => {
            checkout();
            toast.success("Compra finalizada com sucesso!");
            setTimeout(() => {
              navigate("/");
            }, 1500);
          }}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
};