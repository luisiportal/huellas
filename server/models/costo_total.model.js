import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Costo_Total = sequelize.define("costos_totales", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  costo_producto: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },

  });
