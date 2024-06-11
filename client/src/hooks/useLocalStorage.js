export function useLocalStorage(key, value) {
  try {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    }
  } catch (error) {
    console.error(error);
  }
}

export function writeLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  } catch (error) {
    console.error(error);
  }
}

export function writeLocalStorageHacerVenta(key, value) {
  try {
    let ventasARealizar = [];
    const getData = JSON.parse(localStorage.getItem(key));
    if (getData) {
      ventasARealizar = getData instanceof Array ? getData : [getData];
    }
    ventasARealizar.push(value);
    localStorage.setItem(key, JSON.stringify(ventasARealizar));

    return value;
  } catch (error) {
    console.error(error);
  }
}
export function writeLocalStorageCrearProducto(key, value) {
  ///  aquiiiiiiii crea un nuevo producto en local
  try {
    let productosCrear = [];
    const getData = JSON.parse(localStorage.getItem(key + "Crear"));

    if (getData) {
      productosCrear = getData instanceof Array ? getData : [getData];
    }

    productosCrear.unshift(value);
    localStorage.setItem(key + "Crear", JSON.stringify(productosCrear));

    let productos = [];
    const productosGET = JSON.parse(localStorage.getItem(key));

    if (productosGET) {
      productos = productosGET instanceof Array ? productosGET : [productosGET];
    }

    productos.unshift(value);
    localStorage.setItem(key, JSON.stringify(productos));

    return value;
  } catch (error) {
    console.error(error);
  }
}
export function writeLocalStorageActualizarProductos(key, value) {
  try {
    // trabajo con los elemtos que se van a sincronizar
    let itemsGuardados = localStorage.getItem(key + "Actualizar");

    if (itemsGuardados) {
      itemsGuardados = JSON.parse(itemsGuardados);
    } else {
      itemsGuardados = [];
    }

    const existe = itemsGuardados.filter(
      (item) => item.id_producto === value.id_producto
    );
    if (existe.length != 0) {
      itemsGuardados = itemsGuardados.map((item) => {
        if (item.id_producto == value.id_producto) {
          let obje = { ...item, ...value };

          return obje; // Esto fusionará las propiedades de 'item' y 'value', con las de 'value' sobrescribiendo las de 'item'
        } else {
          return item;
        }
      });
      localStorage.setItem(key + "Actualizar", JSON.stringify(itemsGuardados));
    } else {
      itemsGuardados.push(value);
      localStorage.setItem(key + "Actualizar", JSON.stringify(itemsGuardados));
    }

    //////////////////////////////////////////////////////////////////////////////////
    // actualizar listado
    let listado = localStorage.getItem(key);
    if (listado) {
      listado = JSON.parse(listado);
    } else {
      listado = [];
    }
    //  actualiza el item
    listado = listado.map((item) => {
      if (item.id_producto == value.id_producto) {
        let obje = { ...item, ...value };

        return obje; // Esto fusionará las propiedades de 'item' y 'value', con las de 'value' sobrescribiendo las de 'item'
      } else {
        return item;
      }
    });

    localStorage.setItem(key, JSON.stringify(listado));

    return value;
  } catch (error) {
    console.error(error);
  }
}

export function readLocalStorage(key) {
  try {
    localStorage.getItem(key);
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error);
  }
}

export function writeLocalStorageCrearFactura(value) {
  ///  aquiiiiiiii crea ufactura en local
  try {
    let facturas = [];
    const facturasGET = JSON.parse(localStorage.getItem("facturas"));

    if (facturasGET) {
      facturas = facturasGET instanceof Array ? facturasGET : [facturasGET];
    }

    facturas.unshift(value);
    localStorage.setItem("facturas", JSON.stringify(facturas));

    return value;
  } catch (error) {
    console.error(error);
  }
}

export function writeLocalStorageCrearMovimiento(value, venta) {
  ///  aquiiiiiiii crea mvimiento en local

  try {
    if (venta != "Venta") {
      // si el movimiento no es de venta hace esto ////
      let movimientosCrear = [];
      const getData = JSON.parse(localStorage.getItem("movimientosCrear"));

      if (getData) {
        movimientosCrear = getData instanceof Array ? getData : [getData];
      }

      movimientosCrear.unshift(value);
      localStorage.setItem(
        "movimientosCrear",
        JSON.stringify(movimientosCrear)
      );
    }

    let movimientos = [];
    const movimientosGET = JSON.parse(localStorage.getItem("movimientos"));

    if (movimientosGET) {
      movimientos =
        movimientosGET instanceof Array ? movimientosGET : [movimientosGET];
    }

    movimientos.unshift(value);
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

    const getDataProductos = JSON.parse(localStorage.getItem("productos"));

    const actProd = getDataProductos.map((producto) => {
      if (producto.nombre_producto == venta) {
        let existenciaActu = 0;

        if (value.tipo == "Salida" || value.tipo == "Venta") {
          existenciaActu = Number(producto.existencia) - Number(value.cantidad);
        } else {
          existenciaActu = Number(producto.existencia) + Number(value.cantidad);
        }

        let obje = { ...producto, existencia: existenciaActu };
   

        return obje;
      } else {
        return producto;
      }
    });

    localStorage.setItem("productos", JSON.stringify(actProd));
    return value;
  } catch (error) {
    console.error(error);
  }
}
