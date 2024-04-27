import { useEffect } from "react";

import { useProductos } from "../context/ProductoProvider";
import ProductoCard from "../components/Productos/ProductoCard";

const ProductosPage = () => {
  const { productos, loadProductos } = useProductos();

  useEffect(() => {
    loadProductos();
  }, []);

  function renderMain() {
    if (productos.length === 0) return <h1>No hay productos</h1>;
    return productos.map((producto) => (
      <ProductoCard producto={producto} key={producto.id_producto} />
    ));
  }
  return (
    <div>
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
