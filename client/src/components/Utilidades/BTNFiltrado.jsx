import React from "react";
import ArrowUpSVG from "../SVG/ArrowUpSVG";
import DownArrowSVG from "../SVG/DownArrowSVG";

const BTNFiltrado = ({
  handleOrdenar,
  campo,
  estado,
  activeBTN,
  setActiveBTN,
}) => {
  return (
    <button
      onClick={() => {
        handleOrdenar();
        setActiveBTN(campo);
      }}
      className=" bg-white border-huellas_color border-l-8  rounded-md p-1 font-semibold text-sm uppercase gap-1 shadow-md w-fit m-1 flex justify-center"
    >
      {activeBTN && (estado === "ASC" ? <ArrowUpSVG /> : <DownArrowSVG />)}
      {`${campo} ${activeBTN ? estado : ""}`}
    </button>
  );
};

export default BTNFiltrado;
