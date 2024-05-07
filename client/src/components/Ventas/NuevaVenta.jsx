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
  useLocalStorage,
  writeLocalStorage,
} from "../../hooks/useLocalStorage";
import { useGetApiRequest } from "../../hooks/useGetApiREquest";
import FormAddProduct from "./FormAddProduct";
import CarritosGuardados from "./CarritosGuardados";

const NuevaVenta = () => {
  const [carrito, setCarrito] = useState([]);

  const [carrito1, setCarrito1] = useState([]);
  const [carrito2, setCarrito2] = useState([]);
  const [carrito3, setCarrito3] = useState([]);
  const [carrito4, setCarrito4] = useState([]);
  const [cartSelect, setCartSelect] = useState(0);

  const [recargar, setRecargar] = useState(false);

  const [nuCart, setnuCart] = useState(1);

  const { loader, setLoader } = useAuth();
  const [movimiento, setMovimiento] = useState({
    cantidad: "",
    producto: "",
  });

  const productos = useGetApiRequest();

  useEffect(() => {
    cargarCarritosGuardados();
  }, [recargar]);

  const guardarCarrito = () => {
    if (carrito.length == 0) {
      alert("Carrito Vacio");
    } else {
      setnuCart(readLocalStorage("nuCart"));
      nuCart < 5
        ? writeLocalStorage("carrito" + nuCart, [...carrito])
        : alert("Maximo de carritos alcanzado");
      writeLocalStorage("nuCart", nuCart);
      setnuCart(nuCart + 1);
      setCarrito([]);
      alert("Carrito Guardado");
      setRecargar(!recargar);
    }
  };
  const cargarCarrito = (nuCart) => {
    setCarrito([0]);
    setCarrito(readLocalStorage("carrito" + nuCart));
    setCartSelect(nuCart);
    alert("Carrito " + nuCart + " Cargado");
  };

  const cargarCarritosGuardados = () => {
    setCarrito1(readLocalStorage("carrito1"));
    setCarrito2(readLocalStorage("carrito2"));
    setCarrito3(readLocalStorage("carrito3"));
    setCarrito4(readLocalStorage("carrito4"));
  };

  const schema = Yup.object().shape({
    cantidad: Yup.number()
      .max(
        movimiento.existencia,
        "La cantidad no puede ser mayor que la existencia"
      )
      .required("Este campo es requerido")
      .min(1, "Cantidad vacia"),
  });

  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio_venta * producto.cantidad,
    0
  );

  const pagar = async () => {
    try {
      setLoader(true);
      await createVentaRequest(carrito, total);

      alert("Producto vendido");
      setLoader(false);

      setCarrito([]);

      localStorage.removeItem("carrito" + cartSelect);
      setRecargar(!recargar);
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
                    (producto) => producto.producto === values.producto
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
                    {" "}
                    <CarritosGuardados
                      cargarCarrito={cargarCarrito}
                      carrito1={carrito1}
                      carrito2={carrito2}
                      carrito3={carrito3}
                      carrito4={carrito4}
                      setCarrito={setCarrito}
                      setRecargar={setRecargar}
                      recargar={recargar}
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
        <Btn_Huellas
          text={`Cobrar ${total} cup`}
          disbledText={"Sin productos"}
          disabled={carrito.length ? false : true}
          onclick={() => pagar()}
        />
      </div>
    </div>
  );
};

export default NuevaVenta;
