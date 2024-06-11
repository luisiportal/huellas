import Input from "../Input";
import React from "react";

const Denominacion = ({
  values,
  handleChange,
  errors,
  totalDenominacion,
  name,
}) => {
  return (
    <div className="flex justify-center gap-2 items-center">
      <Input
        name={name}
        label={name}
        type="number"
        value={values[name]}
        handleChange={handleChange}
        errors={errors}
      />
      <h2>= {totalDenominacion[name]}</h2>
    </div>
  );
};

export default Denominacion;
