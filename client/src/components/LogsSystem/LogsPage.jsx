import React, { useEffect, useState } from "react";
import { getTodosLogsRequest } from "../../api/logs.api";
import CalendarSvg from "../SVG/CalendarSvg";
import UserSvg from "../SVG/UserSvg";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadLogs = async () => {
      const { data } = await getTodosLogsRequest();
      setLogs(data);
    };

    loadLogs();
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
              <UserSvg />
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
    </div>
  );
};

export default LogsPage;
