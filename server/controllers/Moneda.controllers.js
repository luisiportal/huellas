// monedas g

import { Moneda } from "../models/Monedas.model.js";

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
  try {
    const id_moneda = req.params.id;
    const { moneda, precio } = req.body;

    const response = await Moneda.findByPk(id_moneda);
    response.moneda = moneda;
    response.precio = precio;

    await response.save();

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
