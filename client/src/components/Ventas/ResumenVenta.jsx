import React, { useEffect, useState } from "react";

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
import BTNCargarMas from "../Utilidades/BTNCargarMas";
import Loader from "../Utilidades/Loader";

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
  const { isOnline, loader, setLoader, recargar, setRecargar, perfil } =
    useAuth();

  useEffect(() => {
    const loadFacturas = async (limit) => {
      try {
        if (!isOnline) {
          const data = readLocalStorage("facturas");

          setFacturas(data);
          loadFechas(data);
        } else {
          const { data } = await getTodosFacturasRequest(limit);
          writeLocalStorage("facturas", data);

          setFacturas(data);
          loadFechas(data);
        }
      } catch (error) {}
    };

    loadFacturas(30);
  }, [recargarFactura, recargar]);

  ///////////////trbajar aqui las fechas
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
        recargar={recargar}
        setRecargar={setRecargar}
        mostrarCuadrarDialog={mostrarCuadrarDialog}
        setMostrarCuadrarDialog={setMostrarCuadrarDialog}
      />
    ));
  }

  return (
    <div>
      <h1 className=" px-2 pb-2 text-3xl text-slate-700 font-bold">Ventas</h1>
      {mostrarCuadrarDialog && (
        <BTNHOME
          texto={
            <>
              <CuadreSVG /> {"Ventas"}
            </>
          }
          handleClick={() => setMostrarCuadrarDialog(!mostrarCuadrarDialog)}
        />
      )}

      {!mostrarCuadrarDialog ? (
        <div className="gap-2 mt-8 ">
          <>
            {renderMain()}
            <BTNCargarMas
              estado={facturas}
              setEstado={setFacturas}
              getRecurso={getTodosFacturasRequest}
              setLoader={setLoader}
              recargarFactura={recargarFactura}
              setRecargarFactura={setRecargarFactura}
              loadFechas={loadFechas}
            />
          </>
          ;
        </div>
      ) : (
        <EntrarEfectivo
          totalVentaHoy={totalVentaDia}
          perfil={perfil}
          venta={mostrarCuadrarDialog}
        />
      )}
      {loader && <Loader />}
    </div>
  );
};

export default ResumenVenta;
