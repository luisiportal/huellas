import { Producto } from "../models/Producto.model.js";
import { saveImage } from "../controllers/upload.multer.js";

import sequelize from "../db.js";

import { registrarLog } from "./AuditLog.controllers.js";

// listar todas los productos

export const getTodosProductos = async (req, res) => {
  try {
    const response = await Producto.findAll({
      order: [["nombre_producto", "ASC"]],
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
      existencia_inicial,
    } = req.body;

    // Iniciar una transacción

    try {
      sequelize.transaction(async (t) => {
        const response = await Producto.create(
          {
            nombre_producto,
            description_producto,
            costo_unitario,
            precio_venta,
            categoria,
            existencia,
            ruta_image,
            stockMinimo,
            unidadMedida,
            existencia_inicial,
          },
          { transaction: t }
        );

        await registrarLog("Creó", ` Producto`, `  ${nombre_producto}`, req, t);

        // Si todo salió bien, hacemos commit de la transacción

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
          existencia_inicial,
        });
      });
    } catch (error) {
      // Si algo salió mal, revertimos la transacción
      await t.rollback();
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  saveImage(req.file, "productos");
};

// actualizar

export const updateProducto = async (req, res) => {
  try {
    sequelize.transaction(async (t) => {
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
      await response.save({ transaction: t });

      await registrarLog(
        "Actualizó",
        "Producto",
        `${response.nombre_producto}   `,
        req,
        t
      ); // Asegúrate de que registrarLog acepta la transacción como argumento
      saveImage(req.file, "productos");
      res.json(response);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// borrar

export const deleteProducto = async (req, res) => {
  try {
    sequelize.transaction(async (t) => {
      const productoTraidoDB = await Producto.findByPk(req.params.id_producto);

      const response = await Producto.destroy(
        {
          where: {
            id_producto: req.params.id_producto,
          },
        },
        { transaction: t }
      );
      await registrarLog(
        "Eliminó",
        "Producto",
        `${productoTraidoDB.nombre_producto} cantidad : ${productoTraidoDB.existencia}`,
        req,
        t,
        req.params.id_producto
      );
      res.sendStatus(204);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
