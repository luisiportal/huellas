import React from 'react'
import EditSVG from '../SVG/EditSVG'

const EditBTN = ({onclick}) => {
  return (
    <button onClick={onclick}>
    <EditSVG size={"w-6 h-6"}/>
  </button>
  )
}

export default EditBTN
