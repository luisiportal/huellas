import { hacerMoviemientoRequest } from "../../../api/movimientos.api";
export const sincronizarMovimientos = async () => {
  try {

 const movimientosCrear = JSON.parse(
      localStorage.getItem("movimientosCrear")
    );
    console.log(movimientosCrear);

    if (movimientosCrear != null) {
      await Promise.all(
        movimientosCrear.map((item) => {
          console.log(item);
          return hacerMoviemientoRequest(item);
        })
      );
      localStorage.removeItem("movimientosCrear");
      return alert("Movimientos sincronizados");
    } else {
      return alert("Sin movimientos a sincronizar");
    }
  } catch (error) {}
};
