import { useEffect, useState } from "react";
import { useProductos } from "../context/ProductoProvider";
import PerfilTrabajador from "../components/Trabajadores/PerfilTrabajador";
import TrabajadorCard from "../components/Trabajadores/TrabajadorCard";
import BTNRedondo from "../components/Utilidades/BTNRedondo";

const ListadoTrabajadores = () => {
  const { trabajadores, loadTrabajadores } = useProductos();

  useEffect(() => {
    loadTrabajadores();
  }, []);

  return (
    <>
 
      <BTNRedondo ruta={"/trabajador/new"} />
      <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 pt-10">
        {trabajadores.map((trabajador) => (
          <TrabajadorCard
            trabajador={trabajador}
            key={trabajador.id_trabajador}
          />
        ))}
      </div>
    </>
  );
};

export default ListadoTrabajadores;
