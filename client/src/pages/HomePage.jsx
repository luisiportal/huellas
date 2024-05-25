import React from "react";
import BotoneraEntrada_Salida from "../components/BotoneraEntrada_Salida";

import { Link } from "react-router-dom";
import CarritoActivos from "../components/HOME/CarritoActivos";

import { sincronizarTodo } from "../components/ModoOffline/Sincronizar/sincronizar";

const HomePage = () => {
  return (
    <div className="pt-20 flex flex-col gap-4">
      <BotoneraEntrada_Salida />
      <CarritoActivos />

      <Link to="/transacciones/new">
        <button className=" bg-green-500 w-full text-2md text-black font-bold block p-2 rounded-md">
          Nueva Orden
        </button>
      </Link>
      <button
        className="bg-huellas_color hover:bg-slate-700 text-white font-extrabold py-10 px-10  flex justify-center items-center rounded-sm"
        onClick={() => sincronizarTodo()}
      >
        Sincronizar
      </button>
    </div>
  );
};

export default HomePage;
