import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();

export const uploadProducto = multer({ dest: `public/images/productos/` });
export const uploadTrabajador = multer({
  dest: `public/images/trabajadores/perfil/`,
});
export const uploadCategoria = multer({ dest: `public/images/categorias/` });

export function saveImage(file, tipoFoto) {
  if (file === undefined) {
    return;
  }
  try {
    const newPath = `public/images/${tipoFoto}/${file.originalname}`;

    fs.renameSync(file.path, newPath);

    return newPath;
  } catch (error) {
    console.log(error);
  }
}
