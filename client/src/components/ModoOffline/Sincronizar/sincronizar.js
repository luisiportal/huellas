import { sincronizarFacturas } from "./sincronizarFacturas";
import { sincronizarMovimientos } from "./sincronizarMovimientos";
import { useCrearProductos } from "./useCrearProductos";

export const sincronizarTodo = () => {
  useCrearProductos("productos");
  sincronizarMovimientos();
  sincronizarFacturas();
};
