import React, { useState, useEffect } from "react";
import Select from "react-select";

import { Form, Formik, isInteger } from "formik";
import { getProductosRequest } from "../../api/productos.api";

import * as Yup from "yup";

import ProductoCarrito from "./ProductoCarrito";
import Btn_Huellas from "../Btn_Huellas";

import { createVentaRequest } from "../../api/venta.api";

const NuevaVenta = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  const [movimiento, setMovimiento] = useState({
    cantidad: "",
    producto: "",
  });

  useEffect(() => {
    const loadProducto = async () => {
      try {
        const { data } = await getProductosRequest();

        setProductos(data);
      } catch (error) {}
    };

    loadProducto();
  }, []);

  const options = productos.map((producto) => ({
    value: producto.id_producto,
    label: producto.nombre_producto,
    existencia: producto.existencia,
    precio_venta: Number(producto.precio_venta),
    ruta_image: producto.ruta_image,
  }));

  const schema = Yup.object().shape({
    cantidad: Yup.number()
      .max(
        movimiento.existencia,
        "La cantidad no puede ser mayor que la existencia"
      )
      .required("Este campo es requerido")
      .min(1, "Cantidad vacia"),
  });

  const handleSelectChange = (p) => {
    setSelectedOption(p);

    setMovimiento({
      ...movimiento,
      id_producto: p.value,
      producto: p.label,
      existencia: p.existencia,
      precio_venta: p.precio_venta,
      ruta_image: p.ruta_image,
    });
  };

  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio_venta * producto.cantidad,
    0
  );

  const pagar = () => {
    try {
      createVentaRequest(carrito, total);
      alert("Venta realizada correctamente");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-center items-center pt-24">
          <div>
            <Formik
              initialValues={movimiento}
              enableReinitialize={true}
              validationSchema={schema}
              onSubmit={async (values) => {
                setCarrito([...carrito, values]);
              }}
            >
              {({
                handleChange,

                errors,
                values,
                isSubmitting,
              }) => (
                <Form>
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
                        <span className="bg-red-500 p-1 m-1">
                          {errors.cantidad}
                        </span>
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
                </Form>
              )}
            </Formik>
            <div className="flex justify-center items-center mt-4"></div>
          </div>
        </div>
        <h2>Total a cobrar : {total}</h2>
        {carrito.map((producto) => {
          const totalProducto = producto.cantidad * producto.precio_venta;

          return (
            <ProductoCarrito
              producto={producto}
              key={producto.id_producto}
              setCarrito={setCarrito}
              carrito={carrito}
              total_producto={totalProducto}
            />
          );
        })}
        <Btn_Huellas text={`Cobrar ${total} cup`} onclick={() => pagar()} />
      </div>
    </div>
  );
};

export default NuevaVenta;
