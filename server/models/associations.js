import { Producto } from "./Producto.model.js";
import { Movimiento } from "./Movimientos.model.js";
import { Venta } from "./Ventas.model.js";
import { Factura } from "./Facturas.model.js";

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
