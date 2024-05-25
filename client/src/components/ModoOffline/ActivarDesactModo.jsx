import React from "react";

const ActivarDesactModo = ({ isOnline, setIsOnline }) => {
  const handleIsOnline = (isOnline) => {
    let modoSinConexion = confirm(
      `¿Quieres ${isOnline ? "activar" : "desactivar"} el modo sin conexión?`
    );

    if (modoSinConexion) {
      setIsOnline(!isOnline);
      alert(`Modo sin conexión ${isOnline ? "activado" : "desactivado"}`);
    } else {
      setIsOnline(isOnline);
    }
  };

  return (
    <>
      <button
        className="cursor-pointer"
        onClick={() => handleIsOnline(isOnline)}
      >
        {isOnline ? (
          <h2 className="bg-green-600 fixed bottom-0 text-white p-2 rounded-md">
            Conectado
          </h2>
        ) : (
          <h2 className="bg-red-600 fixed bottom-0 text-white p-2 rounded-md">
            Modo sin Conexión
          </h2>
        )}
      </button>
    </>
  );
};

export default ActivarDesactModo;
