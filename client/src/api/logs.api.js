import axios from "./axios.js";




export const getTodosLogsRequest = async () => await axios.get(`/logs/`);