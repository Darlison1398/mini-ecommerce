import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  role?: "admin" | "client";
}

export const PrivateRoute = ({ children, role }: Props) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};