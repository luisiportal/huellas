import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
import { Movimiento } from "./Movimientos.model.js";
import { Producto } from "./Producto.model.js";

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
    type: DataTypes.INTEGER,
  },

  precio_total_producto: {
    type: DataTypes.DECIMAL,
  },
});


