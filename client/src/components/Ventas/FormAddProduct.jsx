import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
const FormAddProduct = ({
  productos,
  setMovimiento,
  handleChange,
  movimiento,
  values,
  errors,
  isSubmitting,
  recargar,
  setSelectedOption,
  selectedOption,
}) => {
  const [conExistencia, setConExistencia] = useState(true);
  const [productosElegir, setProductosElegir] = useState([]);

  const productosConExistencia = productos.filter(
    (producto) => Number(producto.existencia) > 0
  );

  useEffect(() => {
    const mostrarProductos = () => {
      if (conExistencia) {
        setProductosElegir(productosConExistencia);
      } else {
        setProductosElegir(productos);
      }
    };
    mostrarProductos();
  }, [conExistencia, selectedOption, recargar]);

  const options = (
    productosElegir.length > 0 ? productosElegir : productosConExistencia
  ).map((producto) => {
    return {
      value: producto.id_producto,
      label:
        producto.nombre_producto +
        " Precio: " +
        producto.precio_venta +
        " Existencia: " +
        producto.existencia,
      nombre_producto: producto.nombre_producto,
      existencia: producto.existencia,
      precio_venta: Number(producto.precio_venta),
      ruta_image: producto.ruta_image,
    };
  });

  const handleSelectChange = (p) => {
    setSelectedOption(p);

    setMovimiento({
      ...movimiento,
      id_producto: p.value,
      nombre_producto: p.nombre_producto,
      existencia: p.existencia,
      precio_venta: p.precio_venta,
      ruta_image: p.ruta_image,
    });
  };

  const handleConExistenciaChange = () => {
    setConExistencia(!conExistencia);
  };

  return (
    <div className="bg-neutral-200 mt-6">
      <div className="p-4 ">
        <div className="flex gap-2 items-center">
          {" "}
          <label htmlFor="conExistencia">Solo productos con existencia</label>
          <input
            type="checkbox"
            name="conExistencia"
            defaultChecked={true}
            id="conExistencia"
            onChange={handleConExistenciaChange}
          />
        </div>
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
