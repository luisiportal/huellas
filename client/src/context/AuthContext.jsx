import React, { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import {
  cargarPerfilRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
} from "../api/login.api";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [perfil, setPerfil] = useState({
    username: "",
    nombre: "",
    apellidos: "",
    movil: "",
    puesto: "",
  });

  const signup = async (formData) => {
    try {
      await registerRequest(formData);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const login = async (user) => {
    setLoader(true);
    setUser(user);
    const { data } = await cargarPerfilRequest(user.id_trabajador);
    setLoader(false);
    setPerfil(data);
    setIsAuthenticated(true);
  };

  const cargarPerfil = async (id) => {
    const { data } = await cargarPerfilRequest(id);
    setPerfil(data);
  };

  const logout = async (user) => {
    try {
      setLoader(true);
      const res = await logoutRequest();
      setLoader(false);
      setUser(res.data);
      setIsAuthenticated(false);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        logout,
        errors,
        login,
        loading,
        setIsAuthenticated,
        cargarPerfil,
        perfil,
        loader,
        setLoader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
