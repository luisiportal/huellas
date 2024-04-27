import { pool } from "../db.js";

// calcular costo usd
export const costoUSD = async (id,moneda) => {  
      try {
      const result_USD = await pool.query(
        `SELECT precio from tipo_cambio Where id=${id}`
      );
      const precio_USD = result_USD[0][0].precio;
  
     
  
      const [costo_unitario] = await pool.query(
        " SELECT costo_unitario,id_producto FROM productos"
      );
      
  
      const costoEnUSD = costo_unitario.map((costo) => {
        const costoUSD = (costo.costo_unitario / precio_USD);
        const id_producto = costo.id_producto;
        return { costoUSD, id_producto };
      });
      
      
      for (const item of costoEnUSD) {
        const [result] = await pool.query(
          `UPDATE Productos SET costo_${moneda} = ? WHERE id_producto= ?`,
          [item.costoUSD, item.id_producto]
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

 