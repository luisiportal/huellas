import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";

const schema = Yup.object().shape({
  x1000: Yup.number().typeError("Debes escribir solo números"),
  x500: Yup.number().typeError("Debes escribir solo números"),
  x200: Yup.number().typeError("Debes escribir solo números"),
  x100: Yup.number().typeError("Debes escribir solo números"),
  x50: Yup.number().typeError("Debes escribir solo números"),
  x20: Yup.number().typeError("Debes escribir solo números"),
  x10: Yup.number().typeError("Debes escribir solo números"),

  x5: Yup.number().typeError("Debes escribir solo números"),
  x1: Yup.number().typeError("Debes escribir solo números"),
});

import Denominacion from "./Denominacion";

import Input from "../Input";
import { insertarCuadreRequest } from "../../api/cuadre_caja.api";
import { loginRequest } from "../../api/login.api";
const EntrarEfectivo = ({ perfil, venta }) => {
  const [totalEfectivo, setTotalEfectivo] = useState(0);
  const [transferencia, setTransferencia] = useState([]);
  const [cantTransfer, setCantTransfer] = useState([1]);
  const [entrarEfectivo, setEntrarEfectivo] = useState({
    x1000: 0,
    x500: 0,
    x200: 0,
    x100: 0,
    x50: 0,
    x20: 0,
    x10: 0,
    x5: 0,
    x1: 0,
  });
  const [totalDenominacion, setTotalDenominacion] = useState({
    x1000: 0,
    x500: 0,
    x200: 0,
    x100: 0,
    x50: 0,
    x20: 0,
    x10: 0,
    x5: 0,
    x1: 0,
  });
  console.log(venta);

  useEffect(() => {
    const suma = Object.values(totalDenominacion).reduce((a, b) => a + b, 0);
    setTotalEfectivo(suma);

    // Ahora puedes usar 'suma' sabiendo que 'totalDenominacion' está actualizado
  }, [totalDenominacion]); // Este efecto se ejecuta cada vez que 'totalDenominacion' cambia

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntrarEfectivo((prevState) => ({ ...prevState, [name]: value })); // actualizar la caja del input

    mostrarTotalporDenominacion(name, value);
  };

  const mostrarTotalporDenominacion = (name, value) => {
    const calcular = {
      [name]: Number(value) * Number(name.slice(1)),
    };
    setTotalDenominacion((prevState) => ({
      ...prevState,
      [name]: calcular[name],
    }));
  };

  const handleChangeTransfer = (index, event) => {
    const newTransferencia = [...transferencia];
    newTransferencia[index] = Number(event.target.value);
    setTransferencia(newTransferencia);
  };

  const dineroEnTransferenciaTotal = () => {
    return transferencia.reduce((a, b) => a + b, 0);
  };

  const grandTotalResult = () => {
    return Number(dineroEnTransferenciaTotal()) + Number(totalEfectivo);
  };

  const AddTransferInput = () => {
    setCantTransfer((prevState) => [...prevState, cantTransfer.length + 1]);
  };

  return (
    <Formik
      initialValues={entrarEfectivo}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={async (values) => {
        const grand_total = grandTotalResult();
        const total_transferencia = dineroEnTransferenciaTotal();
        const vendedor = perfil.username;
        const fechaVentaDate = new Date(venta.fechaVenta);
        await insertarCuadreRequest({
          values,
          totalVentaHoy: venta.totalVentaDia,
          grand_total,
          vendedor,
          total_transferencia,
          totalEfectivo,
          fechaVentaDate,
        });
      }}
    >
      {({ errors, values, isSubmitting }) => (
        <Form>
          <div className="bg-neutral-200 mt-6">
            <Denominacion
              values={values}
              handleChange={handleChange}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x1000"}
            />
            <Denominacion
              values={values}
              handleChange={handleChange}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x500"}
            />
            <Denominacion
              values={values}
              handleChange={handleChange}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x200"}
            />
            <Denominacion
              values={values}
              handleChange={handleChange}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x100"}
            />
            <Denominacion
              values={values}
              handleChange={handleChange}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x50"}
            />

            <Denominacion
              values={values}
              handleChange={handleChange}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x20"}
            />
            <Denominacion
              values={values}
              handleChange={handleChange}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x10"}
            />
            <Denominacion
              values={values}
              handleChange={handleChange}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x5"}
            />
            <Denominacion
              values={values}
              handleChange={handleChange}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x1"}
            />

            {cantTransfer.map((item, index) => (
              <Input
                key={index}
                type={"number"}
                name={`transferencia${index}`}
                value={transferencia[index] || ""}
                handleChange={(event) => handleChangeTransfer(index, event)}
                errors={errors}
                label={"Transferencia" + (index + 1)}
              />
            ))}
            <h2>Total Venta Hoy: {venta.totalVentaDia}</h2>
            <h2>Entrada Efectivo Total :{totalEfectivo}</h2>
            <h2>Dinero en Transferencias {dineroEnTransferenciaTotal()}</h2>
            <h2>
              {venta.totalVentaDia === grandTotalResult()
                ? "Cuadrado"
                : `Falta : ${venta.totalVentaDia - grandTotalResult()}`}
            </h2>

            <h2>Grand Total {grandTotalResult()}</h2>
            <h2> </h2>
            <button onClick={AddTransferInput}>+ Transfer</button>
            <button
              type="submit"
              disabled={isSubmitting}
              className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
            >
              {isSubmitting ? "Guardando..." : "Guardar Cuadre"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EntrarEfectivo;
