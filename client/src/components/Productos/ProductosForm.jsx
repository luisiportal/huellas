import { Form, Formik, useFormik } from "formik";
import { useProductos } from "../../context/ProductoProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Utilidades/Loader";
import {
  readLocalStorage,
  writeLocalStorageActualizarProductos,
} from "../../hooks/useLocalStorage";

const schema = Yup.object().shape({
  nombre_producto: Yup.string().required("Nombre producto requerido"),
  costo_unitario: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El precio debe ser mayor que cero")
    .required("Costo Requerido"),
  precio_venta: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El precio debe ser mayor que cero")
    .required("Precio Requerido"),
  categoria: Yup.string().default("Sin categoria"),
  stockMinimo: Yup.number().typeError("Debes escribir solo números"),
});

const ProductoForm = () => {
  const { createProducto, getProducto, updateProducto } = useProductos();

  const { loader, setLoader, isOnline, modalActivo, setModalActivo } =
    useAuth();
  const [file, setFile] = useState();
  const [producto, setProducto] = useState({
    nombre_producto: "",
    description_producto: "",
    costo_unitario: 0,
    precio_venta: 0,
    categoria: "Sin categoria",
    stockMinimo: 0,
  });

  useEffect(() => {
    const loadProducto = async () => {
      // cargar el producto
      if (params.id_producto) {
        if (isOnline) {
          // modo en linea
          const producto = await getProducto(params.id_producto);
          setProducto(producto);
        } else {
          // modo fuera linea
          const productos = readLocalStorage("productos");
          const producto = productos.filter(
            (producto) => producto.id_producto == params.id_producto
          );

          setProducto(producto[0]);
        }

        (e) => {
          setFile(e.target.files[0]);
        };
      }
    };
    loadProducto();
  }, []);

  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("nombre_producto", values.nombre_producto);
    formData.append("description_producto", values.description_producto);
    formData.append("costo_unitario", values.costo_unitario);
    formData.append("precio_venta", values.precio_venta);
    formData.append("categoria", values.categoria);

    formData.append("stockMinimo", values.stockMinimo);
    formData.append("existencia_inicial", values.existencia_inicial || 0);
    formData.append("unidadMedida", values.unidadMedida || "pcs");

    if (file !== null) {
      formData.append("ruta_image", file);
    }

    try {
      setLoader(true);
      if (params.id_producto) {
        if (isOnline) {
          await updateProducto(params.id_producto, formData); // onlinne
        } else {
          writeLocalStorageActualizarProductos("productos", {
            id_producto: params.id_producto,
            nombre_producto: formData.get("nombre_producto"),
            description_producto: formData.get("description_producto"),
            costo_unitario: formData.get("costo_unitario"),
            precio_venta: formData.get("precio_venta"),
            categoria: formData.get("categoria"),
            stockMinimo: formData.get("stockMinimo"),
            unidadMedida: formData.get("unidadMedida"),
          });
        }

        setModalActivo({
          mensaje: "Producto Actualizado",
          activo: true,
          navegarA: "/productos",
        });
      } else {
        if (isOnline) {
          await createProducto(formData);
        } else {
          setLoader(false);
          return setModalActivo({
            mensaje: "Lo siento no puedo agregar productos fuera de linea",
            activo: true,
            navegarA: "/productos",
            errorColor: true,
          });
          /*   writeLocalStorageCrearProducto("productos", {
            id_producto: Date.now(),
            nombre_producto: formData.get("nombre_producto"),
            description_producto: formData.get("description_producto"),
            costo_unitario: formData.get("costo_unitario"),
            precio_venta: formData.get("precio_venta"),
            categoria: formData.get("categoria"),
            stockMinimo: formData.get("stockMinimo"),
            unidadMedida: formData.get("unidadMedida"),
            existencia: 0,
            existencia_inicial: formData.get("existencia_inicial"),
          });*/
        }

        setModalActivo({
          mensaje: "Se ha creado el producto correctamente",
          activo: true,
          navegarA: "/productos",
        });
      }
    } catch (error) {
      console.log(error);

      setModalActivo({
        mensaje: "Error al actualizar producto  " + error,
        activo: true,
        errorColor: true,
      });
    }
    setLoader(false);
  };

  return (
    <div className="mx-2 bg-neutral-200 rounded-md p-4">
      <h1 className="text-sm font-bold text-white">
        {params.id_producto ? "Editar Producto" : "Agregar producto"}
      </h1>

      <div className="mt-8">
        <Formik
          initialValues={producto}
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
              <label htmlFor="nombre" className="block">
                * Nombre:
              </label>
              <input
                type="text"
                name="nombre_producto"
                placeholder=""
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.nombre_producto}
              />
              {errors.nombre_producto && (
                <span className="bg-red-500 p-1 m-1">
                  {errors.nombre_producto}
                </span>
              )}

              <label htmlFor="description_producto" className="block"></label>
              <textarea
                name="description_producto"
                rows="3"
                placeholder="Breve descripcion"
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.description_producto}
              ></textarea>
              <div></div>
              <label htmlFor="costo" className="block">
                *Costo:
              </label>
              <input
                type="number"
                name="costo_unitario"
                placeholder=""
                className="px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.costo_unitario}
              />
              {errors.costo_unitario && (
                <span className="bg-red-500 p-1 m-1">
                  {errors.costo_unitario}
                </span>
              )}
              <label htmlFor="precio_venta" className="block">
                Precio Venta:
              </label>
              <input
                type="number"
                name="precio_venta"
                placeholder=""
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.precio_venta}
              />
              {errors.precio_venta && (
                <span className="bg-red-500 p-1 m-1">
                  {errors.precio_venta}
                </span>
              )}
              <label htmlFor="unidadMedida" className="block">
                Unidad de Medida:
              </label>
              <input
                type="text"
                name="unidadMedida"
                placeholder="pcs"
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.unidadMedida || ""}
              />

              <label htmlFor="stockMinimo" className="block">
                Cant mínima:
              </label>
              <input
                type="number"
                name="stockMinimo"
                placeholder=""
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.stockMinimo}
              />
              {errors.stockMinimo && (
                <span className="bg-red-500 p-1 m-1">{errors.stockMinimo}</span>
              )}
              {!params.id_producto && (
                <>
                  <label htmlFor="existencia_inicial" className="block">
                    Existencia Inicial:
                  </label>
                  <input
                    type="number"
                    name="existencia_inicial"
                    placeholder=""
                    className="my-2 px-2 py-1 rounded-sm w-full"
                    onChange={handleChange}
                    value={values.existencia_inicial || 0}
                  />
                </>
              )}
              <label htmlFor="categoria" className="block">
                Elegir Categoría:
              </label>
              <select
                name="categoria"
                onChange={handleChange}
                value={values.categoria || ""}
                className="block my-2 rounded-sm"
              >
                <option value="Sin categoria">Sin categoria</option>
                <option value="Higiene">Higiene</option>
                <option value="Comida">Comida</option>
                <option value="Medicina">Medicina</option>
              </select>
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
  );
};

export default ProductoForm;
