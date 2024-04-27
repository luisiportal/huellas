import React from 'react'

const Btn_Huellas = ({text,type,isSubmitting,onclick}) => {
  return (
    <>
     <button
                      type={type}
                      onClick={onclick}
                      disabled={isSubmitting}
                      className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
                    >
                      {isSubmitting ? "Guardando..." :`${text}`}
                    </button>
    </>
  )
}

export default Btn_Huellas
