import axios from "./axios.js";

export const getTodosLogsRequest = async (limit) =>
  await axios.get(`/logs?limit=${limit}`);
