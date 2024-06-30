import React, { useEffect, useState } from "react";
import ProductoCard from "./ProductoCard";
import BuscarSVG from "../SVG/BuscarSVG";
import Loader from "../Utilidades/Loader";
import BarraFiltrado from "../Utilidades/BarraFiltrado";
import { useProductos } from "../../context/ProductoProvider";

const BuscadorProducto = ({ loader, setLoader, isOnline }) => {
  const { productos, loadProductos } = useProductos();
  const [filtroProductos, setFiltroProductos] = useState([]);
  const [order, setOrder] = useState("DSC");
  useEffect(() => {
    try {
      loadProductos(isOnline);
    } catch (error) {
      console.log(error);
    }
  }, [filtroProductos]);

  const handleChange = (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = productos.filter((producto) =>
        producto.nombre_producto
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setTimeout(() => setLoader(false), 500);
      return setFiltroProductos(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <BarraFiltrado
        setFiltroProductos={setFiltroProductos}
        productos={productos}
        filtroProductos={filtroProductos}
        order={order}
        setOrder={setOrder}
      />

      <div className="flex gap-4 bg-white text-slate-900 font-bold text-sm m-2 shadow-md rounded-md text-center  md:w-2/5 lg:w-1/5 mx-5 ">
        <label htmlFor="buscarProducto"> </label>

        <BuscarSVG />

        <input
          className="w-full rounded-md"
          type="text"
          onChange={handleChange}
          placeholder="Buscar productos"
        />
      </div>
      <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 mt-8 ">
        {loader && <Loader />}
        {(filtroProductos.length > 0 ? filtroProductos : productos).map(
          (producto) => (
            <ProductoCard producto={producto} key={producto.id_producto} />
          )
        )}
      </div>
    </div>
  );
};

export default BuscadorProducto;
