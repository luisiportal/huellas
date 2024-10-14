import React from "react";
import DeleteBTN from "../botones/DeleteBTN";
import { useAuth } from "../../context/AuthContext";
import { deleteCuadreRequest } from "../../api/cuadre_caja.api";
import EditBTN from "../botones/EditBTN";
import ImagenCard from "./ImagenCard";

const CategoriasCard = ({ categoria, handleDelete, navigate }) => {
  return (
    <div className=" bg-neutral-300 rounded-lg p-2 my-4">
      <div className="flex gap-2">
        <ImagenCard categoria={categoria} />
        <div>
          <h2> Categoría :{categoria.nombre}</h2>
          <h2> Mascota:{categoria.mascota}</h2>
          <DeleteBTN
            onclick={async () => {
              handleDelete(categoria.id);
            }}
          />
          <EditBTN
            onclick={() => navigate(`/categorias/edit/${categoria.id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriasCard;
