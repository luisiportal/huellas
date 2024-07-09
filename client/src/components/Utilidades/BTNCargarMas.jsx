import React from "react";
import BTNHOME from "../HOME/elementos/BTNHOME";

const BTNCargarMas = ({
  estado,
  setEstado,
  getRecurso,
  setLoader,
  recargarFactura,
  setRecargarFactura,
  loadFechas,
}) => {
  return (
    <BTNHOME
      texto={"Cargar +"}
      handleClick={async () => {
        setLoader(true);
        const { data } = await getRecurso(estado.length + 10);
        setEstado(data);
        loadFechas ? loadFechas(estado) : "";
        setLoader(false);
      }}
    />
  );
};

export default BTNCargarMas;
