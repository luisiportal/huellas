import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

// Define el tipo de la función recursoRequest
type RecursoRequest = (limit?: number) => Promise<{ data: any }>;

// Hook personalizado useRequest
export const useRequest = (recursoRequest: RecursoRequest, limit?: number) => {
  const [recurso, setRecurso] = useState<any[]>([]);
  const { setLoader } = useAuth();
  useEffect(() => {
    const cargarRecurso = async () => {
      try {
        setLoader(true);

        const { data } = await recursoRequest(limit);
        setRecurso(data);
        setLoader(false);
      } catch (error) {
        console.error("Error al cargar el recurso:", error);
      }
    };
    cargarRecurso();
  }, [recursoRequest]);

  return { recurso, setRecurso };
};
