import axios from "./axios.js";

export const insertarCuadreRequest = async (values) =>
    await axios.post(`/cuadre`, values);

export const getTodosCuadreRequest = async () =>
    await axios.get(`/cuadre`);

export const getCuadreporDiaRequest = async (id) =>
    await axios.get(`/cuadre/${id}`);