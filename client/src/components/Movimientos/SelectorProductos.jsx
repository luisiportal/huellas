import React from "react";
import Select from "react-select";

const SelectorProductos = ({
  handleSelectChange,
  selectedOption,
  productos,
}) => {
  const options = productos.map((producto) => ({
    value: producto.id_producto,
    label:
      producto.nombre_producto +
      " Precio: " +
      producto.precio_venta +
      " Existencia: " +
      producto.existencia,
    existencia: producto.existencia,
  }));
  return (
    <div className=" p-4">
      <Select
        name="nombre_producto"
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
        isSearchable
      />
    </div>
  );
};

export default SelectorProductos;
