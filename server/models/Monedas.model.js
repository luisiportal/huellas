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

export const monedasDefecto = () => {
  const monedas = [
    { moneda: "USD", precio: 1 },
    { moneda: "EURO", precio: 1 },
    { moneda: "MLC", precio: 1 },
    { moneda: "ZELLE", precio: 1 },
  ];

  monedas.forEach((moneda) => {
    Moneda.create(moneda);
  });
};
