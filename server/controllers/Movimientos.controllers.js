import { Op } from "sequelize";
import sequelize from "../db.js";
import { Movimiento } from "../models/Movimientos.model.js";
import { Producto } from "../models/Producto.model.js";

export const hacerMovimientoAPi = async (req, res) => {
  try {
    const { existencia, cantidad, id_producto } = req.body;
    if (req.body.tipo === "Entrada") {
      const response = await Producto.findByPk(id_producto);
      console.log(cantidad);
      console.log(existencia);
      response.existencia = Number(cantidad) + Number(existencia);

      await response.save();

      res.json(response);
    }

    if (req.body.tipo === "Salida") {
      const response = await Producto.findByPk(id_producto);
      response.existencia = existencia - cantidad;

      await response.save();

      res.json(response);
    }

    regsitrarMovimiento(
      req.body.id_producto,
      req.body.tipo,
      req.body.producto,
      req.body.cantidad
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// regsitrar entrada/ salida  --- movimiento
export const regsitrarMovimiento = async (
  id_producto,
  tipo,
  producto,
  cantidad
) => {
  try {
    const response = await Movimiento.create({
      id_producto,
      tipo,
      producto,
      cantidad,
    });
  } catch (error) {
    console.log("Error al registrar movimiento");
  }
};

// listar movimiemtons

export const getTodosMovimientos = async (req, res) => {
  try {
    const response = await Movimiento.findAll({
      where: {
        id_producto: {
          [Op.eq]: sequelize.col("movimientos.id_producto"), // Esto devuelve un booleano
        },
      },
      include: [
        {
          model: Producto,
          attributes: ["nombre_producto", 'ruta_image'],
          required: true,
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
