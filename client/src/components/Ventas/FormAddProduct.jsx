import React from "react";
import { useState } from "react";
import Select from "react-select";
const FormAddProduct = ({ productos, setMovimiento,handleChange,movimiento, values,errors,isSubmitting }) => {
    const [selectedOption, setSelectedOption] = useState(null);

  const options = productos.map((producto) => ({
    value: producto.id_producto,
    label: producto.nombre_producto +" Precio: "+ producto.precio_venta + " Existencia: "+producto.existencia,
    producto : producto.nombre_producto,
    existencia: producto.existencia,
    precio_venta: Number(producto.precio_venta),
    ruta_image: producto.ruta_image,
  }));

  const handleSelectChange = (p) => {
    setSelectedOption(p);

    setMovimiento({
      ...movimiento,
      id_producto: p.value,
      producto: p.producto,
      existencia: p.existencia,
      precio_venta: p.precio_venta,
      ruta_image: p.ruta_image,
    });
  };



  return (
    <div className="bg-neutral-200 mt-6">
      <div className="p-4 ">
        <Select
          name="nombre_producto"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          isSearchable
        />
      </div>
      <div className="text-slate-900 p-4">
        <label className="p-2" htmlFor="cantidad">
          Cantidad :
        </label>
        <input
          className="text-black"
          name="cantidad"
          type="text"
          onChange={handleChange}
          value={values.cantidad}
        />
        {errors.cantidad && (
          <span className="bg-red-500 p-1 m-1">{errors.cantidad}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
      >
        {isSubmitting ? "Guardando..." : "Agregar"}
      </button>
    </div>
  );
};

export default FormAddProduct;
