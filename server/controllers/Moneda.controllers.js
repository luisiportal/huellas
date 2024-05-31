// monedas g

import sequelize from "../db.js";
import { Moneda } from "../models/Monedas.model.js";
import { registrarLog } from "./AuditLog.controllers.js";

export const crearMoneda = async (req, res) => {
  try {
    const { moneda, precio } = req.body;
    const response = await Moneda.create({
      moneda,
      precio,
    });

    res.json({
      moneda,
      precio,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//listar todas las monedas
export const getMonedas = async (req, res) => {
  try {
    const response = await Moneda.findAll({
      order: [["id_moneda", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// listar una sola moneda

export const getUnaMoneda = async (req, res) => {
  try {
    const id_moneda = req.params.id;

    const response = await Moneda.findByPk(id_moneda);
    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// actualizar precio moneda
export const updateMoneda = async (req, res) => {
  const id_moneda = req.params.id;

  const { moneda, precio } = req.body;
  sequelize.transaction(async (t) => {
    try {
      const response = await Moneda.findByPk(id_moneda);
      response.moneda = moneda;
      response.precio = precio;

      await response.save({ transaction: t }); // Pasamos la transacción como opción al método save
      res.json(response);
      await registrarLog("Actualizó","Moneda", `${response.moneda} precio: ${response.precio}`, req, t);
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar el error, por ejemplo, enviando una respuesta con un código de estado 500
    }
  });
};
