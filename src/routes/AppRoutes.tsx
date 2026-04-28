import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Cart } from "../pages/Cart";
import { Orders } from "../pages/Orders";
import { AdminProducts } from "../pages/AdminProducts";
import { AdminUsers } from "../pages/AdminUsers";

export const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <PrivateRoute role="admin">
              <AdminProducts />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <PrivateRoute role="admin">
              <AdminUsers />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute role="client">
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute role="client">
              <Orders />
            </PrivateRoute>
          }
        />

      </Routes>
  );
};