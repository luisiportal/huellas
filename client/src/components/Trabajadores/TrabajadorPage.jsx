import React from "react";
import { useAuth } from "../../context/AuthContext";

import { useEffect } from "react";
import PerfilTrabajador from "./PerfilTrabajador";
import Login from "./LoginForm";

const Trabajador = () => {
  const { isAuthenticated, setIsAuthenticated, errors, login } = useAuth();
  // useEffect(() => {}, [isAuthenticated]);

  return <div>{isAuthenticated ? <PerfilTrabajador /> : <Login />}</div>;
};

export default Trabajador;
