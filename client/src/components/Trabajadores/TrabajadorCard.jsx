import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/ProductoProvider";
const TrabajadorCard = ({ trabajador }) => {
  const [showBotones, setShowBotones] = useState(false);
  const navigate = useNavigate();
  const { deleteTrabajador } = useProductos();

  const handleMouseEnter = () => {
    setShowBotones(true);
  };

  const handleMouseLeave = () => {
    setShowBotones(false);
  };

  return (
    <div>
      <div
        className="pt-12"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-2 bg-neutral-200 shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-32 overflow-hidden"></div>
          <div className="mx-auto w-32 h-32 relative -mt-28 border-4 border-white rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32"
              src={"../images/trabajadores/perfil/" + trabajador.foto_perfil}
              alt="Foto de perfil"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">
              {`${trabajador.nombre} ${trabajador.apellidos}`}
            </h2>
            <p className="text-gray-500">Puesto :{trabajador.puesto}</p>
            <p className="text-gray-500">Movil : {trabajador.movil}</p>
            <p className="text-gray-500">Direccion : {trabajador.direccion}</p>
            <p className="text-gray-500">Salario : {trabajador.salario} cup</p>
            {showBotones && (
              <div className="flex gap-x-1 transition-all duration-500 ease-in-out">
                <div className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-huellas_color">
                  <button
                    className=""
                    onClick={() => deleteTrabajador(trabajador.id_trabajador)}
                  >
                    Eliminar
                  </button>
                </div>
                <div>
                  {" "}
                  <button
                    className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-huellas_color"
                    onClick={() =>
                      navigate(
                        `../trabajador/profile/edit/${trabajador.id_trabajador}`
                      )
                    }
                  >
                    Editar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrabajadorCard;
