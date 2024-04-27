import React from "react";
import Bton_eliminar_producto from "./Bton_eliminar_producto";

const ProductoCarrito = ({ producto, setCarrito , carrito, total_producto}) => {
 
const handleEliminar = (id)=> {

    setCarrito(
        carrito.filter((producto) => producto.id_producto !== id)
      );
}

 

  return (
    <section
      key={producto.id_producto}
      className="flex p-1 rounded bg-neutral-200 mb-2"
    >
      <img
        className="object-cover object-center w-28 h-28 border-slate-50 border-spacing-2"
        src={`../images/productos/${producto.ruta_image}`}
        alt="Imagen de Producto"
      />
      <div className="p-2 text-left">
        <h2 className="text-md font-semibold ">{producto.producto}</h2>
        <h3 className="text-sm font-semibold">Cantidad: {producto.cantidad}</h3>
        <h3 className="text-sm font-semibold">Precio unidad: {producto.precio_venta}</h3>
        <h3 className="text-sm font-semibold">Precio total: {total_producto}</h3>
      </div>
      <button onClick={()=>handleEliminar(producto.id_producto)}> <Bton_eliminar_producto/></button>
    
     
    </section>
  );
};

export default ProductoCarrito;
