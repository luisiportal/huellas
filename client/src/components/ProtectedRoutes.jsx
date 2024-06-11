import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { loading, user, isAuthenticated } = useAuth();

  if (loading) return <h1>Cargando</h1>;

  if (!isAuthenticated) return <Navigate to="/trabajador/login" replace />;

  return <Outlet></Outlet>;
};

export default ProtectedRoutes;
