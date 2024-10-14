import { Form, Formik, useFormik } from "formik";
import { useProductos } from "../../context/ProductoProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Utilidades/Loader";

import {
  crearCategoriaRequest,
  getSingleCategoriaRequest,
  updateCategoria,
} from "../../api/categoria.api";
import Input from "../Input";
import MainLayout from "../../Layouts/MainLayout";
import Select from "./Select";

const schema = Yup.object().shape({
  nombre: Yup.string().required("Nombre categoría requerido"),
});

const CategoriasForm = () => {
  const { loader, setLoader, isOnline, modalActivo, setModalActivo } =
    useAuth();
  const [file, setFile] = useState();
  const [categoria, setCategoria] = useState({
    nombre: "",
    ruta_image: "",
    mascota: "",
  });

  useEffect(() => {
    const loadCategoria = async () => {
      if (params.id) {
        // modo en linea
        const response = await getSingleCategoriaRequest(params.id);
        
        setCategoria(response.data);

        (e) => {
          setFile(e.target.files[0]);
        };
      }
    };
    loadCategoria();
  }, []);

  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("nombre", values.nombre);
    formData.append("mascota", values.mascota);

    if (file !== null) {
      formData.append("ruta_image", file);
    }

    try {
      setLoader(true);
      if (params.id) {
        const response = await updateCategoria(params.id, formData); // onlinne
        if (response) {
          setModalActivo({
            mensaje: "Categoria Actualizada",
            activo: true,
            navegarA: "/categorias",
          });
        }
      } else {
        const response = await crearCategoriaRequest(formData);
        if (response) {
          setModalActivo({
            mensaje: "Se ha creado la categoría correctamente",
            activo: true,
            navegarA: "/categorias",
          });
        }
      }
    } catch (error) {
      console.log(error);

      setModalActivo({
        mensaje: "Error al actualizar categoria  " + error,
        activo: true,
        errorColor: true,
      });
    }
    setLoader(false);
  };

  return (
    <MainLayout titulo={"Categorias"}>
      <div className="mx-2 bg-neutral-200 rounded-md p-4">
        <h1 className="text-sm font-bold text-slate-950">
          {params.id ? "Editar Categoría" : "Agregar Categoría"}
        </h1>

        <div className="mt-8">
          <Formik
            initialValues={categoria}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              values,
              isSubmitting,
              resetForm,
            }) => (
              // FORMULARIO PARA RELLENAR CAMPOS
              <Form className="bg-neutral-200 max-w-md rounded-md p-4 mx-auto">
                {
                  /*muestra la imagen preview */ file && (
                    <img
                      className="w-40 h-40 shadow-xl border-slate-50 border-spacing-2 rounded-md"
                      src={URL.createObjectURL(file)}
                      alt=""
                    />
                  )
                }

                <div className="flex flex-col justify-start">
                  <Input
                    type={"text"}
                    name={"nombre"}
                    value={values.nombre}
                    label={"Nombre"}
                    handleChange={handleChange}
                    errors={errors}
                  />
                  <Select handleChange={handleChange} value={values.mascota} />
                </div>

                <label htmlFor="ruta_image" className="block"></label>
                <input
                  name="ruta_image"
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />

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
                <br />
              </Form>
            )}
          </Formik>
        </div>
        {loader && <Loader />}
      </div>
    </MainLayout>
  );
};

export default CategoriasForm;
