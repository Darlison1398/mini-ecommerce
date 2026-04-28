import { Link } from "react-router-dom";
import { ShoppingCart, Sun, Moon, LogOut, Package } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../hooks/useTheme";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { theme, toggleTheme } = useTheme();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
      
      {/* LOGO */}
      <Link
        to="/"
        className="text-xl font-bold text-blue-600 hover:opacity-80 transition"
      >
        MiniShop
      </Link>

      {/* MENU */}
      <div className="flex items-center gap-3">

        {/* PEDIDOS */}
        <Link
          to="/orders"
          className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
        >
          <Package size={18} />
          <span className="hidden sm:block">Pedidos</span>
        </Link>

        {/* CARRINHO */}
        {user?.role === "client" && (
          <Link
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <ShoppingCart className="text-gray-700 dark:text-gray-200" />

            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full shadow">
                {totalItems}
              </span>
            )}
          </Link>
        )}

        {/* ADMIN */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
          >
            Admin
          </Link>
        )}

        {/* THEME */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition text-sm"
        >
          <LogOut size={16} />
          <span className="hidden sm:block">Sair</span>
        </button>
      </div>
    </nav>
  );
};