import { useEffect, useState } from "react";
import BotoneraEntrada_Salida from "../components/BotoneraEntrada_Salida";
import MovimientoCard from "../components/Movimientos/MovimientoCard";
import { getTodosMovimientosRequest } from "../api/movimientos.api";
import { useAuth } from "../context/AuthContext";
import { readLocalStorage, writeLocalStorage } from "../hooks/useLocalStorage";
import Loader from "../components/Utilidades/Loader";
import BTNCargarMas from "../components/Utilidades/BTNCargarMas";

import Edit from "../components/Movimientos/Edit";


const MovimientosPage = () => {
  const {
    loader,
    setLoader,
    isOnline,
    modalActivo,
    setModalActivo,
    recargar,
    setRecargar,
    editando,
    setEditando,
  } = useAuth();
  const [movimientos, setMovimientos] = useState([]);
  useEffect(() => {
    const loadMovimientos = async (limit) => {
      try {
        setLoader(true);
        if (!isOnline) {
          setMovimientos(readLocalStorage("movimientos"));
        } else {
          const response = await getTodosMovimientosRequest(limit);
          setMovimientos(response.data);
          writeLocalStorage("movimientos", response.data);
        }

        setLoader(false);
      } catch (error) {}
    };

    loadMovimientos(30);
  }, [recargar]);
  return (
    <div>
      <h1 className="px-2 pb-2 text-3xl text-huellas_color font-bold ">
        Movimientos
      </h1>
      <div className="pb-2 flex justify-end sm:justify-center mr-2 mt-8">
        <BotoneraEntrada_Salida />
      </div>

      {movimientos.map((movimiento) => (
        <div key={movimiento.id_movimiento}>
          <div key={movimiento.id_movimiento}>
            <MovimientoCard
              recargar={true}
              movimiento={movimiento}
              setMovimientos={setMovimientos}
              movimientos={movimientos}
              setLoader={setLoader}
              loader={loader}
              setModalActivo={setModalActivo}
              isOnline={isOnline}
              setEditando={setEditando}
            ></MovimientoCard>
          </div>
          {editando == movimiento.id_movimiento && (
            <Edit
              movimiento={movimiento}
              setEditando={setEditando}
              setRecargar={setRecargar}
              recargar={recargar}
            />
          )}
        </div>
      ))}
      <BTNCargarMas
        estado={movimientos}
        setEstado={setMovimientos}
        getRecurso={getTodosMovimientosRequest}
        setLoader={setLoader}
      />
      {loader && <Loader />}
    </div>
  );
};

export default MovimientosPage;
