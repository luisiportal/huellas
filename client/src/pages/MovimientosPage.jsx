
import BotoneraEntrada_Salida from "../components/BotoneraEntrada_Salida";
import MovimientoCard from "../components/Movimientos/MovimientoCard";


const Movimientos = () => {
  return (
    <div>
      <h1 className="px-2 pb-2 text-3xl text-huellas_color font-bold ">
        Movimientos
      </h1>
      <div className="pb-2 flex justify-end sm:justify-center mr-2 mt-8">
        <BotoneraEntrada_Salida/>
      </div>
      <div>
        <MovimientoCard recargar={true}></MovimientoCard>
      </div>
    </div>
  );
};

export default Movimientos;
