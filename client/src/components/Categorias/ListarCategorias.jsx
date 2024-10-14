import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout";
import { useRequest } from "../../hooks/useRequest";
import {
  deleteCategoriaRequest,
  getAllCaregoriasRequest,
} from "../../api/categoria.api";
import CategoriasCard from "./CategoriasCard";
import { useAuth } from "../../context/AuthContext";
import BTNHOME from "../HOME/elementos/BTNHOME";

const ListarCategorias = () => {
  const { setModalActivo, setLoader } = useAuth();

  const { recurso: categorias, setRecurso: setCategorias } = useRequest(
    getAllCaregoriasRequest
  );

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      setLoader(true);
      const response = await deleteCategoriaRequest(id);
      setLoader(false);

      if (response) {
        setCategorias(categorias.filter((categoria) => categoria.id !== id));
        setModalActivo({
          mensaje: "Eliminada la categoría ",
          activo: true,
          errorColor: true,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <MainLayout titulo={"Categorias"}>
      <div className="flex justify-end">
        <BTNHOME
          texto={"Nueva Categoría"}
          enlace={"/categorias/new"}
        />
      </div>
      {categorias.map((categoria) => (
        <div key={categoria.id}>
          <CategoriasCard
            categoria={categoria}
            handleDelete={handleDelete}
            navigate={navigate}
          />
        </div>
      ))}
    </MainLayout>
  );
};

export default ListarCategorias;
