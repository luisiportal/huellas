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
import { useMonedas } from "../../hooks/useMonedas";

const EntrarEfectivo = ({ perfil, venta, setModalActivo }) => {
  const [totalEfectivo, setTotalEfectivo] = useState(0);
  const [transferencia, setTransferencia] = useState([]);
  const [cantTransfer, setCantTransfer] = useState([1]);
  const [MLCinput, setMLCinput] = useState([{ usd: 0, mlc: 0, money: 0 }]);
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
  const monedas = useMonedas();
  const USD = monedas.filter((moneda) => moneda.moneda === "USD");
  const precioUSD = USD.length > 0 ? USD[0].precio : 0;

  const MLC = monedas.filter((moneda) => moneda.moneda === "MLC");
  const precioMLC = MLC.length > 0 ? MLC[0].precio : 0;

  useEffect(() => {
    const suma = Object.values(totalDenominacion).reduce((a, b) => a + b, 0);
    console.log(suma);

    setTotalEfectivo(suma);

    // Ahora puedes usar 'suma' sabiendo que 'totalDenominacion' está actualizado
  }, [totalDenominacion]); // Este efecto se ejecuta cada vez que 'totalDenominacion' cambia

  const handleChangeEfectivo = (e) => {
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
  const totalMLCenCUP = (values) => {
    return values.MLC ? Number(precioMLC) * Number(values.MLC) : 0;
  };
  const totalUSDenCUP = (values) => {
    return values.USD ? Number(precioUSD) * Number(values.USD) : 0;
  };
  const totalGastosCUP = (values) => {
    return values.money ? Number(values.money) : 0;
  };

  const grandTotalResult = (values) => {
    return (
      Number(dineroEnTransferenciaTotal()) +
      Number(totalEfectivo) +
      Number(values ? totalUSDenCUP(values) : 0) +
      Number(values ? totalMLCenCUP(values) : 0) +
      Number(values ? totalGastosCUP(values) : 0)
    );
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
        const grand_total = grandTotalResult(values);
        const total_transferencia = dineroEnTransferenciaTotal();
        const vendedor = perfil.username;
        const fechaVentaDate = new Date(venta.fechaVenta);
        const cantMLC = values.MLC;
        const cantUSD = values.USD;
        const gastos = totalGastosCUP(values);
        const tarjeta = total_transferencia > 0 ? values.tarjeta : null;
        const faltante = venta.totalVentaDia - grand_total;
        console.log(faltante);
        

        if (grand_total == 0) {
          return setModalActivo({
            mensaje: "Cuidado esta vacio",
            activo: true,
            errorColor: true,
          });
        }

        if (total_transferencia > 0 && values.tarjeta == null) {
          return setModalActivo({
            mensaje: "Cuidado no ha seleccionado la tarjeta CUP",
            activo: true,
            errorColor: true,
          });
        }

        try {
          await insertarCuadreRequest({
            values,
            precioUSD,
            precioMLC,
            cantMLC,
            cantUSD,
            totalVentaHoy: venta.totalVentaDia,
            grand_total,
            vendedor,
            total_transferencia,
            totalEfectivo,
            fechaVentaDate,
            gastos,
            tarjeta,
            faltante,
          }).then(() => {
            setModalActivo({
              mensaje: "El cuadre ha sido guardado",
              activo: true,
              navegarA: "/cuadre",
            });
          });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ errors, values, isSubmitting, handleChange }) => (
        <Form>
          <div className="bg-neutral-200 mt-6  ">
            <Denominacion
              values={values}
              handleChange={handleChangeEfectivo}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x1000"}
            />
            <Denominacion
              values={values}
              handleChange={handleChangeEfectivo}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x500"}
            />
            <Denominacion
              values={values}
              handleChange={handleChangeEfectivo}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x200"}
            />
            <Denominacion
              values={values}
              handleChange={handleChangeEfectivo}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x100"}
            />
            <Denominacion
              values={values}
              handleChange={handleChangeEfectivo}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x50"}
            />

            <Denominacion
              values={values}
              handleChange={handleChangeEfectivo}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x20"}
            />
            <Denominacion
              values={values}
              handleChange={handleChangeEfectivo}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x10"}
            />
            <Denominacion
              values={values}
              handleChange={handleChangeEfectivo}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x5"}
            />
            <Denominacion
              values={values}
              handleChange={handleChangeEfectivo}
              errors={errors}
              totalDenominacion={totalDenominacion}
              name={"x1"}
            />

            {cantTransfer.map((item, index) => (
              <div className="flex">
                {" "}
                <Input
                  placeholder={"En CUP"}
                  key={index}
                  type={"number"}
                  name={`transferencia${index}`}
                  value={transferencia[index] || ""}
                  handleChange={(event) => handleChangeTransfer(index, event)}
                  errors={errors}
                  label={"Transferencia" + (index + 1)}
                />
                <select
                  name="tarjeta"
                  id="tarjeta"
                  value={values.tarjeta}
                  onChange={handleChange}
                >
                  <option value="">Tarjeta CUP</option>
                  <option value="1038">1038</option>
                  <option value="3158">3158</option>
                </select>
              </div>
            ))}
            <Input
              placeholder={"Efectivo USD"}
              type={"number"}
              name={`USD`}
              value={MLCinput.usd}
              handleChange={handleChange}
              errors={errors}
              label={"USD"}
            />
            <Input
              placeholder={"MLC Transferencia"}
              type={"number"}
              name={`MLC`}
              value={MLCinput.mlc}
              handleChange={handleChange}
              errors={errors}
              label={"MLC"}
            />
            <Input
              placeholder={"Gastos del día"}
              type={"number"}
              name={"money"}
              value={MLCinput.money}
              handleChange={handleChange}
              errors={errors}
              label={"Gastos"}
            />

            <h2>Total Venta Hoy: {venta.totalVentaDia}</h2>
            <h2>Entrada Efectivo Total :{totalEfectivo}</h2>
            <h2>
              Dinero en Transferencias {dineroEnTransferenciaTotal()}Tarjeta :{" "}
              {values.tarjeta}
            </h2>
            <h2>Efectivo USD {totalUSDenCUP(values) || 0} cup</h2>
            <h2>Transfer MLC {totalMLCenCUP(values) || 0} cup</h2>
            <h2>Gastos {totalGastosCUP(values) || 0} cup</h2>

            <h2>
              {venta.totalVentaDia === grandTotalResult(values)
                ? "Cuadrado"
                : `Falta : ${venta.totalVentaDia - grandTotalResult(values)}`}
            </h2>

            <h2>Grand Total {grandTotalResult(values)}</h2>
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
