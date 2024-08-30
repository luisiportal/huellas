import { useAuth } from "../../context/AuthContext";

import EditSVG from "../SVG/EditSVG";
import UserSvg from "../SVG/UserSvg";

function CuadreCard({ cuadre }) {
  const { setModalActivo, modalActivo, editando, setEditando, perfil } =
    useAuth();

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
            En transferencia
          </h2>
          <h2 className="flex justify-center text-slate-600">
            {cuadre.total_transferencia}
          </h2>
          <h2 className="border-b-2 border-slate-200 font-semibold text-slate-900">
            En efectivo
          </h2>
          <h2 className="flex justify-center text-slate-600">
            {cuadre.total_efectivo}
          </h2>
          <h2 className="border-b-2 border-slate-200 font-semibold text-slate-900">
            En USD
          </h2>
          <h2 className="flex justify-center text-slate-600">
           {cuadre.cantUSD ? `${cuadre.cantUSD} x ${cuadre.precioUSD} = ${Number(cuadre.cantUSD * cuadre.precioUSD )} cup`: 0}  
          </h2>
          <h2 className="border-b-2 border-slate-200 font-semibold text-slate-900">
            En MLC
          </h2>
          <h2 className="flex justify-center text-slate-600">
           {cuadre.cantMLC ? `${cuadre.cantMLC} x ${cuadre.precioMLC} = ${Number(cuadre.cantMLC * cuadre.precioMLC )} cup`: 0}  
          </h2>
         
        </div>
      </div>

      <div className=" flex flex-col text-xs border-l-2 border-slate-200 font-semibold">
        {/* right*/}
        <div className="p-2  pl-4 text-slate-600">
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
           {cuadre.gastos ? `${cuadre.gastos} cup`: 0}  
          </h2>
        <div className="flex flex-1 bg-huellas_color rounded-br-xl rounded-tl-lg p-2  text-white justify-center font-bold text-base bottom-0">
          <h2> Total : {cuadre.grand_total}</h2>
        </div>
      </div>
    </section>
  );
}

export default CuadreCard;
