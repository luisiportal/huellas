import React from "react";
import BotoneraEntrada_Salida from "../components/BotoneraEntrada_Salida";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="pt-20 flex flex-col gap-4">
      <BotoneraEntrada_Salida />
      <Link to="/transacciones/new">
        <button className=" bg-green-500 w-full text-2md text-black font-bold block p-2 rounded-md">
          Nueva Orden
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
