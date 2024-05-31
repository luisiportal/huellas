import { Router } from "express";
import { getTodosLogs } from "../controllers/AuditLog.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";


const audiTlogs = Router();


audiTlogs.get("/logs",authRequired ,getTodosLogs);


export default audiTlogs;
