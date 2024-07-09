import React, { useEffect, useState } from "react";
import { getTodosLogsRequest } from "../../api/logs.api";
import CalendarSvg from "../SVG/CalendarSvg";
import UserSvg from "../SVG/UserSvg";
import BTNCargarMas from "../Utilidades/BTNCargarMas";
import Loader from "../Utilidades/Loader";
import { useAuth } from "../../context/AuthContext";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const { loader, setLoader } = useAuth();

  useEffect(() => {
    const loadLogs = async (limit) => {
      const { data } = await getTodosLogsRequest(limit);
      setLogs(data);
    };

    loadLogs(30);
  }, []);

  return (
    <div className="pt-12">
      {logs.map((log) => (
        <div
          className="bg-neutral-200 text-slate-700  shadow-lg p-2 m-2 rounded-md"
          key={log.logId}
        >
          <h2 className="  flex ">
            <>
              <UserSvg estilo={"w-6 h-6 text-huellas_color font-extrabold"}/>
              {`${log.trabajadore.nombre}: ${log.accionRealizada} ${log.recurso} ${log.detalles}`}
            </>
          </h2>
          <h3 className="flex">
            <>
              {" "}
              <CalendarSvg />
              {`  ${new Date(log.timestamp).toLocaleString("es-ES")}`}
            </>
          </h3>
        </div>
      ))}
      <BTNCargarMas
        estado={logs}
        setEstado={setLogs}
        getRecurso={getTodosLogsRequest}
        setLoader={setLoader}
      />
      {loader && <Loader />}
    </div>
  );
};

export default LogsPage;
