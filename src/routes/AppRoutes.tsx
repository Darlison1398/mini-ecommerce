import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Cart } from "../pages/Cart";
import { Orders } from "../pages/Orders";

// páginas (vamos criar depois)
const Admin = () => <h1>Admin</h1>;

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
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <Admin />
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