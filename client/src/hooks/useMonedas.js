import { useEffect, useState } from "react";
import { getTodasMonedaRequest } from "../api/moneda.api";

export const useMonedas = () => {
  const [monedas, setMonedas] = useState([]);

  useEffect(() => {
    const loadMonedas = async () => {
      try {
        const { data } = await getTodasMonedaRequest();
        setMonedas(data);
      } catch (error) {
        console.log(error);
        
      }
    };

    loadMonedas();
  }, []);

  return monedas;
};
