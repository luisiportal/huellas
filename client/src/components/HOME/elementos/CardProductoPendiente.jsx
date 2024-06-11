import React from "react";

const CardProductoPendiente = ({
  recursos,
  atributo,
  atributo2,
  titulo,
  auxiliar,
}) => {
  return (
    <div className="shadow-md rounded-md">
      <div className="my-4">
       
        <h2 className="text-slate-900 font-bold mb-0 text-xl">{titulo}</h2>
    
      </div>
      {recursos.map((item, index) => (
        <h2
          className="bg-white border-b-2 text-slate-700 font-semibold  border-l-2 border-x-huellas_color p-5 pb-10"
          key={index}
        >
          {auxiliar}
          {item[atributo]} {item[atributo2]}
        </h2>
      ))}
    </div>
  );
};

export default CardProductoPendiente;
