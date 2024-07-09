import React, { useState } from "react";
import FacturaCard from "./FacturaCard";
import CuadreSVG from "../SVG/CuadreSVG";
import BTNHOME from "../HOME/elementos/BTNHOME";
import { useNavigate } from "react-router-dom";

const H2FechaTitulo = ({
  fecha,
  facturas,
  opciones,
  setRecargarFactura,
  setRecargar,
  recargar,
  mostrarCuadrarDialog,
  setMostrarCuadrarDialog,
}) => {
  const navigate = useNavigate();
  const [fechaCuadre, setFechacuadre] = useState();
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
        {fecha} Venta {totalVentaDia}
        <div className="flex w-80">
          <BTNHOME
            texto={
              <>
                <CuadreSVG />
                {mostrarCuadrarDialog ? "Ventas" : "Cuadre de Caja"}
              </>
            }
            handleClick={() =>
              setMostrarCuadrarDialog({
                fechaVenta: facturasMismafecha[0].creado,
                totalVentaDia,
              })
            }
          />

          <BTNHOME
            texto={
              <>
                <CuadreSVG />
                {"Listar"}
              </>
            }
            enlace={`/cuadre/`}
          />
        </div>
      </h2>

      {facturasMismafecha.map((factura) => {
        return (
          <FacturaCard
            factura={factura}
            key={factura.id}
            setRecargarFactura={setRecargarFactura}
            recargar={recargar}
            setRecargar={setRecargar}
          />
        );
      })}
    </section>
  );
};

export default H2FechaTitulo;
