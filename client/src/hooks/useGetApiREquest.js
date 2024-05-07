import { useEffect, useState } from "react";
import { getProductosRequest } from "../api/productos.api";

export const useGetApiRequest = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const loadProducto = async () => {
      try {
        const { data } = await getProductosRequest();

        setProductos(data);
      } catch (error) {}
    };

    loadProducto();
  }, []);

   return productos;
};
