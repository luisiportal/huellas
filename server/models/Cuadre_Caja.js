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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_efectivo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_transferencia: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      grand_total: {
        type: DataTypes.INTEGER,
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
    },
    {
      timestamps: true,
     // createdAt: false,
    }
  );
  