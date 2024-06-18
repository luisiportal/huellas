import { useState, useEffect } from "react";
import {
  deleteMovimientoRequest,
  getTodosMovimientosRequest,
} from "../../api/movimientos.api";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Utilidades/Loader";
import Bton_eliminar_producto from "../Ventas/Bton_eliminar_producto";
import {
  readLocalStorage,
  writeLocalStorage,
} from "../../hooks/useLocalStorage";
import BTNCargarMas from "../Utilidades/BTNCargarMas";

const MovimientoCard = () => {
  const [movimientos, setMovimientos] = useState([]);
  const { loader, setLoader, isOnline, modalActivo, setModalActivo } =
    useAuth();

  useEffect(() => {
    const loadMovimientos = async (limit) => {
      try {
        setLoader(true);
        if (!isOnline) {
          setMovimientos(readLocalStorage("movimientos"));
        } else {
          const response = await getTodosMovimientosRequest(limit);
          setMovimientos(response.data);
          writeLocalStorage("movimientos", response.data);
        }

        setLoader(false);
      } catch (error) {}
    };

    loadMovimientos(30);
  }, []);

  const handleEliminar = async (id) => {
    if (confirm("¿Estás a punto de eliminar un Movimiento ?")) {
      try {
        if (!isOnline) {
          writeLocalStorage(
            "movimientos",
            movimientos.filter((movimiento) => movimiento.id_movimiento !== id)
          );
        } else {
          const response = await deleteMovimientoRequest(id);
          setMovimientos(
            movimientos.filter((movimiento) => movimiento.id_movimiento !== id)
          );
          writeLocalStorage(
            "movimientos",
            movimientos.filter((movimiento) => movimiento.id_movimiento !== id)
          );
        }

        setModalActivo({
          mensaje: "Movimiento Eliminado",
          activo: true,
          errorColor: true,
        });
      } catch (error) {
        setModalActivo({
          mensaje: error,
          activo: true,
          errorColor: true,
        });
      }
    } else {
      // El usuario hizo clic en "Cancelar", puedes poner aquí el código para la acción cancelada
    }
  };

  return (
    <div className="mx-2 bg-neutral-200 rounded-md">
      {movimientos.map((movimiento, id_movimiento) => (
        <header key={id_movimiento} className="flex p-1 rounded">
          {/* imagen del prodcuto */}
          <div></div>
          <div
            className={`rounded flex shadow-xl w-screen overflow-hidden ${
              movimiento.tipo === "Entrada" ||
              movimiento.tipo === "Existencia Inicial"
                ? "bg-green-400"
                : "bg-red-400"
            }`}
          >
            <img
              className="object-cover object-center w-28 h-28 border-slate-50 border-spacing-2"
              src={`../images/productos/${movimiento.producto.ruta_image}`}
              alt="Imagen de Producto"
            />
            <div className="p-2 text-left">
              <h2 className="text-md font-semibold ">
                {movimiento.producto?.nombre_producto ?? movimiento.producto}
              </h2>
              <h3 className="text-sm font-semibold">
                Cantidad: {movimiento.cantidad}
              </h3>
              <h3 className="text-sm font-semibold">Tipo: {movimiento.tipo}</h3>
              <span className="text-sm text-slate-900">
                Fecha :{" "}
                {new Date(
                  movimiento?.creado ?? movimiento.createdAt
                ).toLocaleString("es-ES")}
              </span>
            </div>

            {movimiento.tipo != "Venta" && (
              <button onClick={() => handleEliminar(movimiento.id_movimiento)}>
                <Bton_eliminar_producto />
              </button>
            )}
          </div>
        </header>
      ))}
      <BTNCargarMas
        estado={movimientos}
        setEstado={setMovimientos}
        getRecurso={getTodosMovimientosRequest}
        setLoader={setLoader}
      />
      {loader && <Loader />}
    </div>
  );
};

export default MovimientoCard;
