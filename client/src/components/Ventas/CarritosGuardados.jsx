import React from "react";
import Btn_Huellas from "../Btn_Huellas";
import BorrarSVG from "../SVG/BorrarSVG";

const CarritosGuardados = ({
  cargarCarrito,
  carrito1,
  carrito2,
  carrito3,
  carrito4,
  setCarrito,
  setRecargar,
  recargar,
}) => {
  const eliminarCarrito = (numCart) => {
    localStorage.removeItem("carrito" + numCart);
    setCarrito([]);
    setRecargar(!recargar);
    alert("Carrito eliminado");
  };

  return (
    <>
      {carrito1 && (
        <div className="flex">
          <Btn_Huellas
            text={"Carrito1"}
            onclick={() => cargarCarrito(1)}
            type={"button"}
          />
          <button onClick={() => eliminarCarrito(1)}>
            <BorrarSVG />
          </button>
        </div>
      )}
      {carrito2 && (
        <Btn_Huellas
          text={"Carrito2"}
          onclick={() => cargarCarrito(2)}
          type={"button"}
        />
      )}
      {carrito3 && (
        <Btn_Huellas
          text={"Carrito3"}
          onclick={() => cargarCarrito(3)}
          type={"button"}
        />
      )}
      {carrito4 && (
        <Btn_Huellas
          text={"Carrito4"}
          onclick={() => cargarCarrito(4)}
          type={"button"}
        />
      )}
    </>
  );
};

export default CarritosGuardados;
