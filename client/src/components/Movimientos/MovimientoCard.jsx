import { deleteMovimientoRequest } from "../../api/movimientos.api";

import Bton_eliminar_producto from "../Ventas/Bton_eliminar_producto";
import { writeLocalStorage } from "../../hooks/useLocalStorage";

import EditSVG from "../SVG/EditSVG";
import { useNavigate } from "react-router-dom";

const MovimientoCard = ({
  movimiento,
  setMovimientos,
  movimientos,
  setModalActivo,
  isOnline,
  setEditando,
}) => {
  const navigate = useNavigate();

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
        alert(error);
      }
    } else {
      // El usuario hizo clic en "Cancelar", puedes poner aquí el código para la acción cancelada
    }
  };

  return (
    <div className="mx-2 bg-neutral-200 rounded-md">
      <header className="flex p-1 rounded">
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
            <span className="text-sm text-slate-900 flex">
              Fecha :{" "}
              {new Date(
                movimiento?.creado ?? movimiento.createdAt
              ).toLocaleString("es-ES")}{" "}
              <button
                onClick={() => {
                  setEditando(movimiento.id_movimiento);
                }}
              >
                <EditSVG />
              </button>
            </span>
          </div>

          {movimiento.tipo != "Venta" && (
            <button onClick={() => handleEliminar(movimiento.id_movimiento)}>
              <Bton_eliminar_producto />
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default MovimientoCard;
