import { Producto } from "../models/Producto.model.js";
import { saveImage } from "../controllers/upload.multer.js";
import { Costo_Total } from "../models/costo_total.model.js";

// listar todas los productos

export const getTodosProductos = async (req, res) => {
  try {
    const response = await Producto.findAll({
      order: [["id_producto", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// listar un producto
export const getProducto = async (req, res) => {
  try {
    const id_producto = req.params.id_producto;

    const response = await Producto.findByPk(id_producto);
    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// crear una producto
export const createProducto = async (req, res) => {
  let ruta_image = "default.jpg";
  if (req.file !== undefined) {
    ruta_image = req.file.originalname;
  }

  try {
    const {
      nombre_producto,
      description_producto,
      costo_unitario,
      precio_venta,
      categoria,
      existencia,
      stockMinimo,
      unidadMedida,
    } = req.body;

    const response = await Producto.create({
      nombre_producto,
      description_producto,
      costo_unitario,
      precio_venta,
      categoria,
      existencia,
      ruta_image,
      stockMinimo,
      unidadMedida,
    });

    res.json({
      id_producto: response.insertId,
      nombre_producto,
      description_producto,
      costo_unitario,
      precio_venta,
      categoria,
      existencia,
      stockMinimo,
      unidadMedida,
      ruta_image,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  saveImage(req.file, "productos");
};

// actualizar

export const updateProducto = async (req, res) => {
  try {
    const id_producto = req.params.id_producto;
    let ruta_image = "";
    if (req.file !== undefined) {
      ruta_image = req.file.originalname;
    }
    const {
      nombre_producto,
      description_producto,
      costo_unitario,
      precio_venta,
      categoria,
      stockMinimo,
      unidadMedida,
    } = req.body;

    const response = await Producto.findByPk(id_producto);
    response.nombre_producto = nombre_producto;
    response.description_producto = description_producto;
    response.costo_unitario = costo_unitario;
    response.precio_venta = precio_venta;
    response.categoria = categoria;
    ruta_image && (response.ruta_image = ruta_image);
    response.stockMinimo = stockMinimo;
    response.unidadMedida = unidadMedida;
    await response.save();
    saveImage(req.file, "productos");
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// borrar

export const deleteProducto = async (req, res) => {
  try {
    const response = await Producto.destroy({
      where: {
        id_producto: req.params.id_producto,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
