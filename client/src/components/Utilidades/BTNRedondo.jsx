import React from 'react'
import { Link } from 'react-router-dom'

const BTNRedondo = ({ruta}) => {
  return (
    <Link to={ruta}>
    <button className="fixed  bottom-5 right-8 bg-huellas_color hover:bg-slate-700 text-white font-extrabold py-10 px-10 rounded-full h-8 w-8 text-4xl flex justify-center items-center">
      +
    </button>
  </Link>
  )
}

export default BTNRedondo