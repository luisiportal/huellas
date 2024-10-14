import { Categoria } from "../models/Categoria.model.js";
import { registrarLog } from "./AuditLog.controllers.js";
import { saveImage } from "./upload.multer.js";
import sequelize from "../db.js";

export const crearCategoria = async (req, res) => {
  let ruta_image = "default.jpg";
  if (req.file !== undefined) {
    ruta_image = req.file.originalname;
  }
  try {
    const { nombre, mascota } = req.body;

    const response = await Categoria.create({
      nombre,
      ruta_image,
      mascota,
    });

    if (response) {
      //await registrarLog("Creó la", ` Categoría`, `  ${nombre}`, req, "t");
    }
    saveImage(req.file, "categorias");
    res.json({
      nombre,
      mascota,
      ruta_image,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllCategorias = async (req, res) => {
  try {
    const response = await Categoria.findAll({
      order: [["id", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSingleCategoria = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await Categoria.findByPk(id);
    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCategoria = async (req, res) => {
  let ruta_image = "";
  if (req.file !== undefined) {
    ruta_image = req.file.originalname;
  }
  const id = req.params.id;

  const { nombre, mascota } = req.body;
  sequelize.transaction(async (t) => {
    try {
      const response = await Categoria.findByPk(id);
      response.nombre = nombre;
      response.mascota = mascota;
      ruta_image && (response.ruta_image = ruta_image);

      await response.save({ transaction: t }); // Pasamos la transacción como opción al método save
    saveImage(req.file, "categorias");

      res.json(response);
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar el error, por ejemplo, enviando una respuesta con un código de estado 500
    }
  });
};

export const deleteCategoria = async (req, res) => {
  try {
    const response = await Categoria.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
