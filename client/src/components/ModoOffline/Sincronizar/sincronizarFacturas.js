import { createVentaRequest } from "../../../api/venta.api";

export const sincronizarFacturas = async () => {
  const facturasCrear = JSON.parse(localStorage.getItem("ventas"));

  if (facturasCrear != null) {
    await Promise.all(
      facturasCrear.map((item) => {
        return createVentaRequest(item.ventas, item.total_venta, item.creado);
      })
    );
    localStorage.removeItem("ventas");

    alert("Transacciones sincronizadas");
  }
};
