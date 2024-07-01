import { Op } from "sequelize";
import sequelize from "../db.js";
import { Factura } from "../models/Facturas.model.js";
import { Venta } from "../models/Ventas.model.js";
import { Producto } from "../models/Producto.model.js";
import { registrarLog } from "./AuditLog.controllers.js";
import { Movimiento } from "../models/Movimientos.model.js";

export const createVenta = async (req, res) => {
  const productos = req.body.values;
  const { total } = req.body;
  const { creado } = req.body;
  try {
    await sequelize.transaction(async (t) => {
      // Crear la factura
      const factura = await Factura.create(
        {
          total_venta: total, // Utiliza el valor del total recibido
          creado: creado,
        },
        { transaction: t }
      );
      await registrarLog("Facturó", "Venta", ` total : ${total} cup`, req, t);
      // Recorre los productos
      for (const producto of productos) {
        // Crear la venta
        const ventaNueva = await Venta.create(
          {
            id_producto: producto.id_producto,
            cantidad: producto.cantidad,
            precio_total_producto: producto.cantidad * producto.precio_venta,
            id_factura: factura.id,
          },
          { transaction: t }
        );
        await Movimiento.create(
          {
            id_producto: producto.id_producto,
            tipo: "Venta",
            cantidad: producto.cantidad,
            id_venta: ventaNueva.id_venta,
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

export const updateFechaFactura = async (req, res) => {
  const { fecha, id } = req.body;

  let fechaConHora = new Date(`${fecha}T08:00:00`);

  sequelize.transaction(async (t) => {
    try {
      const response = await Factura.findByPk(id);

      response.creado = fechaConHora;
      await response.save({ transaction: t }); // Pasamos la transacción como opción al método save
      res.json(response);
      await registrarLog(
        "Actualizó",
        "Transacción",
        `${response.id} fecha: ${fecha}`,
        req,
        t
      );
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar el error, por ejemplo, enviando una respuesta con un código de estado 500
    }
  });
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
  const { limit, offset } = req.query;

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
      order: [["creado", "DESC"]],
      limit: limit,
      offset: offset,
    });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteFactura = async (req, res) => {
  try {
    sequelize.transaction(async (t) => {
      const responseVentas = await Venta.destroy({
        where: {
          id_factura: req.params.id,
        },
      });

      const response = await Factura.destroy(
        {
          where: {
            id: req.params.id,
          },
        },
        { transaction: t }
      );
      await registrarLog("Elimino", "Factura", req.params.id, req, t);

      res.sendStatus(204);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
