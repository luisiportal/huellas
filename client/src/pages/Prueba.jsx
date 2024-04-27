import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

const Prueba = () => {
  return (
    <div className="bg-slate-100">
      <header className="bg-white shadow px-6">
        <div className="flex justify-between h-16 items-center max-w-3xl mx-auto">
          <button className="text-huellas_color border-black hover:bg-huellas_color hover:text-slate-100 rounded p-1 -m-1 transition-colors focus:ring-2 focus:ring-slate-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="flex -mr-4">
            <div>
              <a
                className="text-huellas_color hover:rotate-6 duration-200 m"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </a>
            </div>

            <div className="hidden md:flex space-x-8 ml-8">
              <a
                href="#"
                className=" block bg-huellas_color text-white px-3 py-2 rounded-md transition-colors"
              >
                Inicio
              </a>
              <a
                href="#"
                className=" block text-slate-700 hover:bg-huellas_color hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                Movimientos
              </a>
              <a
                href="#"
                className=" block text-slate-700 hover:bg-huellas_color hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                Cambio
              </a>
              <a
                href="#"
                className=" block text-slate-700 hover:bg-huellas_color hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                Perfil
              </a>
              <a
                href="#"
                className=" block text-slate-700 hover:bg-huellas_color hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                Agregar
              </a>
            </div>
          </div>

          <div className="flex">
            <button className="text-slate-500 hover:bg-huellas_color hover:text-black-300 p-1 rounded-full transition-colors focus:ring-2 focus:ring-slate-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            </button>
            <button className="text-slate-500 hover:bg-huellas_color hover:text-black-300 p-1 rounded-full transition-colors focus:ring-2 focus:ring-slate-200">
              <img
                className="h-6 w-6 rounded-full"
                src="https://ui-avatars.com/api?name=Luis+Ernesto"
                alt="perfil"
              />
            </button>
            <div></div>
          </div>
        </div>
        <div className="space-y-1 pb-3 border-t pt-2 md:hidden">
          <a
            href="#"
            className=" block bg-huellas_color text-white px-3 py-2 rounded-md transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className=" block text-slate-700 hover:bg-huellas_color hover:text-white px-3 py-2 rounded-md transition-colors"
          >
            aBOUT
          </a>
          <a
            href="#"
            className=" block text-slate-700 hover:bg-huellas_color hover:text-white px-3 py-2 rounded-md transition-colors"
          >
            CONTACTO
          </a>
        </div>
      </header>
      <main className="p-4">
        <article className="bg-white shadow rounded overflow-hidden">
          <div className="h-52">
            <img
              className="h-full w-full object-cover object-center"
              src="/images/tapete-entrenador-para-perros.webp"
              alt="Tapete"
            />
          </div>

          <div className="p-5 space-y-3">
            <h3 className="text-sm font-semibold text-sky-500">
              Ropa para Perros
            </h3>
            <h2 className="text-lg font-semibold text-slate-800 leading-tight">
              Tapetes de 56x56 cm.{" "}
            </h2>
            <p className="text-slate-500 text-justify">
              Están hechos de un material antifugas y su revestimiento de
              plástico ayuda al secado rápido. Es ideal para entrenar cachorros
              y a ayudar a los perros más viejitos gracias a su sustancia
              atrayente incorporada.
            </p>
          </div>
          <div className="flex p-5 space-x-2">
            <img
              className="h-10 w-10 rounded-full"
              src="https://ui-avatars.com/api?name=Luis+Ernesto"
              alt="autort"
            />
            <div className="flex flex-col justify-center">
              <span className="text-sm font-semibold text-slate-600 leading-4">
                Luis Ernesto
              </span>
              <span className="text-sm text-slate-500"> Mar 18, 2023</span>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default Prueba;
