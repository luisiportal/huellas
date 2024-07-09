import React from 'react'
import { Link } from 'react-router-dom'

const BTNHOME = ({texto,enlace,handleClick}) => {
 
  return (
    <Link className="flex justify-center" to={enlace}>
    <button onClick={handleClick} className=" bg-white border-huellas_color border-l-8  rounded-md p-3 font-bold text-sm uppercase gap-1 shadow-md w-fit m-4 flex justify-center">
  {texto}
    </button>
  </Link>
  )
}

export default BTNHOME