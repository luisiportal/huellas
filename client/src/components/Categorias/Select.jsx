import React from 'react'

const Select = ({handleChange,value}) => {
  return (
    <div className="flex items-center gap-2"> <label>Mascota:</label>
    <select
      name="mascota"
      onChange={handleChange}
      value={value || ""}
      className="block my-2 rounded-sm"
    >
      <option value="Sin mascota">Sin mascota</option>
      <option value="Perro">Perro</option>
      <option value="Gato">Gato</option>
      <option value="Ambos">Ambos</option>
      
    </select></div>
  )
}

export default Select
