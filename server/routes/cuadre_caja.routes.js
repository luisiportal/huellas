import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getCuadreporDia, getTodosCuadres, insertarCuadre } from "../controllers/Cuadre_Caja.controllers.js";

const cuadre_caja = Router();

cuadre_caja.post("/cuadre", authRequired, insertarCuadre);
cuadre_caja.get("/cuadre/", authRequired, getTodosCuadres);

export default cuadre_caja;
