import { useEffect, useState } from "react";
import { getProductosRequest } from "../api/productos.api";
import { readLocalStorage, writeLocalStorage } from "./useLocalStorage";
import { useAuth } from "../context/AuthContext";

export const useGetApiRequest = () => {
  const [productos, setProductos] = useState([]);
  const [isOnline] = useAuth();

  useEffect(() => {
    const loadProducto = async () => {
      try {
        if (!isOnline) {
         
          setProductos(readLocalStorage("productos"));
        } else {
          const { data } = await getProductosRequest();
          writeLocalStorage("productos", data);
          setProductos(data);
        }
      } catch (error) {}
    };

    loadProducto();
  }, []);

  return productos;
};
