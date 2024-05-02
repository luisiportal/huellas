import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Producto = sequelize.define("productos", {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre_producto: {
    type: DataTypes.STRING,
  },
  description_producto: {
    type: DataTypes.STRING,
  },
  categoria: {
    type: DataTypes.STRING,
  },
  costo_unitario: {
    type: DataTypes.DECIMAL(10, 2),
  },
  costo_total: {
    type: DataTypes.DECIMAL(10, 2),
  },
  precio_venta: {
    type: DataTypes.DECIMAL(10, 2),
  },

  existencia: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  existencia_inicial: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  stockMinimo: {
    type: DataTypes.DECIMAL(10, 2),
  },
  unidadMedida: {
    type: DataTypes.STRING,
  },
  ruta_image: {
    type: DataTypes.STRING,
  },
  costo_usd: {
    type: DataTypes.DECIMAL(10, 2),
  },
  costo_euro: {
    type: DataTypes.DECIMAL(10, 2),
  },
  costo_mlc: {
    type: DataTypes.DECIMAL(10, 2),
  },
  costo_zelle: {
    type: DataTypes.DECIMAL(10, 2),
  },
});


