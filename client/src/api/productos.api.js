import axios from "./axios.js";

//productos

export const getProductosRequest = async () => await axios.get(`/Productos`);

export const createProductoRequest = async (formData) => {
  await axios.post(`/Productos`, formData);
};

export const deleteProductoRequest = async (id_producto) =>
  await axios.delete(`/Productos/${id_producto}`);

export const getProductoRequest = async (id_producto) =>
  await axios.get(`/Productos/${id_producto}`);

export const updateProductoRequest = async (id_producto, formData) =>
  await axios.put(`/Productos/${id_producto}`, formData);
