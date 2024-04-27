import React, { createContext, useState } from "react";

export const MovimientoContext = createContext();

function MovimientoProvider(props) {
  const [productos, setProductos] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${ipServer}:4000/Productos`)
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MovimientoContext.Provider
      value={{ productos, setProductos, results, setResults }}
    >
      {children}
    </MovimientoContext.Provider>
  );
}

export default MovimientoProvider;
