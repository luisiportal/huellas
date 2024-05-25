import axios from "./axios.js";


//movimientos

export const hacerMoviemientoRequest = async (values) =>
  await axios.post(`/Movimientos/new`, values);

export const getTodosMovimientosRequest = async () =>
  await axios.get("/Movimientos");

export const deleteMovimientoRequest = async (id) =>
  await axios.delete(`/movimientos/${id}`);