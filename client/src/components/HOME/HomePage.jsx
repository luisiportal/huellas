import React, { useEffect, useState } from "react";
import BotoneraEntrada_Salida from "../BotoneraEntrada_Salida";

import { Link } from "react-router-dom";
import CarritoActivos from "./CarritoActivos";

import { sincronizarTodo } from "../ModoOffline/Sincronizar/sincronizar";
import { readLocalStorage } from "../../hooks/useLocalStorage";
import PendientesAsincronizar from "./PendientesAsincronizar";
import CarritoSVG from "../SVG/CarritoSVG";
import CuadreSVG from "../SVG/CuadreSVG";
import BTNHOME from "./elementos/BTNHOME";
import { useFetch } from "../../hooks/useFetch";

const HomePage = () => {
  const [pendientesSincronizar, setPendientesSincronizar] = useState(false);

  useEffect(() => {
    const cheqPendientes = async () => {
      if (
        (productos && productos.length > 0) ||
        (movimientos && movimientos.length > 0) ||
        (ventas && ventas.length > 0)
      ) {
        setPendientesSincronizar(true);
      } else {
        setPendientesSincronizar(false);
      }
    };
    cheqPendientes();
  }, []);

  const productos = readLocalStorage("productosActualizar");
  const movimientos = readLocalStorage("movimientosCrear");
  const ventas = readLocalStorage("ventas");

  return (
    <div className="pt-10">
      <BotoneraEntrada_Salida />
      <CarritoActivos />

      <BTNHOME
        texto={
          <>
            <CarritoSVG /> Nueva Orden
          </>
        }
        enlace={"/transacciones/new"}
      />

      {pendientesSincronizar && (
        <section className="">
          <PendientesAsincronizar
            setPendientesSincronizar={setPendientesSincronizar}
            productos={productos}
            movimientos={movimientos}
            ventas={ventas}
            sincronizarTodo={sincronizarTodo}
          />
        </section>
      )}
    </div>
  );
};

export default HomePage;
