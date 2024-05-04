import axios from "./axios.js";

export const createVentaRequest = async (values, total) => {
  await axios.post(`/ventas`, { total, values });
};


export const getTodosFacturasRequest = async () =>
  await axios.get("/ventas");
