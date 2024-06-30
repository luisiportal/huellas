import { createContext, useContext, useState } from "react";
import {
  getProductosRequest,
  deleteProductoRequest,
  createProductoRequest,
  getProductoRequest,
  updateProductoRequest,
} from "../api/productos.api";
import { ProductoContext } from "./ProductoContext";
import {
  cargarPlantillaTrabajadores,
  deleteTrabajadorRequest,
} from "../api/login.api";
import { readLocalStorage, writeLocalStorage } from "../hooks/useLocalStorage";

export const useProductos = () => {
  const context = useContext(ProductoContext);
  if (!context === undefined) {
    throw new Error("No hay contexto provider");
  }
  return context;
};

export const ProductoContextProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);

  async function loadTrabajadores() {
    const response = await cargarPlantillaTrabajadores();
    setTrabajadores(response.data);
  }

  const deleteTrabajador = async (id) => {
    try {
      const response = await deleteTrabajadorRequest(id);
      setTrabajadores(
        trabajadores.filter((trabajador) => trabajador.id_trabajador !== id)
      );

      setModalActivo({
        mensaje: "Se ha eliminado el trabajador correctamente",
        activo: true,
        errorColor: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function loadProductos(isOnline) {
    if (isOnline) {
      const response = await getProductosRequest();

      setProductos(response.data);
      writeLocalStorage("productos", response.data);
    } else {
      setProductos(readLocalStorage("productos"));
    }
  }

  const deleteProducto = async (id_producto) => {
    try {
      const response = await deleteProductoRequest(id_producto);
      setProductos(
        productos.filter((producto) => producto.id_producto !== id_producto)
      );

   
    } catch (error) {
      console.error(error);
    }
  };
  const createProducto = async (formData) => {
    try {
      await createProductoRequest(formData);
      // setTasks([...tasks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getProducto = async (id_producto) => {
    try {
      const response = await getProductoRequest(id_producto);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProducto = async (id_producto, formData) => {
    try {
      const response = await updateProductoRequest(id_producto, formData);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductoContext.Provider
      value={{
        productos,
        loadProductos,
        createProducto,
        deleteProducto,
        getProducto,
        updateProducto,
        deleteTrabajador,
        loadTrabajadores,
        trabajadores,
        setProductos,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
