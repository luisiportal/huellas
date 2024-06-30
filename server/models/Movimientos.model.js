import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Movimiento = sequelize.define("movimientos", {
  id_movimiento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_producto: {
    type: DataTypes.INTEGER,
  },
  id_venta: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.DECIMAL,
  },
  creado: {
    type: DataTypes.DATE,
  },
});
