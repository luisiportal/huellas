import React from 'react'

const Btn_Huellas = ({text,type,disabled,onclick,disbledText}) => {
  return (
    <>
     <button
                      type={type}
                      onClick={onclick}
                      disabled={disabled}
                      className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
                    >
                      {disabled ? `${disbledText}` :`${text}`}
                    </button>
    </>
  )
}

export default Btn_Huellas
