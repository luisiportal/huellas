import axios from "./axios.js";


export const getAllCaregoriasRequest = async () => await axios.get(`/categorias/`);

export const getSingleCategoriaRequest = async (id) => await axios.get(`/categorias/${id}`);

export const crearCategoriaRequest = async (values) =>
  await axios.post(`/categorias/`, values);

export const updateCategoria = async (id, values) =>
  await axios.put(`/categorias/${id}`, values);

export const deleteCategoriaRequest = async (id) =>
    await axios.delete(`/categorias/${id}`);