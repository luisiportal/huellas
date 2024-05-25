import React from "react";

import CargarCarritoSection from "./CargarCarritoSection";
import { writeLocalStorage } from "../../hooks/useLocalStorage";

const CarritosGuardados = ({
  carrito1,
  carrito2,
  carrito3,
  carrito4,
  setCarrito,
  setRecargar,
  recargar,
  setnuCart,
  nuCart,
}) => {
  const eliminarCarrito = (numCart) => {
    localStorage.removeItem("carrito" + numCart);
    setnuCart(nuCart.filter((elem) => elem != numCart));
    writeLocalStorage("nuCart", nuCart.filter((elem) => elem != numCart));
    setCarrito([]);
    setRecargar(!recargar);
    alert("Carrito eliminado");
  };

  return (
    <>
      <CargarCarritoSection
        carrito={carrito1}
        nuCarrito={1}
        eliminarCarrito={eliminarCarrito}
      />
      <CargarCarritoSection
        carrito={carrito2}
        nuCarrito={2}
        eliminarCarrito={eliminarCarrito}
      />
      <CargarCarritoSection
        carrito={carrito3}
        nuCarrito={3}
        eliminarCarrito={eliminarCarrito}
      />
      <CargarCarritoSection
        carrito={carrito4}
        nuCarrito={4}
        eliminarCarrito={eliminarCarrito}
      />
    </>
  );
};

export default CarritosGuardados;
