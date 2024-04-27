import { Router } from "express";

import {
  login,
  logout,
  profile,
  verifyToken,
  plantillaTrabajadores,
  updatePerfilTrabajador,
  register,
  deleteTrabajador,
} from "../controllers/Trabajador.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { uploadTrabajador } from "../controllers/upload.multer.js";

const loginRouter = Router();

loginRouter.post("/trabajadores/",uploadTrabajador.single("foto_perfil"), register);
loginRouter.post("/trabajadores/login", login);
loginRouter.post("/trabajadores/logout", logout);

loginRouter.get("/trabajadores/profile/:id", profile);
loginRouter.put("/trabajadores/profile/:id",uploadTrabajador.single("foto_perfil"), updatePerfilTrabajador);
loginRouter.get("/trabajadores/plantilla",  plantillaTrabajadores);
loginRouter.delete("/trabajadores/profile/:id",  deleteTrabajador);

loginRouter.get("/auth/verify", verifyToken);

export default loginRouter;
