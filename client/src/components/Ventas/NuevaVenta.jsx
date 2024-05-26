import React, { useState, useEffect } from "react";

import { Form, Formik, isInteger } from "formik";
import * as Yup from "yup";
import ProductoCarrito from "./ProductoCarrito";
import Btn_Huellas from "../Btn_Huellas";
import { createVentaRequest } from "../../api/venta.api";
import Loader from "../Utilidades/Loader";
import { useAuth } from "../../context/AuthContext";
import {
  readLocalStorage,
  writeLocalStorageCrearFactura,
  writeLocalStorageCrearMovimiento,
  writeLocalStorageHacerVenta,
} from "../../hooks/useLocalStorage";

import FormAddProduct from "./FormAddProduct";
import CarritosGuardados from "./CarritosGuardados";
import { useCarritos } from "../../context/CarritosContext";
import { useParams } from "react-router-dom";
import { useProductos } from "../../context/ProductoProvider";

const NuevaVenta = () => {
  const {
    carrito1,
    carrito2,
    carrito3,
    carrito4,
    recargar,
    setRecargar,
    carrito,
    setCarrito,
    guardarCarrito,
    cargarCarrito,
    nuCart,
    setnuCart,
    cartSelect,
  } = useCarritos();
  let fechaActual = new Date();
  let fechaEnFormatoISO = fechaActual.toISOString();

  const { productos, loadProductos, setProductos } = useProductos();
  const { loader, setLoader, isOnline } = useAuth();
  const [movimiento, setMovimiento] = useState({
    cantidad: "",
    nombre_producto: "",
  });

  const params = useParams();

  useEffect(() => {
    const cargarProductos = () => {
      if (!isOnline) {
        setProductos(readLocalStorage("productos"));
      } else {
        loadProductos(null);
      }
    };
    cargarProductos();
    const cargarCarritoInicio = () => {
      cargarCarrito(params.id);
    };

    if (params.id) {
      cargarCarritoInicio();
    }
  }, [recargar]);

  const schema = Yup.object().shape({
    cantidad: Yup.number()
      .max(
        movimiento.existencia,
        "La cantidad no puede ser mayor que la existencia"
      )
      .required("Este campo es requerido")
      .min(1, "Cantidad vacia"),
  });

  const total_venta = carrito.reduce(
    (sum, producto) => sum + producto.precio_venta * producto.cantidad,
    0
  );

  const pagar = async () => {
    try {
      const ventas = carrito;
      setLoader(true);
      if (!isOnline) {
        writeLocalStorageHacerVenta("ventas", {
          ventas,
          total_venta,
          creado: fechaEnFormatoISO,
        });

        writeLocalStorageCrearFactura({
          ventas,
          total_venta,
          creado: fechaEnFormatoISO,
        });
        // recorre ventas para agregar  el movimiento de cada producto
        ventas.map((venta) => {
          writeLocalStorageCrearMovimiento({
            cantidad: venta.cantidad,
            producto: venta.nombre_producto,
            tipo: "Venta",
            id_producto: venta.id_producto,
            creado: fechaEnFormatoISO,
          },"Venta");
        });
      } else {
        await createVentaRequest(carrito, total_venta, fechaEnFormatoISO);
      }

      alert("Producto vendido");
      setLoader(false);

      setCarrito([]);

      setRecargar(!recargar);

      localStorage.removeItem("carrito" + cartSelect);
    } catch (error) {
      setLoader(false);
      alert(error);
    }
  };

  return (
    <div>
      <div className="pt-20">
        <div className="flex justify-center items-center pt-24">
          <div>
            <Formik
              initialValues={movimiento}
              enableReinitialize={true}
              validationSchema={schema}
              onSubmit={async (values) => {
                setLoader(true);

                if (
                  !carrito.some(
                    (producto) =>
                      producto.nombre_producto === values.nombre_producto
                  )
                ) {
                  setCarrito([...carrito, values]);
                } else {
                  alert("Ya este producto ha sido agregado");
                }

                setLoader(false);
              }}
            >
              {({
                handleChange,

                errors,
                values,
                isSubmitting,
              }) => (
                <Form>
                  <Btn_Huellas
                    text={"Guardar Carrito"}
                    onclick={guardarCarrito}
                    type={"button"}
                  />
                  <div className="">
                    {" //"}
                    <CarritosGuardados
                      carrito1={carrito1}
                      carrito2={carrito2}
                      carrito3={carrito3}
                      carrito4={carrito4}
                      setCarrito={setCarrito}
                      setRecargar={setRecargar}
                      recargar={recargar}
                      nuCart={nuCart}
                      setnuCart={setnuCart}
                    />
                  </div>

                  <FormAddProduct
                    productos={productos}
                    setMovimiento={setMovimiento}
                    handleChange={handleChange}
                    movimiento={movimiento}
                    values={values}
                    errors={errors}
                    isSubmitting={isSubmitting}
                  />
                </Form>
              )}
            </Formik>
            <div className="flex justify-center items-center mt-4"></div>
          </div>
        </div>
        {loader && <Loader />}
        <h2>Total a cobrar : {total_venta}</h2>
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
        <Btn_Huellas
          text={`Cobrar ${total_venta} cup`}
          disbledText={"Sin productos"}
          disabled={carrito.length ? false : true}
          onclick={() => pagar()}
        />
      </div>
    </div>
  );
};

export default NuevaVenta;
