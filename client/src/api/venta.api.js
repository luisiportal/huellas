import axios from "./axios.js";

//productos

export const createVentaRequest = async (values,total) =>{
  await axios.post(`/ventas`, {total,values});

}


