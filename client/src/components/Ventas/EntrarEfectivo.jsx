import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Input from "../Input";
const EntrarEfectivo = () => {
  const [entrarEfectivo, setEntrarEfectivo] = useState([]);

  const schema = Yup.object().shape({
    cantidad: Yup.number()

      .required("Este campo es requerido")
      .min(1, "Cantidad vacia"),
  });

  const handleChange = (event) => {
 
  };

  return (
    <Formik
      initialValues={entrarEfectivo}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={async (values) => {}}
    >
      {({ errors, values, isSubmitting }) => (
        <Form>
          <div className="bg-neutral-200 mt-6">
            <Input
              name="x1000"
              label="$1000"
              type="text"
              value={values.x1000}
              handleChange={handleChange}
              errors={errors}
            />
            <h2></h2>
            <Input
              name="x500"
              label="$500"
              type="text"
              value={values.x500}
              handleChange={handleChange}
              errors={errors}
            />
            <Input
              name="x200"
              label="$200"
              type="text"
              value={values.x200}
              handleChange={handleChange}
              errors={errors}
            />
            <Input
              name="x100"
              label="$100"
              type="text"
              value={values.x100}
              handleChange={handleChange}
              errors={errors}
            />
            <Input
              name="x50"
              label="$50"
              type="text"
              value={values.x50}
              handleChange={handleChange}
              errors={errors}
            />
            <Input
              name="x20"
              label="$20"
              type="text"
              value={values.x20}
              handleChange={handleChange}
              errors={errors}
            />
            <Input
              name="x10"
              label="$10"
              type="text"
              value={values.x10}
              handleChange={handleChange}
              errors={errors}
            />
            <Input
              name="x5"
              label="$5"
              type="text"
              value={values.x5}
              handleChange={handleChange}
              errors={errors}
            />
            <Input
              name="x1"
              label="$1"
              type="text"
              value={values.x1}
              handleChange={handleChange}
              errors={errors}
            />

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
  );
};

export default EntrarEfectivo;
