import {Router} from "express";



import { crearMoneda, getMonedas, getUnaMoneda, updateMoneda } from "../controllers/Moneda.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";


const moneda = Router();


moneda.post("/cambio/", crearMoneda);
moneda.get("/cambio/",  getMonedas);
moneda.put("/cambio/:id", updateMoneda);

moneda.get("/cambio/:id", getUnaMoneda);


export default moneda;