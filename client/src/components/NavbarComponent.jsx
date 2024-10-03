import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { useAuth } from "../context/AuthContext";

import ActivarDesactModo from "./ModoOffline/ActivarDesactModo";
import Loader from "./Utilidades/Loader";

const NavbarComponent = () => {
  const [abrirHamburguesa, setabrirHamburguesa] = useState(false);
  const { isAuthenticated, logout, user, perfil, isOnline, setIsOnline,loader } =
    useAuth();

  const sidebarRef = useRef(null);
  const openButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Si el evento no ocurrió dentro de sidebarRef o dentro de openButtonRef
        if (
          !openButtonRef.current ||
          !openButtonRef.current.contains(event.target)
        ) {
          setabrirHamburguesa(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hamburguerClick = () => {
    setabrirHamburguesa(!abrirHamburguesa);
  };
  return (
    <div className="bg-slate-100">
      {/*barra escritorio*/}
      <header className="fixed w-full bg-huellas_color px-6 z-50 rounded shadow-xl">
        <div className="flex justify-between h-16 items-center max-w-7xl mx-auto">
          <div className="flex -mr-4">
            {/*Logo huellas  */}
            <div>
              <Link
                className="text-huellas_color hover:rotate-6 duration-200"
                to={"/"}
              >
                <img
                  className="w-52 h-12"
                  src={"../images/huellas_logo.png"}
                  alt="Logo Huellas"
                />
              </Link>
            </div>

            <div>
              <Navbar hidden={"hidden space-x-8"}></Navbar>
            </div>
          </div>

          <div className="flex ">
            <div className="hidden lg:flex">
              {/*imagen de perfil*/}
              <Link to={"trabajador/login"}>
                <button className="text-slate-500 hover:bg-white hover:text-black-300 p-1 rounded-full transition-colors focus:ring-2 focus:ring-slate-200">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={"../images/trabajadores/perfil/" + perfil.foto_perfil}
                    alt="perfil"
                  />
                </button>
              </Link>
              <button
                onClick={logout}
                className="text-slate-500 p-1 rounded-full transition-colors focus:ring-2 rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              </button>{" "}
            </div>

            {/* Boton hamburguesa*/}
            <div ref={openButtonRef}>
              {" "}
              <button
                onClick={hamburguerClick}
                className="mt-1 text-white border-black hover:bg-huellas_color hover:text-slate-100 rounded p-1 -m-1 transition-colors focus:ring-2 focus:ring-slate-200 lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/*menu hamburguesa movil y luego menu lateral */}
        <div ref={sidebarRef} className="lg:hidden">
          <div
            className={`fixed lg:hidden ${
              abrirHamburguesa ? `left-0` : `-left-80`
            }  h-full w-48 bg-white shadow-2xl transition-all duration-500 ease-in-out z-50`}
          >
            <Navbar hidden={""}> </Navbar>

            <div className="flex justify-center gap-2">
              {/*imagen de perfil movil*/}
              <Link to={"trabajador/login"}>
                <button className="text-slate-500 hover:bg-huellas_color hover:text-black-300 p-1 rounded-full transition-colors focus:ring-2 focus:ring-slate-200">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={"../images/trabajadores/perfil/" + perfil.foto_perfil}
                    alt="perfil"
                  />
                </button>
              </Link>
              <button
                onClick={logout}
                className="text-slate-700 hover:text-huellas_color p-1 rounded-full transition-colors focus:ring-2 rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              </button>{" "}
            </div>
          </div>
        </div>
      </header>
      <ActivarDesactModo setIsOnline={setIsOnline} isOnline={isOnline} />
      {loader && <Loader />}
    </div>
  );
};

export default NavbarComponent;
