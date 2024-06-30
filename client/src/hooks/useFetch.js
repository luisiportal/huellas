import axios from "../api/axios.js";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const { loader, setLoader } = useAuth();

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoader(true);
        const response = await axios.get(url);

        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    };
    cargar();
  }, []);

  return { data };
};
