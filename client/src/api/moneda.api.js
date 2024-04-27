import axios from "./axios.js";

//moneda

export const getTodasMonedaRequest = async () => await axios.get(`/cambio/`);

export const get1MonedaRequest = async (id) => await axios.get(`/cambio/${id}`);

export const crearMonedaRequest = async (values) =>
  await axios.post(`/cambio/new`, values);

export const updateMoneda = async (id, values) =>
  await axios.put(`/cambio/${id}`, values);
