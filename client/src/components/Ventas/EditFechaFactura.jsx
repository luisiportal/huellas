import React, { useState, useEffect } from "react";

import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import * as Yup from "yup";
import { updateFechaMovimientoRequest } from "../../api/movimientos.api";
import { updateFechaFacturaRequest } from "../../api/venta.api";

const schema = Yup.object().shape({
  fecha: Yup.date().required("Requerido"),
});

const EditFechaFactura = ({ factura, setEditando, setRecargar, recargar }) => {
  const { setModalActivo } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className="mx-2 bg-neutral-200 rounded-md p-4">
      <h1 className="text-sm font-bold ">Editar Fecha de la Transacción</h1>

      <div>
        <Formik
          initialValues={factura}
          validationSchema={schema}
          enableReinitialize={true}
          onSubmit={async (values) => {
            {
              try {
                updateFechaFacturaRequest({
                  id: values.id,
                  fecha: values.fecha,
                });
                setModalActivo({
                  mensaje: `La fecha de la transacción fue actualizada a  ${values.fecha}`,
                  activo: true,
                });
                setRecargar(!recargar);
                setEditando(false);
              } catch (error) {
                alert(error);
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
              <label htmlFor="fecha" className="block">
                Fecha:{" "}
                {new Date(factura?.creado ?? factura.createdAt).toLocaleString(
                  "es-ES"
                )}
              </label>
              <input
                type="date"
                name="fecha"
                placeholder=""
                className="px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.fecha}
              />
              {errors.fecha && (
                <span className="bg-red-500 p-1 m-1">{errors.fecha}</span>
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
                    : "Actualizar"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditFechaFactura;
