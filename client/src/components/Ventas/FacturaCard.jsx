import { deleteFacturaRequest } from "../../api/venta.api";
import { useCarritos } from "../../context/CarritosContext";
import Bton_eliminar_producto from "./Bton_eliminar_producto";

function FacturaCard({ factura, setRecargarFactura }) {
  const { ventas } = factura;

  const handleEliminar = async (id) => {
    if (confirm("¿Estás a punto de eliminar una Venta ?")) {
      try {
        const response = await deleteFacturaRequest(id);
        ventas.filter((elem) => elem != id);
        setRecargarFactura(id);
        alert("Eliminado");
      } catch (error) {}
    } else {
      // El usuario hizo clic en "Cancelar", puedes poner aquí el código para la acción cancelada
    }
  };

  return (
    <div
      className={`mx-4 md:mx-1 my-1 bg-neutral-200 shadow rounded overflow-hidden p-2 max-w-md`}
    >
      <div className="px-3 text-left text-slate-700 font-semibold w-full h-full align-middle flex flex-col">
        <p>Factura : {factura.id}</p>

        {ventas.map((producto) => (
          <div className="flex justify-between" key={producto.id_venta}>
            <div className="flex">
              <h2> {producto.cantidad}x</h2>
              <h2>
                {producto.producto?.nombre_producto ?? producto.nombre_producto}
              </h2>
            </div>

            <h2>
              ${" "}
              {producto.precio_total_producto ??
                producto.precio_venta * producto.cantidad}{" "}
              cup
            </h2>
          </div>
        ))}

        <div className="text-right mt-5 flex-grow flex flex-col">
          <p>Total {factura.total_venta} cup</p>

          <p>{new Date(factura.creado).toLocaleString("es-ES")}</p>
        </div>
        <button onClick={() => handleEliminar(factura.id)}>
          <Bton_eliminar_producto />
        </button>
      </div>
    </div>
  );
}

export default FacturaCard;
