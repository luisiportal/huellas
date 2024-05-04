import React from "react";
import FacturaCard from "./FacturaCard";

const H2FechaTitulo = ({ fecha, facturas, opciones }) => {
  const facturasMismafecha = facturas.filter(
    (factura) =>
      new Date(factura.createdAt).toLocaleDateString("es-ES", opciones) == fecha
  );

  const totalVentaDia = facturasMismafecha.reduce(
    (sum, factura) => sum + Number(factura.total_venta),
    0
  );

  console.log(totalVentaDia);

  return (
    <section className="flex flex-1 flex-col" key={fecha}>
      <h2>{fecha} Venta {totalVentaDia} </h2>

      {facturasMismafecha.map((factura) => {
        return <FacturaCard factura={factura} key={factura.id} />;
      })}
    </section>
  );
};

export default H2FechaTitulo;
