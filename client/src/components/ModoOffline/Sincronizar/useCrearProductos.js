import {
  createProductoRequest,
  updateProductoRequest,
} from "../../../api/productos.api";

export const useCrearProductos = async (key) => {
  try {
    const productosCrear = JSON.parse(localStorage.getItem(key + "Crear"));

    if (productosCrear != null) {
      await Promise.all(productosCrear.map((producto) => {
        return createProductoRequest(producto);
      }));
      localStorage.removeItem(key + "Crear");

      alert("Productos a Crear Sincronizados");
    }

    const productosActualizar = JSON.parse(
      localStorage.getItem(key + "Actualizar")
    );

    if (productosActualizar != null) {
      await Promise.all(productosActualizar.map((producto) => {
        return updateProductoRequest(producto.id_producto, producto);
      }));
      localStorage.removeItem(key + "Actualizar");

      alert("Productos Actualizar Sincronizados");
    }
  } catch (error) {
    alert("Tenemos problemas para realizar la sincronización "+ error);
  }
 
};


export const updateProductoSync = (key) => {
  const productosActualizar = JSON.parse(
    localStorage.getItem(key + "Actualizar")
  );
};







