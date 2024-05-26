import { getTodosMovimientosRequest } from "../../../api/movimientos.api";
import { getProductosRequest } from "../../../api/productos.api";
import { getTodosFacturasRequest } from "../../../api/venta.api";
import { writeLocalStorage } from "../../../hooks/useLocalStorage";

 export const descargarTodos = async () => {
  descargarProductos();
  descargarMovimientos();
  descargarTransacciones();
};
//productos
const descargarProductos = async () => {
  const response = await getProductosRequest();

  writeLocalStorage("productos", response.data);
};

const descargarMovimientos = async () => {
  const response = await getTodosMovimientosRequest();

  writeLocalStorage("movimientos", response.data);
};

const descargarTransacciones = async () => {
  const { data } = await getTodosFacturasRequest();
  writeLocalStorage("facturas", data);
};
