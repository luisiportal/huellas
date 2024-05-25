import React, { useEffect, useState } from "react";

import FacturaCard from "./FacturaCard";
import { getTodosFacturasRequest } from "../../api/venta.api";
import H2FechaTitulo from "./H2FechaTitulo";
import { useAuth } from "../../context/AuthContext";
import {
  readLocalStorage,
  writeLocalStorage,
} from "../../hooks/useLocalStorage";

const ResumenVenta = () => {
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
          facturas.map((factura) =>
            new Date(factura.creado).toLocaleDateString("es-ES", opciones)
          )
        ),
      ]);
    };
    loadFacturas();
  }, []);

  /* function renderMain() {
    if (facturas.length === 0) return <h1>No hay ventas</h1>;
    return facturas.map((factura) => (
      <FacturaCard factura={factura} key={factura.id} />
    ));
  }*/

  function renderMain() {
    if (fechas.length === 0) return <h1>No hay ventas</h1>;
    //if (facturas.length === 0) return <h1>No hay ventas</h1>;
    return fechas.map((fecha) => (
      <H2FechaTitulo
        fecha={fecha}
        opciones={opciones}
        facturas={facturas}
        setFacturas={setFacturas}
      />
    ));
  }

  return (
    <div>
      <h1 className=" px-2 pb-2 text-3xl text-slate-700 font-bold">Ventas</h1>
      <div className="gap-2 mt-8 ">{renderMain()};</div>
    </div>
  );
};

export default ResumenVenta;
