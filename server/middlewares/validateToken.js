import Jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../libs/jwt.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ mesagge: "No tiene permitido el acceso" });

  Jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ mesagge: "token invalido" });
    req.user = user;
    next();
   
  });
};
