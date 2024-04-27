import React from "react";
import { Link } from "react-router-dom";
const BotoneraEntrada_Salida = () => {
  return (
    <div className="flex gap-2">
      <Link to="/movimientos/entrada">
        <button className=" bg-green-500 w-full text-2md text-black font-bold block p-2 rounded-md">
          + Entrada
        </button>
      </Link>
      <Link to="/movimientos/salida">
        <button className=" bg-red-500 w-full text-2md text-black font-bold block p-2 rounded-md ">
          - Salida
        </button>
      </Link>
    </div>
  );
};

export default BotoneraEntrada_Salida;
