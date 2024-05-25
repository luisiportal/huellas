import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import {
  createVenta,
  deleteFactura,
  getTodosFacturas,
} from "../controllers/Venta.controller.js";

const ventas = Router();

ventas.post("/ventas", authRequired, createVenta);
ventas.get("/ventas", authRequired, getTodosFacturas);
ventas.delete("/facturas/:id", deleteFactura);

export default ventas;
