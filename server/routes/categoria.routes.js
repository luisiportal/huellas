import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import {
  crearCategoria,
  deleteCategoria,
  getAllCategorias,
  getSingleCategoria,
  updateCategoria,
} from "../controllers/Categoria.controllers.js";
import { uploadCategoria } from "../controllers/upload.multer.js";
const categoriaRouter = Router();

categoriaRouter.get("/categorias", getAllCategorias);

categoriaRouter.get("/categorias/:id", authRequired, getSingleCategoria);

categoriaRouter.post(
  "/categorias",
  authRequired,
  uploadCategoria.single("ruta_image"),
  crearCategoria
);

categoriaRouter.put(
  "/categorias/:id",
  authRequired,
  uploadCategoria.single("ruta_image"),
  updateCategoria
);

categoriaRouter.delete("/categorias/:id", authRequired, deleteCategoria);

export default categoriaRouter;
