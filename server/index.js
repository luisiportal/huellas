import express from "express";
import { FRONTEND_URL, PUERTO } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import loginRouter from "./routes/login.routes.js";
import sequelize from "./db.js";
import movimientos from "./routes/movimientos.routes.js";
import moneda from "./routes/moneda.routes.js";
import { associations } from "./models/associations.js";
import ventas from "./routes/venta.routes.js";
import { monedasDefecto } from "./models/Monedas.model.js";

const app = express();
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
associations();
await sequelize.sync({ alter: true });

app.use(cookieParser());
app.use(express.json());
app.use(indexRoutes);
app.use(productoRoutes);
app.use(loginRouter);
app.use(movimientos);
app.use(moneda);
app.use(ventas);
app.listen(PUERTO, () => {
  console.log(`El server esta en el puerto : ${PUERTO}....`);
});
