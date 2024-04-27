import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { createVenta } from "../controllers/Venta.controller.js";

const ventas = Router();

ventas.post("/ventas", createVenta);

export default ventas;
