import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const AuditLog = sequelize.define("auditlog", {
  logId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  accionRealizada: {
    type: DataTypes.STRING,
  },
  detalles: {
    type: DataTypes.STRING,
  },
  recurso: {
    type: DataTypes.STRING,
  },
  id_recurso: {
    type: DataTypes.INTEGER,
  },
});
