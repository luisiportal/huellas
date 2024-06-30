import { Router } from "express";
import {
  deleteMovimiento,
  getTodosMovimientos,
  hacerMovimientoAPi,
  updateMovimiento,
} from "../controllers/Movimientos.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const movimientos = Router();

movimientos.post("/Movimientos/new", authRequired, hacerMovimientoAPi);

movimientos.get("/Movimientos", authRequired, getTodosMovimientos);
movimientos.delete("/Movimientos/:id", authRequired, deleteMovimiento);
movimientos.put("/movimientos/", authRequired, updateMovimiento);


export default movimientos;
