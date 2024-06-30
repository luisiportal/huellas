import React from "react";
import { Link } from "react-router-dom";
import ArrowUpSVG from "./SVG/ArrowUpSVG";
import DownArrowSVG from "./SVG/DownArrowSVG";
const BotoneraEntrada_Salida = ({movimientos}) => {
  return (
    <div className="flex justify-center">
      <Link to="/movimientos/entrada">
        
        <button className=" bg-white border-huellas_color border-l-8  rounded-md p-3 font-bold text-sm uppercase gap-1 shadow-md w-fit m-4 flex justify-center">
          {<ArrowUpSVG/>} Entrada
        </button>
      </Link>
      <Link to="/movimientos/salida">
        <button className="bg-white border-huellas_color border-l-8 rounded-md p-3 font-bold text-sm uppercase gap-1 shadow-md w-fit m-4 flex justify-center">
          {<DownArrowSVG/>} Salida
        </button>
      </Link>
    </div>
  );
};

export default BotoneraEntrada_Salida;
