import bcrypt from "bcryptjs";
import { TOKEN_SECRET, createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { saveImage } from "./upload.multer.js";
import { Trabajador } from "../models/Trabajador.model.js";
import { DOMAIN, HTTPONLY, SAMESITE, SECURE } from "../config.js";
import { registrarLog } from "./AuditLog.controllers.js";
export const register = async (req, res) => {
  let foto_perfil = "perfil_default.jpg ";
  if (req.file !== undefined) {
    foto_perfil = req.file.originalname;
  }
  const {
    username,
    password,
    nombre,
    apellidos,
    movil,
    puesto,
    direccion,
    salario,
  } = req.body;
  try {
    const buscarSiExiste = await Trabajador.findOne({
      where: { username: username },
    });

    if (buscarSiExiste) {
      return res.status(400).json({ message: "Ya existe este usuario" });
    }

    const passwordHash =
      password != null ? await bcrypt.hash(password, 10) : "";
    const result = await Trabajador.create({
      username,
      password: passwordHash,
      nombre,
      apellidos,
      movil,
      puesto,
      direccion,
      salario,
      foto_perfil,
    });

    saveImage(req.file, "trabajadores/perfil");

    res.json({
      username,
      nombre,
      apellidos,
      movil,
      puesto,
      direccion,
      salario,
      foto_perfil,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//login

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // buscar si existe el ususario

    const respuestaUserExist = await Trabajador.findOne({
      where: { username: username },
    });

    const userFound = respuestaUserExist || "";

    if (userFound.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Credencial inválida" });
    }

    const token = await createAccessToken({ id: userFound.id_trabajador });
    

    res.cookie("token", token, {
      domain: DOMAIN, // Establece el dominio de la cookie
      secure: SECURE, // La cookie sólo se envía a través de HTTPS
      httpOnly: HTTPONLY,
      sameSite: SAMESITE,
    });




    await registrarLog(
      "Inicio",
      "Sesión",
      ``,
      req,
      "",
      userFound.id_trabajador
    );
    res.json({
      id_trabajador: userFound.id_trabajador,
      username: userFound.username,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });

  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const id_trabajador = req.params.id;

    const response = await Trabajador.findByPk(id_trabajador);
    if (!response)
      return res.status(404).json({ message: "No encontrado el trabajador" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//editar trabajador perfil
export const updatePerfilTrabajador = async (req, res) => {
  try {
    const id_trabajador = req.params.id;
    saveImage(req.file, "trabajadores/perfil");

    const {
      username,
      password,
      nombre,
      apellidos,
      ci,
      telefono,
      puesto,
      direccion,
      salario,
      foto_perfil,
    } = req.body;

    const trabajador = await Trabajador.findByPk(id_trabajador);

    if (trabajador) {
      if (password) {
        // Si se proporciona una nueva contraseña, hashea antes de guardar
        const passwordHash = await bcrypt.hash(password, 10);
        trabajador.password = passwordHash;
      }
      trabajador.nombre = nombre;
      trabajador.apellidos = apellidos;
      trabajador.ci = ci;
      trabajador.telefono = telefono;
      trabajador.puesto = puesto;
      trabajador.direccion = direccion;
      trabajador.salario = salario;
      trabajador.foto_perfil = foto_perfil;

      await trabajador.save();
    }
    res.json(trabajador);

    if (req.file !== undefined) {
      await Trabajador.findByPk(req.params.id);
      trabajador.foto_perfil = req.file.originalname;
      await trabajador.save();
    }

    res.json(trabajador);
  } catch (error) {}
};

// borrar trabajador
export const deleteTrabajador = async (req, res) => {
  try {
    const response = await Trabajador.destroy({
      where: {
        id_trabajador: req.params.id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//listar plantilla trabajadores

export const plantillaTrabajadores = async (req, res) => {
  try {
    const response = await Trabajador.findAll({
      order: [["id_trabajador", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// verifivar token

export const verifyToken = (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json("No autorizado");

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json("No autorizado");

    const respuestaUserExist = await Trabajador.findByPk(user.id);

    const userFound = respuestaUserExist;
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id_trabajador: userFound.id_trabajador,
      username: userFound.username,
    });
  });
};
