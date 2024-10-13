import express from "express";
import { FRONTEND_URL, FRONTEND_URL2, PUERTO } from "./config.js";
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
import audiTlogs from "./routes/audilogs.routes.js";
import cuadre_caja from "./routes/cuadre_caja.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(
  cors({
    origin: [FRONTEND_URL, FRONTEND_URL2],
    credentials: true,
  })
);
associations();
await sequelize.sync({ alter: true });
sequelize.query(
  'ALTER TABLE public.movimientos ALTER COLUMN "createdAt" SET DEFAULT now();'
);
sequelize.query(
  'ALTER TABLE public.movimientos ALTER COLUMN "updatedAt" SET DEFAULT now();'
);

app.use("/images", express.static(path.join(__dirname, "/public/images")));
app.use(cookieParser());
app.use(express.json());
app.use(indexRoutes);
app.use(productoRoutes);
app.use(loginRouter);
app.use(movimientos);
app.use(moneda);
app.use(ventas);
app.use(audiTlogs);
app.use(cuadre_caja);
app.listen(PUERTO, () => {
  console.log(`El server esta en el puerto : ${PUERTO}....`);
});
