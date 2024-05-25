import { createContext, useContext, useEffect, useState } from "react";
import { readLocalStorage, writeLocalStorage } from "../hooks/useLocalStorage";

export const CarritosContext = createContext();

export const useCarritos = () => {
  const context = useContext(CarritosContext);
  if (!context) throw new Error("sinm contexto carritos");
  return context;
};

export const CarritosProvaider = ({ children }) => {
  const [carrito1, setCarrito1] = useState([]);
  const [carrito2, setCarrito2] = useState([]);
  const [carrito3, setCarrito3] = useState([]);
  const [carrito4, setCarrito4] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cartSelect, setCartSelect] = useState(0);
  const [nuCart, setnuCart] = useState([]);
  const [recargar, setRecargar] = useState(false);

  useEffect(() => {
    cargarCarritosGuardados();
    getNucart();
  }, [recargar]);

  const cargarCarritosGuardados = () => {
    setCarrito1(readLocalStorage("carrito1"));
    setCarrito2(readLocalStorage("carrito2"));
    setCarrito3(readLocalStorage("carrito3"));
    setCarrito4(readLocalStorage("carrito4"));
  };

  const getNucart = () => {
    if (nuCart == null) {
      setnuCart([]);
    } else {
      setnuCart(readLocalStorage("nuCart"));
    }
  };

  const guardarCarrito = () => {
    if (carrito.length == 0) {
      alert("Carrito Vacio");
    } else {
      let i = 1;

  if (nuCart){
        while (i <= 4) {
        if (!nuCart.includes(i)) {
          setnuCart([...nuCart, i]);

          writeLocalStorage("nuCart", [...nuCart, i]);
          writeLocalStorage("carrito" + i, [...carrito]);
          setCarrito([]);
          alert("Carrito Guardado");
          setRecargar(!recargar);
          break;
        }
        i++;
      }
  }else{
    writeLocalStorage("nuCart",[1])
  }
    }
  };
  const cargarCarrito = (nuCart) => {
    setCarrito([0]);
    setCarrito(readLocalStorage("carrito" + nuCart));
    setCartSelect(nuCart);
    alert("Carrito " + nuCart + " Cargado");
  };

  return (
    <CarritosContext.Provider
      value={{
        carrito1,
        carrito2,
        carrito3,
        carrito4,
        recargar,
        carrito,
        setCarrito,
        setRecargar,
        guardarCarrito,
        cargarCarrito,
        nuCart,
        setnuCart,
        cartSelect,
      }}
    >
      {children}
    </CarritosContext.Provider>
  );
};
