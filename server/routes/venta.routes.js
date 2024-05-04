import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import {
  createVenta,
  getTodosFacturas,
  getTodosVentas,
} from "../controllers/Venta.controller.js";

const ventas = Router();

ventas.post("/ventas",authRequired, createVenta);
ventas.get("/ventas", getTodosFacturas);

export default ventas;
