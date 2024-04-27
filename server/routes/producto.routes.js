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

router.get("/Productos", getTodosProductos);

router.get("/Productos/:id_producto", getProducto);

router.post(
  "/Productos",
  uploadProducto.single("ruta_image"),
  createProducto
);

router.put(
  "/Productos/:id_producto",
  uploadProducto.single("ruta_image"),
  updateProducto
);

router.delete("/Productos/:id_producto", deleteProducto);

export default router;
