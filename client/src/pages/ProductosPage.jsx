import { useEffect } from "react";

import { useProductos } from "../context/ProductoProvider";
import ProductoCard from "../components/Productos/ProductoCard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ProductosPage = () => {
  const { productos, loadProductos } = useProductos();
  const { loader, setLoader } = useAuth();
  useEffect(() => {
    try {
      loadProductos();
    } catch (error) {}
  }, []);

  function renderMain() {
    if (productos.length === 0) return <h1>No hay productos</h1>;
    return productos.map((producto) => (
      <ProductoCard producto={producto} key={producto.id_producto} />
    ));
  }
  return (
    <div>
      <Link to={"/new"}>
        <button className="fixed  md:hidden bottom-5 right-8 bg-huellas_color hover:bg-slate-700 text-white font-extrabold py-10 px-10 rounded-full h-8 w-8 text-4xl flex justify-center items-center">
          +
        </button>
      </Link>
      <h1 className=" px-2 pb-2 text-3xl text-slate-700 font-bold">
        Productos
      </h1>
      <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 mt-8 ">
        {renderMain()};
      </div>
    </div>
  );
};

export default ProductosPage;
