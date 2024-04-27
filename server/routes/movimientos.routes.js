import {Router} from "express";
import { getTodosMovimientos, hacerMovimientoAPi } from "../controllers/Movimientos.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";


const movimientos = Router();



    movimientos.put("/Movimientos/new", hacerMovimientoAPi);

    movimientos.get("/Movimientos",  getTodosMovimientos);


    export default movimientos;