import React, { useEffect, useState } from "react";

import FacturaCard from "./FacturaCard";
import { getTodosFacturasRequest } from "../../api/venta.api";
import H2FechaTitulo from "./H2FechaTitulo";
import { useAuth } from "../../context/AuthContext";

import EntrarEfectivo from "../CuadreCaja/EntrarEfectivo";
import {
  readLocalStorage,
  writeLocalStorage,
} from "../../hooks/useLocalStorage";
import BTNHOME from "../HOME/elementos/BTNHOME";
import CuadreSVG from "../SVG/CuadreSVG";

const ResumenVenta = () => {
  const [recargarFactura, setRecargarFactura] = useState(null);
  const [mostrarCuadrarDialog, setMostrarCuadrarDialog] = useState(null);
  const [facturas, setFacturas] = useState([]);
  const [fechas, setFechas] = useState([]);
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const { isOnline } = useAuth();

  useEffect(() => {
    const loadFacturas = async () => {
      try {
        if (!isOnline) {
          const data = readLocalStorage("facturas");

          setFacturas(data);
          loadFechas(data);
        } else {
          const { data } = await getTodosFacturasRequest();
          writeLocalStorage("facturas", data);

          setFacturas(data);
          loadFechas(data);
        }
      } catch (error) {}
    };

    const loadFechas = async (facturas) => {
      // aquuiiii
      setFechas([
        ...new Set(
          facturas.map((factura, index) =>
            new Date(factura.creado).toLocaleDateString("es-ES", opciones)
          )
        ),
      ]);
    };
    loadFacturas();
  }, [recargarFactura]);

  ///////////////trbajar aqui las fechas

  const facturasMismafecha = facturas.filter(
    (factura) =>
      new Date(factura.creado).toLocaleDateString("es-ES", opciones) ==
      fechas[0]
  );

  const totalVentaDia = facturasMismafecha.reduce(
    (sum, factura) => sum + Number(factura.total_venta),
    0
  );

  /////////////////////////////////////////////////

  function renderMain() {
    if (fechas.length === 0) return <h1>No hay ventas</h1>;
    //if (facturas.length === 0) return <h1>No hay ventas</h1>;
    return fechas.map((fecha, index) => (
      <H2FechaTitulo
        key={index}
        fecha={fecha}
        opciones={opciones}
        facturas={facturas}
        setFacturas={setFacturas}
        setRecargarFactura={setRecargarFactura}
      />
    ));
  }

  return (
    <div>
      <h1 className=" px-2 pb-2 text-3xl text-slate-700 font-bold">Ventas</h1>
      <BTNHOME
        texto={
          <>
            <CuadreSVG /> {mostrarCuadrarDialog ? "Ventas" : "Cuadre de Caja"}
          </>
        }
        handleClick={() => setMostrarCuadrarDialog(!mostrarCuadrarDialog)}
      />
      {!mostrarCuadrarDialog ? (
        <div className="gap-2 mt-8 ">{renderMain()};</div>
      ) : (
        <EntrarEfectivo totalVentaHoy={totalVentaDia} />
      )}
    </div>
  );
};

export default ResumenVenta;
