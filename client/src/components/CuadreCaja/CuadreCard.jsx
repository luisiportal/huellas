/* eslint-disable react/prop-types */

import { deleteCuadreRequest } from "../../api/cuadre_caja.api";
import CardSVG from "../SVG/CardSVG";
import DeleteSVG from "../SVG/DeleteSVG";
import UserSvg from "../SVG/UserSvg";

function CuadreCard({
  cuadre,
  setModalActivo,
  setRecargar,
  setLoader,
  perfil,
}) {
  const handleDelete = async (id) => {
    try {
      setLoader(true);
      const response = await deleteCuadreRequest(id);
      setModalActivo({
        mensaje: "Cuadre Eliminado",
        activo: true,
        errorColor: true,
      });
      setRecargar(id);
    } catch (error) {
      console.error(error);
    }
    setLoader(false);
  };

  return (
    <section className="shadow-md  mt-8 mx-2 grid grid-cols-2 gap-4 bg-white border-l-4 border-huellas_color rounded-xl mb-5 max-w-md">
      <div>
        {/* left*/}
        <div className="flex gap-1 bg-huellas_color rounded-br-xl rounded-tl-lg p-2 text-white font-bold">
          <UserSvg estilo={"w-6 h-6 text-white font-extrabold"} />{" "}
          {cuadre.vendedor}
        </div>

        <div className="p-2">
          <h2 className="border-b-2 border-slate-200 font-semibold text-slate-900">
            Transacción{" "}
          </h2>
          <h4 className="text-xs text-slate-600">
            Fecha : {new Date(cuadre.fecha).toLocaleString("es-ES")}
          </h4>
          <h2 className="text-xs text-slate-600">
            Venta : {cuadre.total_venta} cup
          </h2>

          <h2 className=" border-b-2 border-slate-200 font-semibold text-slate-900">
            En transferencia CUP
          </h2>
          {cuadre.tarjeta && (
            <div className="flex text-xs justify-end items-center text-slate-900">
              <CardSVG />
              {` ${cuadre.tarjeta}`}
            </div>
          )}
          <h2 className="flex justify-center text-slate-600 items-center gap-2">
            {`${cuadre.total_transferencia} `}
          </h2>

          <h2 className="border-b-2 border-slate-200 font-semibold text-slate-900">
            En USD
          </h2>
          <h2 className="flex justify-center text-slate-600">
            {cuadre.cantUSD
              ? `${cuadre.cantUSD} x ${cuadre.precioUSD} = ${Number(
                  cuadre.cantUSD * cuadre.precioUSD
                )} cup`
              : 0}
          </h2>
          <h2 className="border-b-2 border-slate-200 font-semibold text-slate-900">
            En MLC
          </h2>
          <h2 className="flex justify-center text-slate-600">
            {cuadre.cantMLC
              ? `${cuadre.cantMLC} x ${cuadre.precioMLC} = ${Number(
                  cuadre.cantMLC * cuadre.precioMLC
                )} cup`
              : 0}
          </h2>
          <h2 className="border-b-2 border-slate-200 font-semibold text-slate-900">
            Zelle
          </h2>
          <h2 className="flex justify-center text-slate-600">
            {cuadre.cantZelle
              ? `${cuadre.cantZelle} x ${cuadre.precioZelle} = ${Number(
                  cuadre.cantZelle * cuadre.precioZelle
                )} cup`
              : 0}
          </h2>
        </div>
      </div>

      <div className=" flex flex-col justify-end border-l-2 border-slate-200 font-semibold">
        {/* right*/}
        <div className="flex justify-between p-1">
          {" "}
          <h2 className="border-b-2 border-slate-200 font-semibold text-slate-900">
            En efectivo
          </h2>
          {perfil.privilegio == "Administrador" && (
            <button
              onClick={() => handleDelete(cuadre.id)}
              className="hover:text-huellas_color transition-all duration-500 hover:scale-125"
            >
              <DeleteSVG />
            </button>
          )}
        </div>
        <h2 className="flex justify-center text-slate-600">
          {cuadre.total_efectivo}
        </h2>
        <div className="p-2  pl-4 text-slate-600  text-xs">
          <p>
            {cuadre.x1000} x 1000 = {cuadre.x1000 * 1000}{" "}
          </p>
          <p>
            {cuadre.x500} x 500 = {cuadre.x500 * 500}{" "}
          </p>
          <p>
            {cuadre.x200} x 200 = {cuadre.x200 * 200}{" "}
          </p>
          <p>
            {" "}
            {cuadre.x100} x 100 = {cuadre.x100 * 100}{" "}
          </p>
          <p>
            {" "}
            {cuadre.x50} x 50 = {cuadre.x50 * 50}{" "}
          </p>
          <p>
            {" "}
            {cuadre.x20} x 20 = {cuadre.x20 * 20}{" "}
          </p>
          <p>
            {" "}
            {cuadre.x10} x 10 = {cuadre.x10 * 10}{" "}
          </p>
          <p>
            {" "}
            {cuadre.x5} x 5 = {cuadre.x5 * 5}{" "}
          </p>
          <p>
            {" "}
            {cuadre.x1} x 1 = {cuadre.x1 * 1}{" "}
          </p>
        </div>

        <h2 className="flex justify-center border-t-2 border-slate-200 text-slate-600 mx-4">
          {cuadre.total_efectivo}
        </h2>
        <h2 className="border-b-2 border-slate-200 font-semibold text-slate-900">
          Gastos
        </h2>
        <h2 className="flex justify-center text-slate-600">
          {cuadre.gastos ? `${cuadre.gastos} cup` : 0}
        </h2>
        <div
          className={`flex flex-col justify-end ${
            cuadre.faltante > 0 ? "bg-red-600" : "bg-huellas_color"
          }  rounded-br-xl rounded-tl-lg p-2  text-white  font-bold text-base bottom-0`}
        >
          <h2> Total : {cuadre.grand_total}</h2>
          {cuadre.faltante > 0 && <h2>Faltante : {cuadre.faltante}</h2>}
        </div>
      </div>
    </section>
  );
}

export default CuadreCard;
