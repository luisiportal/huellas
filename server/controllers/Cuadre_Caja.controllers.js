import sequelize from "../db.js";
import { Cuadre_Caja } from "../models/Cuadre_Caja.js";

export const insertarCuadre = async (req, res) => {
  console.log(req.body);
  try {
    const {
      precioUSD,
      cantUSD,
      precioMLC,
      cantMLC,
      gastos,
      totalVentaHoy,
      totalEfectivo,
      total_transferencia,
      grand_total,
      tarjeta,
      vendedor,
      fechaVentaDate,
      faltante,
    } = req.body;
    const { x1000, x500, x200, x100, x50, x20, x10, x5, x1 } = req.body.values;

    const response = await Cuadre_Caja.create({
      x1000,
      x500,
      x200,
      x100,
      x50,
      x20,
      x10,
      x5,
      x1,
      total_venta: totalVentaHoy,
      total_efectivo: totalEfectivo,
      total_transferencia,
      grand_total,
      vendedor,
      fecha: fechaVentaDate,
      precioUSD,
      precioMLC,
      cantMLC,
      cantUSD,
      gastos,
      tarjeta,
      faltante,
    });

    res.json({
      x1000,
      x500,
      x200,
      x100,
      x50,
      x20,
      x10,
      x5,
      x1,
      totalVentaHoy,
      totalEfectivo,
      total_transferencia,
      grand_total,
      vendedor,
      faltante,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCuadreporDia = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await Cuadre_Caja.findByPk(id);
    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getTodosCuadres = async (req, res) => {
  try {
    const response = await Cuadre_Caja.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
