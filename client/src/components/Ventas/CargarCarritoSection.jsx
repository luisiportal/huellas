import React from "react";
import BorrarSVG from "../SVG/BorrarSVG";
import Btn_Huellas from "../Btn_Huellas";
import { useCarritos } from "../../context/CarritosContext";

const CargarCarritoSection = ({ carrito, nuCarrito, eliminarCarrito }) => {
  const { cargarCarrito } = useCarritos();

  return (
    <>
      {carrito && (
    
        <div className="flex">
          <Btn_Huellas
            text={"Carrito " + String(nuCarrito)}
            onclick={() => cargarCarrito(nuCarrito)}
            type={"button"}
          />
          <button onClick={() => eliminarCarrito(nuCarrito)}>
            <BorrarSVG />
          </button>
        </div>
      )}
    </>
  );
};

export default CargarCarritoSection;
