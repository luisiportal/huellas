import React from "react";
import ElementoNavbar from "./ElementoNavbar.jsx";


const Navbar = ({hidden}) => {
  return (
    <div className={`${hidden} m-4 md:m-0 lg:flex md:ml-8 font-semibold`}>
      <ElementoNavbar nombre={"Inicio"} href={"/"}></ElementoNavbar>
      <ElementoNavbar nombre={"Vender"} href={"/venta/new"}></ElementoNavbar>
      <ElementoNavbar
        nombre={"Movimientos"}
        href={"/movimientos"}
      ></ElementoNavbar>
      <ElementoNavbar nombre={"Nuevo Producto"} href={"/new"}></ElementoNavbar>
      <ElementoNavbar
        nombre={"Nuevo Trabajador"}
        href={"/trabajador/new"}
      ></ElementoNavbar>
      <ElementoNavbar nombre={"Tipo Cambio"} href={"/cambio"}></ElementoNavbar>
      <ElementoNavbar nombre={"pruebas"} href={"/prueba"}></ElementoNavbar>
      <ElementoNavbar nombre={"Plantilla"} href={"/trabajador/plantilla"}></ElementoNavbar>
    </div>
  );
};

export default Navbar;
