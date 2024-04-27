import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Moneda = sequelize.define("monedas", {
  id_moneda: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  moneda: {
    type: DataTypes.STRING,
    allowNull: false,                                                                                                                                                                                                                                                                                                                                    
  },

  precio: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
 });
