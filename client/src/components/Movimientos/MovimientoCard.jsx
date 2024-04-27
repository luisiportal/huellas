import { useState, useEffect } from "react";
import { getTodosMovimientosRequest } from "../../api/movimientos.api";

const MovimientoCard = () => {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    const loadProducto = async () => {
      try {
        const response = await getTodosMovimientosRequest();
        setMovimientos(response.data);
      } catch (error) {}
    };

    loadProducto();
  }, []);
  return (
    <div className="mx-2 bg-neutral-200 rounded-md">
      {movimientos.map((movimiento, id_movimiento) => (
        <header key={id_movimiento} className="flex p-1 rounded">
          {/* imagen del prodcuto */}
          <div></div>
          <div
            className={`rounded flex shadow-xl w-screen overflow-hidden ${
              movimiento.tipo === "Entrada" ? "bg-green-400  " : "bg-red-400"
            }`}
          >
            <img
              className="object-cover object-center w-28 h-28 border-slate-50 border-spacing-2"
              src={`../images/productos/${movimiento.producto.ruta_image}`}
              alt="Imagen de Producto"
            />
            <div className="p-2 text-left">
              <h2 className="text-md font-semibold ">
                {movimiento.producto.nombre_producto}
              </h2>
              <h3 className="text-sm font-semibold">
                Cantidad: {movimiento.cantidad}
              </h3>
              <h3 className="text-sm font-semibold">Tipo: {movimiento.tipo}</h3>
              <span className="text-sm text-slate-900">
                Fecha : {new Date(movimiento.createdAt).toLocaleString('es-ES')}
              </span>
            </div>
          </div>
        </header>
      ))}
    </div>
  );
};

export default MovimientoCard;
