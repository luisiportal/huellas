import { Producto } from "./Producto.model.js";
import { Movimiento } from "./Movimientos.model.js";
import { Venta } from "./Ventas.model.js";
import { Factura } from "./Facturas.model.js";
import { Trabajador } from "./Trabajador.model.js";
import { AuditLog } from "./AuditLog.model.js";

export const associations = () => {
  Producto.hasMany(Movimiento, {
    foreignKey: "id_producto",
    onDelete: "CASCADE",
    hooks: true,
  });

  Movimiento.belongsTo(Producto, { foreignKey: "id_producto" });
};

Factura.hasMany(Venta, {
  foreignKey: "id_factura",
  onDelete: "CASCADE",
  hooks: true,
});

Venta.belongsTo(Factura, { foreignKey: "id_factura" });
Venta.belongsTo(Producto, { foreignKey: "id_producto" });

Trabajador.hasMany(AuditLog, { foreignKey: "id_usuario" });
AuditLog.belongsTo(Trabajador, { foreignKey: "id_usuario" });
