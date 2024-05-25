import React from "react";
import { CarritosProvaider } from "../context/CarritosContext";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NuevaVenta from "../components/Ventas/NuevaVenta";
import VentasPage from "../pages/VentasPage";

const VentasRoutes = () => {
  return (
    <CarritosProvaider>
      <Routes>
        <Route path="/new" element={<NuevaVenta />} />
        <Route path="/" element={<VentasPage />} />
        <Route path="/new/:id" element={<NuevaVenta />} />
      </Routes>
    </CarritosProvaider>
  );
};

export default VentasRoutes;
