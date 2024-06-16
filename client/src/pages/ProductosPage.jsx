import { useEffect } from "react";

import { useProductos } from "../context/ProductoProvider";
import ProductoCard from "../components/Productos/ProductoCard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import BuscadorProducto from "../components/Productos/BuscadorProducto";
import BTNRedondo from "../components/Utilidades/BTNRedondo";

const ProductosPage = () => {
  const { loader, setLoader, isOnline } = useAuth();

  return (
    <div>
      <BTNRedondo ruta={"/new"} />
      <h1 className=" px-2 pb-2 text-3xl text-slate-700 font-bold">
        Productos
      </h1>
      <div>
        <BuscadorProducto loader={loader} setLoader={setLoader} isOnline={isOnline}/>
      </div>
    </div>
  );
};

export default ProductosPage;
