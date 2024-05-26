import React from "react";
import { useNavigate } from "react-router-dom";

const CarritoCard = ({ carrito, textoCarrito }) => {
  const navigate = useNavigate();

  return (
    <>
      {carrito && (
        <section
          onClick={() => navigate(`/transacciones/new/${parseInt(textoCarrito.split(" ")[1])}`)}
          className="bg-slate-300 rounded p-5 m-1 cursor-pointer"
        >
          <h2 className="font-bold">{textoCarrito}</h2>
          <h2>{carrito.producto}</h2>
          {carrito.map((producto, index) => (
            <div className="flex justify-between" key={index}>
              <div className="flex">
                <h2>
                  {producto.cantidad} {producto.nombre_producto}
                </h2>
              </div>
            </div>
          ))}
          <h2></h2>
        </section>
      )}
    </>
  );
};

export default CarritoCard;
