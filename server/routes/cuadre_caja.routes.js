import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { deleteCuadre, getCuadreporDia, getTodosCuadres, insertarCuadre } from "../controllers/Cuadre_Caja.controllers.js";

const cuadre_caja = Router();

cuadre_caja.post("/cuadre", authRequired, insertarCuadre);
cuadre_caja.get("/cuadre/", authRequired, getTodosCuadres);
cuadre_caja.delete("/cuadre/:id", authRequired, deleteCuadre);


export default cuadre_caja;
