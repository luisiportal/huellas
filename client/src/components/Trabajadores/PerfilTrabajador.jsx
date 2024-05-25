import React from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Utilidades/Loader";

const PerfilTrabajador = () => {
  const { logout, user, perfil, cargarPerfil, loader, setLoader } = useAuth();

  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    try {
      cargarPerfil(user.id_trabajador);
      setLoader(false);
    } catch (error) {
      alert("Lo siento debes de iniciar sesion con conexión");
      navigate("/");
      return alert(error);
    }
  }, []);

  return (
    <div>
      <div className="pt-24">
        <div className=" min-h-80 max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-neutral-200 shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-32 overflow-hidden">
            <img
              className="object-cover object-top w-full"
              src={"../images/trabajadores/portada/" + perfil.foto_portada}
              alt="Foto portada"
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32"
              src={"../images/trabajadores/perfil/" + perfil.foto_perfil}
              alt="Foto de perfil"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() =>
                navigate(`../trabajador/profile/edit/${user.id_trabajador}`)
              }
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>

          <div className="text-center mt-2">
            <h2 className="font-semibold">
              Nombre : {`${perfil.nombre} ${perfil.apellidos}`}
            </h2>
            <p className="text-gray-500">Puesto :{perfil.puesto}</p>
            <p className="text-gray-500">Movil : {perfil.movil}</p>
            <p className="text-gray-500">Direccion : {perfil.direccion}</p>
            <p className="text-gray-500">Salario : {perfil.salario} cup</p>
          </div>
          <button
            className="  w-full bg-huellas_color text-2md text-black font-bold block p-2 rounded-md"
            onClick={logout}
          >
            Cerrar Sesión
          </button>

          {loader && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default PerfilTrabajador;
