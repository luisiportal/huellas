import React from "react";
import CardProductoPendiente from "./elementos/CardProductoPendiente";

import ExclamacionSVG from "../SVG/ExclamacionSVG";

const PendientesAsincronizar = ({
  productos,
  movimientos,
  ventas,
  sincronizarTodo,
  setPendientesSincronizar,
}) => {
  return (
    <div className="px-3 ">
      <h2 className="bg-white text-slate-700 rounded-md p-3 font-bold text-xs uppercase  flex items-center justify-center  gap-1 shadow-md my-4 mx-1 ">
        Recursos pendientes a sincronizar {<ExclamacionSVG />}
      </h2>

      {productos && (
        <CardProductoPendiente
          recursos={productos}
          atributo={"nombre_producto"}
          titulo={"Actualizar Productos "}
        />
      )}
      {movimientos && (
        <CardProductoPendiente
          recursos={movimientos}
          atributo={"tipo"}
          atributo2={"producto"}
          titulo={"Movimientos"}
        />
      )}
      {ventas && (
        <CardProductoPendiente
          recursos={ventas}
          atributo={"total_venta"}
          //atributo2={"creado"}
          auxiliar={"Valor total de "}
          titulo={"Transacciones Fuera de linea"}
        />
      )}
      <div className="flex justify-center">
        <button
          className="bg-white border-huellas_color border-l-8  rounded-md p-3 font-bold text-sm uppercase gap-1 shadow-md w-fit m-4"
          onClick={() => {
            sincronizarTodo();
            setPendientesSincronizar(false);
          }}
        >
          Sincronizar
        </button>
      </div>
    </div>
  );
};

export default PendientesAsincronizar;
