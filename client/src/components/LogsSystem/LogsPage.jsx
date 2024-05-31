import React, { useEffect, useState } from "react";
import { getTodosLogsRequest } from "../../api/logs.api";

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
        <div key={log.id}>
          <h2>
            {`El trabajador ${log.trabajadore.nombre}${log.accionRealizada} ${log.detalles} el ${log.timestamp}`}{" "}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default LogsPage;
