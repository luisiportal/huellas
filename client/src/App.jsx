import { Route, Routes } from "react-router-dom";
import { ProductoContextProvider } from "./context/ProductoProvider";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Trabajador from "./components/Trabajadores/TrabajadorPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProductoForm from "./components/Productos/ProductosForm";
import Navbar from "./components/Navbar";
import AgregarTrabajador from "./components/Trabajadores/AgregarTrabajador";

import ListadoTrabajadores from "./pages/ListadoTrabajadores";
import Movimientos from "./pages/MovimientosPage";
import ProductosPage from "./pages/ProductosPage";
import NotFound from "./pages/NotFound";
import Prueba from "./pages/Prueba";
import AgregarMovimiento from "./components/Movimientos/AgregarMovimiento";
import TipoCambioPage from "./pages/TipoCambioPage";
import TipoCambioForm from "./components/TipoCambio/TipoCambioForm";

import { CarritosProvaider } from "./context/CarritosContext";
import VentasRoutes from "./routes/VentasRoutes";

import LogsPage from "./components/LogsSystem/LogsPage";
import HomePage from "./components/HOME/HomePage";
import CuadrePage from "./components/CuadreCaja/CuadrePage";
import Edit from "./components/Movimientos/Edit";

const App = () => {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <ProductoContextProvider>
        <AuthProvider>
          <Navbar />
          <div className="container mx-auto">
            <Routes>
              <Route path="/trabajador/login" element={<Trabajador />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/logs/" element={<LogsPage />} />
                <Route path="/new" element={<ProductoForm />} />
                <Route path="/trabajador/new" element={<AgregarTrabajador />} />
                <Route
                  path="/trabajador/profile/edit/:id"
                  element={<AgregarTrabajador />}
                />

                <Route
                  path="/trabajador/plantilla"
                  element={<ListadoTrabajadores />}
                />
                <Route path="/movimientos" element={<Movimientos />} />
                <Route
                  path="/movimientos/edit/:id_movimiento"
                  element={<Edit />}
                />
                <Route path="/cuadrar" element={<CuadrePage />} />

                <Route
                  path="/productos/edit/:id_producto"
                  element={<ProductoForm />}
                />
                <Route path="/productos" element={<ProductosPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="prueba" element={<Prueba />} />

                <Route
                  path="/movimientos/entrada"
                  element={
                    <AgregarMovimiento tipo={"Entrada"} key={"entrada"} />
                  }
                />
                <Route
                  path="/movimientos/salida"
                  element={<AgregarMovimiento tipo={"Salida"} key={"salida"} />}
                />
                  <Route
                  path="/movimientos/edit/:id_movimiento"
                  element={<Edit />}
                />
                <Route path="cambio" element={<TipoCambioPage />} />
                <Route path="cambio/new" element={<TipoCambioPage />} />
                <Route path="cambio/edit/:id" element={<TipoCambioForm />} />

                <Route
                  path="/"
                  element={
                    <CarritosProvaider>
                      <HomePage />
                    </CarritosProvaider>
                  }
                />
                <Route path="/transacciones/*" element={<VentasRoutes />} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </ProductoContextProvider>
    </div>
  );
};

export default App;
