import { Router } from "express";
import {
  getTodosProductos,
  getProducto,
  createProducto,
  deleteProducto,
  updateProducto,
} from "../controllers/Productos.controllers.js";
import { uploadProducto } from "../controllers/upload.multer.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router();

router.get("/Productos",authRequired, getTodosProductos);

router.get("/Productos/:id_producto",authRequired, getProducto);

router.post(
  "/Productos",authRequired,
  uploadProducto.single("ruta_image"),
  createProducto
);

router.put(
  "/Productos/:id_producto",authRequired,
  uploadProducto.single("ruta_image"),
  updateProducto
);

router.delete("/Productos/:id_producto",authRequired, deleteProducto);

export default router;
