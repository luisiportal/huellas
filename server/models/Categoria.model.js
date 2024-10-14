import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Categoria = sequelize.define("categorias", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mascota: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ruta_image: {
    type: DataTypes.STRING,
  },
});
