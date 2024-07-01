import axios from "./axios.js";

export const createVentaRequest = async (values, total, creado) => {
  await axios.post(`/ventas`, { values, total, creado });
};

export const getTodosFacturasRequest = async (limit) =>
  await axios.get(`/ventas?limit=${limit}`);

export const deleteFacturaRequest = async (id) =>
  await axios.delete(`/facturas/${id}`);

export const updateFechaFacturaRequest = async (values) => {
  await axios.put(`/facturas/`, values);
};
