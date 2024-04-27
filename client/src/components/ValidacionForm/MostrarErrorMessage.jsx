import React from "react";

const MostrarErrorMessage = ({ errors, campo }) => {
  return (
    <div>
      {errors[campo] && (
        <span className="bg-red-500 p-1 m-1 rounded">{errors[campo]}</span>
      )}
    </div>
  );
};
export default MostrarErrorMessage;

