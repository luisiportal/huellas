import axios from "./axios.js";

export const createVentaRequest = async (values, total,creado) => {
  await axios.post(`/ventas`, {  values,total,creado });
};


export const getTodosFacturasRequest = async () =>
  await axios.get("/ventas");

export const deleteFacturaRequest = async (id) =>
  await axios.delete(`/facturas/${id}`);