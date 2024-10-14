import React from "react";
import MostrarErrorMessage from "./ValidacionForm/MostrarErrorMessage";

const Input = ({
  type,
  name,
  value,
  handleChange,
  errors,
  label,
  placeholder,
  step,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <label htmlFor={name} className="flex items-center w-12">
          {label}:
        </label>
        <input
          placeholder={placeholder}
          type={type}
          step={step}
          name={name}
          className="my-2 px-2 py-1 rounded-lg w-full"
          onChange={handleChange}
          value={value}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <MostrarErrorMessage errors={errors} campo={name} />
    </div>
  );
};

export default Input;
