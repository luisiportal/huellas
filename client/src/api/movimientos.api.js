import axios from "./axios.js";

//movimientos

export const hacerMoviemientoRequest = async (values) =>
  await axios.post(`/Movimientos/new`, values);

export const getTodosMovimientosRequest = async (limit) =>
  await axios.get(`/Movimientos?limit=${limit}`);

export const deleteMovimientoRequest = async (id) =>
  await axios.delete(`/movimientos/${id}`);

export const updateFechaMovimientoRequest = async (values) => {
  await axios.put(`/movimientos/`, values);
};
