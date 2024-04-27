import axios from "./axios.js";


//movimientos

export const hacerMoviemientoRequest = async (values) =>
  await axios.put(`/Movimientos/new`, values);

export const getTodosMovimientosRequest = async () =>
  await axios.get("/Movimientos");