import { hacerMoviemientoRequest } from "../../../api/movimientos.api";
export const sincronizarMovimientos = async () => {
  try {
    const movimientosCrear = JSON.parse(
      localStorage.getItem("movimientosCrear")
      
    );
    localStorage.removeItem("movimientosCrear");
    if (movimientosCrear != null) {
      await Promise.all(
        movimientosCrear.map((item) => {
          console.log(item);
          return hacerMoviemientoRequest(item);
        })
      );

      alert("Movimientos sincronizados");
    }
  } catch (error) {}
};
