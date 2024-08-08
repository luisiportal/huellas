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

import { getProductosRequest } from "../../api/productos.api";

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

  const { loader, setLoader, isOnline, modalActivo, setModalActivo } =
    useAuth();
  const [productos, setProductos] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [movimiento, setMovimiento] = useState({
    cantidad: "",
    nombre_producto: "",
  });

  const params = useParams();

  useEffect(() => {
    const cargarProductos = async () => {
      if (!isOnline) {
        setProductos(readLocalStorage("productos"));
      } else {
        const { data } = await getProductosRequest();
        setProductos(data);
      }
    };

    cargarProductos();

    if (params.id) {
      cargarCarrito(params.id);
    }
  }, [recargar]);

  const schema = Yup.object().shape({
    cantidad: Yup.number()
      .max(
        movimiento.existencia,
        "La cantidad no puede ser mayor que la existencia"
      )
      .required("Este campo es requerido")
      .min(0.1, "Cantidad vacia"),
  });
  let total_venta = 0;
  if (carrito) {
    total_venta = carrito.reduce(
      (sum, producto) => sum + producto.precio_venta * producto.cantidad,
      0
    );
  }

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
          writeLocalStorageCrearMovimiento(
            {
              cantidad: venta.cantidad,
              producto: venta.nombre_producto,
              tipo: "Venta",
              id_producto: venta.id_producto,
              creado: fechaEnFormatoISO,
            },
            "Venta"
          );
        });
      } else {
        await createVentaRequest(carrito, total_venta, fechaEnFormatoISO);
      }

      setModalActivo({
        mensaje: `Se ha realizado la venta por un total de ${total_venta} cup`,
        activo: true,
      });

      setSelectedOption(null);
      setLoader(false);
      setProductos([]); // esto lo que permite que se actualice el estado de los productos en el selector
      setCarrito([]);

      setRecargar(!recargar);

      localStorage.removeItem("carrito" + cartSelect);
    } catch (error) {
      setLoader(false);

      setModalActivo({
        mensaje: error,
        activo: true,
        errorColor: true,
      });
    }
  };

  return (
    <div>
      <div className="">
        <div className="flex justify-center items-center pt-14">
          <div>
            <Formik
              initialValues={movimiento}
              enableReinitialize={true}
              validationSchema={schema}
              onSubmit={async (values, { resetForm }) => {
                setLoader(true);

                if (
                  !carrito.some(
                    (producto) =>
                      producto.nombre_producto === values.nombre_producto
                  )
                ) {
                  setCarrito([...carrito, values]);
                } else {
                  setModalActivo({
                    mensaje: `Ya este producto ha sido agregado`,
                    activo: true,
                    errorColor: true,
                  });
                }
                resetForm();
                setSelectedOption(null);
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
                  <div>
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
                    recargar={recargar}
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                  />
                </Form>
              )}
            </Formik>
            <div className="flex justify-center items-center mt-4"></div>
          </div>
        </div>
        {loader && <Loader />}
        <h2>Total a cobrar : {total_venta}</h2>
        {carrito &&
          carrito.map((producto) => {
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
