import { AuditLog } from "../models/AuditLog.model.js";

import { TOKEN_SECRET } from "../libs/jwt.js";
import Jwt from "jsonwebtoken";
import { Trabajador } from "../models/Trabajador.model.js";
import { Op } from "sequelize";
import sequelize from "../db.js";
import { Producto } from "../models/Producto.model.js";

export const registrarLog = async (
  accionRealizada,
  recurso,
  detalles,
  req,
  t,
  id_recurso
) => {
  const userName = async () => {
    const { token } = req.cookies;
    if (token) {
      return new Promise((resolve, reject) => {
        Jwt.verify(token, TOKEN_SECRET, (err, user) => {
          if (err) {
            reject(new Error("Invalid token"));
          } else {
            req.user = user;
            resolve(req.user);
          }
        });
      });
    }
  };

  // Ahora puedes usar 'await' para esperar a que se resuelva la promesa
  const user = await userName();

  await AuditLog.create(
    {
      id_usuario: user ? user.id : id_recurso,
      accionRealizada: accionRealizada,
      recurso: recurso,
      id_recurso: id_recurso,
      detalles: detalles,
    },
    { transaction: t }
  );
};

export const getTodosLogs = async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const response = await AuditLog.findAll({
      where: {
        id_usuario: {
          [Op.eq]: sequelize.col("auditlog.id_usuario"), // Esto devuelve un booleano
        },
      },
      include: [
        {
          model: Trabajador,
          attributes: ["nombre"],
          required: true,
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: limit,
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
