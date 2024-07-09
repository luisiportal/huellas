import React, { useEffect, useState } from "react";
import {
  getCuadreporDiaRequest,
  getTodosCuadreRequest,
} from "../../api/cuadre_caja.api";
import CuadreCard from "./CuadreCard";
import { useParams } from "react-router-dom";

const CuadrePage = () => {
  const [cuadres, setCuadres] = useState([]);

  const params = useParams();

  useEffect(() => {
    const loadCuadres = async () => {
      const response = await getTodosCuadreRequest();
   
      setCuadres(response.data);
    };
    loadCuadres();
  }, []);

  return (
    <div>
      CuadrePage
      {cuadres.map((cuadre,index) => (
        <CuadreCard cuadre={cuadre} key={index}/>
      ))}
    </div>
  );
};

export default CuadrePage;
