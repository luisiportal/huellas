import React from 'react'

const ImagenCard = ({categoria}) => {
  return (
    <img className="object-center w-20 h-20 rounded-lg"
          src={`${import.meta.env.VITE_BACKEND_URL}images/categorias/${
            categoria.ruta_image
          }`}
          alt={"Imagen de " + categoria.nombre}
        />
  )
}

export default ImagenCard
