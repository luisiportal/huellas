import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Cuadre_Caja = sequelize.define(
    "cuadre_caja",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      x1000: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      x500: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      x200: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      x100: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      x50: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      x20: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      x10: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      x5: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      x1: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
  
      total_venta: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      total_efectivo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_transferencia: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },

      cantUSD: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },
      cantMLC: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },
      cantZelle: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },

      precioUSD: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },
      precioMLC: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },
      precioZelle: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },
      gastos: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },
      faltante: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },

      grand_total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
  
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      vendedor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tarjeta: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
     // createdAt: false,
    }
  );
  