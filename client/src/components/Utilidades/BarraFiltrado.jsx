import React, { useEffect, useState } from "react";
import ArrowUpSVG from "../SVG/ArrowUpSVG";
import DownArrowSVG from "../SVG/DownArrowSVG";
import BTNFiltrado from "./BTNFiltrado";

const BarraFiltrado = ({ setFiltroProductos, productos, order, setOrder }) => {
  const [activeBTN, setActiveBTN] = useState(null);

  const ordenarFecha = () => {
    if (order === "DSC") {
      setOrder("ASC");
      const DSC = productos.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setFiltroProductos(DSC);
    }
    if (order === "ASC") {
      setOrder("DSC");
      const ASC = productos.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setFiltroProductos(ASC);
    }
  };

  const ordenarPrecio = () => {
    if (order === "DSC") {
      setOrder("ASC");

      const precioDSC = productos.sort(
        (a, b) => Number(b.precio_venta) - Number(a.precio_venta)
      );

      setFiltroProductos(precioDSC);
    }
    if (order === "ASC") {
      setOrder("DSC");
      const precioASC = productos.sort(
        (a, b) => Number(a.precio_venta) - Number(b.precio_venta)
      );

      setFiltroProductos(precioASC);
    }
  };

  const ordenarCosto = () => {
    if (order === "DSC") {
      setOrder("ASC");

      const DSC = productos.sort(
        (a, b) => Number(b.costo_unitario) - Number(a.costo_unitario)
      );

      setFiltroProductos(DSC);
    }
    if (order === "ASC") {
      setOrder("DSC");
      const ASC = productos.sort(
        (a, b) => Number(a.costo_unitario) - Number(b.costo_unitario)
      );

      setFiltroProductos(ASC);
    }
  };
  const ordenarExistencia = () => {
    if (order === "DSC") {
      setOrder("ASC");

      const DSC = productos.sort(
        (a, b) => Number(b.existencia) - Number(a.existencia)
      );

      setFiltroProductos(DSC);
    }
    if (order === "ASC") {
      setOrder("DSC");
      const ASC = productos.sort(
        (a, b) => Number(a.existencia) - Number(b.existencia)
      );

      setFiltroProductos(ASC);
    }
  };
  const ordenarNombre = () => {
    if (order === "DSC") {
      setOrder("ASC");

      const DSC = productos.sort((a, b) =>
        a.nombre_producto.localeCompare(b.nombre_producto)
      );

      setFiltroProductos(DSC);
    }
    if (order === "ASC") {
      setOrder("DSC");
      const ASC = productos.sort((a, b) =>
        b.nombre_producto.localeCompare(a.nombre_producto)
      );

      setFiltroProductos(ASC);
    }
  };

  return (
    <div className="flex  flex-wrap justify-center">
      <BTNFiltrado
        handleOrdenar={ordenarFecha}
        campo={"Fecha"}
        tipo={"DSC"}
        estado={order}
        activeBTN={activeBTN === "Fecha"}
        setActiveBTN={setActiveBTN}
      />
      <BTNFiltrado
        handleOrdenar={ordenarPrecio}
        campo={"Precio"}
        tipo={"DSC"}
        estado={order}
        activeBTN={activeBTN === "Precio"}
        setActiveBTN={setActiveBTN}
      />
      <BTNFiltrado
        handleOrdenar={ordenarCosto}
        campo={"Costo"}
        tipo={"DSC"}
        estado={order}
        activeBTN={activeBTN === "Costo"}
        setActiveBTN={setActiveBTN}
      />
      <BTNFiltrado
        handleOrdenar={ordenarNombre}
        campo={"A-Z"}
        tipo={"DSC"}
        estado={order}
        activeBTN={activeBTN === "A-Z"}
        setActiveBTN={setActiveBTN}
      />
      <BTNFiltrado
        handleOrdenar={ordenarExistencia}
        campo={"Existencia"}
        tipo={"DSC"}
        estado={order}
        activeBTN={activeBTN === "Existencia"}
        setActiveBTN={setActiveBTN}
      />
    </div>
  );
};

export default BarraFiltrado;
