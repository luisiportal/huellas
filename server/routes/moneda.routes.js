import {Router} from "express";



import { crearMoneda, getMonedas, getUnaMoneda, updateMoneda } from "../controllers/Moneda.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";


const moneda = Router();


moneda.post("/cambio/",authRequired, crearMoneda);
moneda.get("/cambio/",authRequired,  getMonedas);
moneda.put("/cambio/:id",authRequired, updateMoneda);

moneda.get("/cambio/:id",authRequired, getUnaMoneda);


export default moneda;