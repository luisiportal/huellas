import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const ComponenteModal = ({ modalActivo, setModalActivo }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    setModalActivo({ mensaje: "", activo: false });
    document.body.style.overflow = "auto";
    navigate(modalActivo.navegarA);
  };

  return (
    <>
      {modalActivo.activo && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <Modal mensaje={modalActivo.mensaje} errorColor={modalActivo.errorColor} />
        </div>
      )}
    </>
  );
};

export default ComponenteModal;
