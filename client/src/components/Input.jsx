import React from "react";
import MostrarErrorMessage from "./ValidacionForm/MostrarErrorMessage";


const Input = ({ type, name, value, handleChange, errors, label }) => {
  return (
    <div className="flex justify-center">
      <label htmlFor={name} className="flex items-center m-2 w-12">
        {label}:
      </label>
      <input
        type={type}
        name={name}
        className="my-2 px-2 py-1 rounded-sm w-32"
        onChange={handleChange}
        value={value}
        min={new Date().toISOString().split("T")[0]}
      />
      <MostrarErrorMessage errors={errors} campo={name} />
    </div>
  );
};

export default Input;
