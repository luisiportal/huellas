import React from "react";
import FacturaCard from "./FacturaCard";

const H2FechaTitulo = ({ fecha, facturas, opciones, setRecargarFactura }) => {
  const facturasMismafecha = facturas.filter(
    (factura) =>
      new Date(factura.creado).toLocaleDateString("es-ES", opciones) == fecha
  );

  const totalVentaDia = facturasMismafecha.reduce(
    (sum, factura) => sum + Number(factura.total_venta),
    0
  );

  return (
    <section className="flex flex-1 flex-col" key={fecha}>
      <h2>
        {fecha} Venta {totalVentaDia}{" "}
      </h2>

      {facturasMismafecha.map((factura) => {
        return (
          <FacturaCard
            factura={factura}
            key={factura.id}
            setRecargarFactura={setRecargarFactura}
          />
        );
      })}
    </section>
  );
};

export default H2FechaTitulo;
