import { Op } from "sequelize";
import sequelize from "../db.js";
import { Factura } from "../models/Facturas.model.js";
import { Venta } from "../models/Ventas.model.js";
import { Producto } from "../models/Producto.model.js";

export const createVenta = async (req, res) => {
  const productos = req.body.values;
  const { total } = req.body;
  try {
    await sequelize.transaction(async (t) => {
      // Crear la factura
      const factura = await Factura.create(
        {
          total_venta: total, // Utiliza el valor del total recibido
        },
        { transaction: t }
      );

      // Recorre los productos
      for (const producto of productos) {
        // Crear la venta
        await Venta.create(
          {
            id_producto: producto.id_producto,
            cantidad: producto.cantidad,
            precio_total_producto: producto.cantidad * producto.precio_venta,
            id_factura: factura.id,
          },
          { transaction: t }
        );
      }
    });

    return res.status(200).json({ message: "Ventas creadas correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTodosVentas = async (req, res) => {
  try {
    const response = await Venta.findAll({
      order: [["id_venta", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getTodosFacturas = async (req, res) => {
  try {
    const response = await Factura.findAll({
      include: [
        {
          model: Venta,
          required: false,
          include: [
            {
              model: Producto,
              required: false,
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
