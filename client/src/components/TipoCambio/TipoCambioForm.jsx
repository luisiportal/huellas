import React, { useState, useEffect } from "react";

import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import {
  crearMonedaRequest,
  updateMoneda,
  get1MonedaRequest,
} from "../../api/moneda.api";

import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";

const schema = Yup.object().shape({
  precio: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El precio debe ser mayor que cero")
    .required("Requerido"),
});

const TipoCambioForm = () => {
  const [monedas, setMonedas] = useState({
    precio: 0,
    moneda: "",
  });
  const { setModalActivo } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadMonedas = async () => {
      if (params.id) {
        try {
          const { data } = await get1MonedaRequest(params.id);
          setMonedas(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    loadMonedas();
  }, []);

  return (
    <div className="mx-2 bg-neutral-200 rounded-md p-4">
      <h1 className="text-sm font-bold text-white">
        {params.id ? "Editar Moneda" : "Agregar Moneda"}
      </h1>

      <div className="mt-8">
        <Formik
          validationSchema={schema}
          initialValues={monedas}
          enableReinitialize={true}
          onSubmit={async (values) => {
            {
              try {
                if (params.id) {
                  await updateMoneda(params.id, values);

                  setModalActivo({
                    mensaje: `Se ha actualizado la moneda ${values.moneda} con el precio ${values.precio}`,
                    activo: true,
                    navegarA: "/cambio",
                  });
                } else {
                  await crearMonedaRequest(values);

                  navigate("/cambio");
                }
              } catch (error) {
                console.error(error);
              }
            }
          }}
        >
          {({ handleChange, handleSubmit, errors, values, isSubmitting }) => (
            // FORMULARIO PARA RELLENAR CAMPOS
            <Form
              onSubmit={handleSubmit}
              className="bg-neutral-200 max-w-md rounded-md p-4 mx-auto"
            >
              <label htmlFor="nombre" className="block">
                Nombre:{monedas.moneda}
              </label>

              <div></div>
              <label htmlFor="precio" className="block">
                Precio:
              </label>
              <input
                type="text"
                name="precio"
                placeholder=""
                className="px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.precio}
              />
              {errors.precio && (
                <span className="bg-red-500 p-1 m-1">{errors.precio}</span>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
              >
                {params.id_producto
                  ? "Aplicar cambios"
                  : isSubmitting
                    ? "Guardando..."
                    : "Agregar"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TipoCambioForm;
