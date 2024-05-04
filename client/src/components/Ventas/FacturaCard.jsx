function FacturaCard({ factura }) {
  const { ventas } = factura;

  return (
    <div
      className={`mx-4 md:mx-1 my-1 bg-neutral-200 shadow rounded overflow-hidden p-2 max-w-md`}
    >
      <div className="px-3 text-left text-slate-700 font-semibold w-full h-full align-middle flex flex-col">
        <p>Factura : {factura.id}</p>

        {ventas.map((producto) => (
          <div className="flex justify-between" key={producto.id_venta}>
            <div className="flex"><h2> {producto.cantidad}x</h2>
            <h2>{producto.producto.nombre_producto}</h2></div>

            <h2>$ {producto.precio_total_producto} cup</h2>
          </div>
        ))}

        <div className="text-right mt-5 flex-grow flex flex-col">
          <p>Total {factura.total_venta} cup</p>
          <p>{new Date(factura.createdAt).toLocaleString("es-ES")}</p>
        </div>
      </div>
    </div>
  );
}

export default FacturaCard;
