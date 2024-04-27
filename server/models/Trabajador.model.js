import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Trabajador = sequelize.define("trabajadores", {
  id_trabajador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
  },
  movil: {
    type: DataTypes.STRING,
  },
  puesto: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING,
  },

  salario: {
    type: DataTypes.DECIMAL(10, 2),
  },
  foto_perfil: {
    type: DataTypes.STRING,
  },
});
