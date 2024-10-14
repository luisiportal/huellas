import React from "react";
import DeleteSVG from "../SVG/DeleteSVG";


const DeleteBTN = ({ onclick }) => {
  
  return (
    <button onClick={onclick}>
      <DeleteSVG />
    </button>
  );
};

export default DeleteBTN;
