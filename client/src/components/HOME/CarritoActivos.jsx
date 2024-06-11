import React from "react";
import { useCarritos } from "../../context/CarritosContext";
import CarritoCard from "./CarritoCard";

const CarritoActivos = () => {
  const { carrito1, carrito2, carrito3, carrito4 } = useCarritos();

  return (
    <div className="flex flex-wrap justify-center mx-4">
   
      <CarritoCard carrito={carrito1} textoCarrito={"Carrito 1"} />
      <CarritoCard carrito={carrito2} textoCarrito={"Carrito 2"} />
      <CarritoCard carrito={carrito3} textoCarrito={"Carrito 3"} />
      <CarritoCard carrito={carrito4} textoCarrito={"Carrito 4"} />
    </div>
  );
};

export default CarritoActivos;
