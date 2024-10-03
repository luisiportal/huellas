import React, { useEffect, useState } from "react";
import {
  getCuadreporDiaRequest,
  getTodosCuadreRequest,
} from "../../api/cuadre_caja.api";
import CuadreCard from "./CuadreCard";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CuadrePage = () => {
  const [cuadres, setCuadres] = useState([]);
  const { isOnline, loader, setLoader, recargar, setRecargar, perfil,  setModalActivo } =
    useAuth();
  const params = useParams();

  useEffect(() => {
    const loadCuadres = async () => {
      const response = await getTodosCuadreRequest();
   
      setCuadres(response.data);
    };
    loadCuadres();
  }, [recargar]);

  return (
    <div>
      CuadrePage
      {cuadres.map((cuadre,index) => (
        <CuadreCard cuadre={cuadre} key={index} setRecargar={setRecargar} setModalActivo={setModalActivo} setLoader={setLoader} perfil={perfil} />
      ))}
    </div>
  );
};

export default CuadrePage;
