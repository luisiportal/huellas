import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Factura = sequelize.define("facturas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  total_venta: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
 });