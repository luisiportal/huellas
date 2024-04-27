import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MostrarError from "../validacionForm/mostrarError";
import {
  cargarPerfilRequest,
  registerRequest,
  updateTrabajadorRequest,
} from "../../api/login.api";

const AgregarTrabajador = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [perfil, setPerfil] = useState({
    username: "",
    password: "",
    nombre: "",
    apellidos: "",
    movil: "",
    puesto: "",
    direccion: "",
    salario: "",
  });
  useEffect(() => {
    const loadTrabajador = async () => {
      if (params.id) {
        const trabajador = await cargarPerfilRequest(params.id);
        setPerfil({
          username: trabajador.data.username,
          password: "trabajador.data.password",
          nombre: trabajador.data.nombre,
          apellidos: trabajador.data.apellidos,
          movil: trabajador.data.movil,
          puesto: trabajador.data.puesto,
          direccion: trabajador.data.direccion,
          salario: trabajador.data.salario,
        });
        (e) => {
          setFile(e.target.files[0]);
        };
      }
    };
    loadTrabajador();
  }, []);

  const handleSubmit = async (values) => {
    const formData = new FormData();

    {
      params.id ? false : formData.append("username", values.username);
    }
    {
      params.id ? false : formData.append("password", values.password);
    }
    formData.append("nombre", values.nombre);
    formData.append("apellidos", values.apellidos);
    formData.append("movil", values.movil);
    formData.append("puesto", values.puesto);
    formData.append("direccion", values.direccion);
    formData.append("salario", values.salario);
    if (file !== null) {
      formData.append("foto_perfil", file);
    }

    try {
  
      if (params.id) {
        await updateTrabajadorRequest(params.id, formData);

        alert("Se han actualizado los datos");

        navigate("/trabajador/plantilla");
      } else {
        await registerRequest(formData);

        alert("Se ha agregado un nuevo trabajador correctamente");
        navigate("/trabajador/plantilla");
      }
    } catch (error) {
      alert("Error al actualizar perfil  " + error);
    }
  };

  return (
    <div>
      <h1>Agregar Trabajador</h1>
      <Formik
        initialValues={perfil}
        enableReinitialize={true}
        validationSchema={Yup.object({
          username: Yup.string()
            .required("Campo requerido")
            .matches(/^[a-zA-Z0-9-.]*$/, "Solo se permiten letras y números")
            .max(20, "El nombre de usuario no debe tener más de 20 caracteres"),
          password: Yup.string()
            .required("Campo requerido")
            .min(8, "La contraseña debe tener al menos 8 caracteres"),
          nombre: Yup.string()
            .matches(/^[a-zA-Z ]*$/, "Solo se permiten letras")
            .max(20, "El nombre de no debe tener más de 20 caracteres"),
          apellidos: Yup.string()
            .matches(/^[a-zA-Z ]*$/, "Solo se permiten letras")
            .max(20, "El nombre de no debe tener más de 20 caracteres"),
          movil: Yup.string()
            .matches(/^[0-9 ]*$/, "Solo se permiten numeros")
            .max(20, "El nombre de no debe tener más de 20 caracteres"),

          salario: Yup.string()
            .matches(/^[0-9. ]*$/, "Solo se permiten numeros")
            .max(20, "No debe tener más de 20 caracteres"),
        })}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, errors, values, isSubmitting }) => (
          <Form className="bg-neutral-200 max-w-md p-4 mx-auto rounded">
            {
              /*muestra la imagen preview */ file && (
                <img
                  className="w-40 h-40 shadow-xl border-slate-50 border-spacing-2 rounded-md"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              )
            }
            <div className="bg-neutral-200 grid sm:grid-cols-1 gap-2 xl:grid-cols-1 p-4 min-h-80 max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 shadow-xl rounded text-gray-900">
              {" "}
              <label className="text-black" htmlFor="username">
                Usuario :
              </label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={values.username}
                //  disabled={params.id ? true : false}
              />
              <MostrarError campo={"username"} errors={errors} />
              <label className="text-black" htmlFor="password">
                Contraseña :
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                //  disabled={params.id ? true : false}
              />
              <MostrarError campo={"password"} errors={errors} />
              <label className="text-black" htmlFor="password">
                Nombre :
              </label>
              <input
                type="text"
                name="nombre"
                onChange={handleChange}
                value={values.nombre}
              />
              <MostrarError campo={"nombre"} errors={errors} />
              <label className="text-black" htmlFor="apellidos">
                Apellidos :
              </label>
              <input
                type="text"
                name="apellidos"
                onChange={handleChange}
                value={values.apellidos}
              />
              <MostrarError campo={"apellidos"} errors={errors} />
              <label className="text-black" htmlFor="movil">
                Movil :
              </label>
              <input
                type="text"
                name="movil"
                onChange={handleChange}
                value={values.movil}
              />
              <MostrarError campo={"movil"} errors={errors} />
              <label className="text-black" htmlFor="puesto">
                Puesto :
              </label>
              <input
                type="text"
                name="puesto"
                onChange={handleChange}
                value={values.puesto}
              />
              <ErrorMessage name="puesto" />
              <label className="text-black" htmlFor="direccion">
                Direccion :
              </label>
              <input
                type="text"
                name="direccion"
                onChange={handleChange}
                value={values.direccion}
              />
              <ErrorMessage name="direccion" />
              <label className="text-black" htmlFor="salario">
                Salario :
              </label>
              <input
                type="text"
                name="salario"
                onChange={handleChange}
                value={values.salario}
              />
              <MostrarError campo={"salario"} errors={errors} />
              <label htmlFor="ruta_image" className="block"></label>
              <input
                name="ruta_image"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <button
                className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
                type="submit"
                disabled={isSubmitting}
              >
                Aceptar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AgregarTrabajador;
