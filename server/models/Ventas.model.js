import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Venta = sequelize.define("ventas", {
  id_venta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_producto: {
    type: DataTypes.INTEGER,
  },

  cantidad: {
    type: DataTypes.DECIMAL,
  },

  precio_total_producto: {
    type: DataTypes.DECIMAL,
  },
});
