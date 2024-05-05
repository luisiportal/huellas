import { Router } from "express";
import {
  getTodosMovimientos,
  hacerMovimientoAPi,
} from "../controllers/Movimientos.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const movimientos = Router();

movimientos.put("/Movimientos/new", authRequired, hacerMovimientoAPi);

movimientos.get("/Movimientos", authRequired, getTodosMovimientos);

export default movimientos;
