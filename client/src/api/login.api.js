import axios from "./axios.js";

export const verifyTokenRequest = () => axios.get(`/auth/verify`);

// usuarios
export const registerRequest = async (formData) =>
  await axios.post(`trabajadores/`, formData);

//login
export const loginRequest = async (values) =>
  await axios.post(`trabajadores/login/`, values);


//logout

export const logoutRequest = async () =>
  await axios.post(`/trabajadores/logout`);

//perfil
export const cargarPerfilRequest = async (id) =>
  await axios.get(`trabajadores/profile/${id}`);

// plantilla trabajadores
export const cargarPlantillaTrabajadores = async () =>
  await axios.get(`trabajadores/plantilla`);

export const perfilRequest = async (values) =>
  await axios.post(`trabajadores/profile`, values);

// actualizar trabajador
export const updateTrabajadorRequest = async (id, formData) => 
await axios.put(`trabajadores/profile/${id}`, formData);


export const deleteTrabajadorRequest = async (id) =>
  await axios.delete(`trabajadores/profile/${id}`);
