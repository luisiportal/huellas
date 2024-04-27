import { Route, Routes } from "react-router-dom";
import { ProductoContextProvider } from "./context/ProductoProvider";
import { AuthProvider } from "./context/AuthContext";
import Trabajador from "./components/Trabajadores/TrabajadorPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProductoForm from "./components/Productos/ProductosForm";
import Navbar from "./components/Navbar";
import AgregarTrabajador from "./components/Trabajadores/AgregarTrabajador";
import NuevaVenta from "./components/Ventas/NuevaVenta";
import ListadoTrabajadores from "./pages/ListadoTrabajadores";
import Movimientos from "./pages/MovimientosPage";
import ProductosPage from "./pages/ProductosPage";
import NotFound from "./pages/NotFound";
import Prueba from "./pages/Prueba";
import AgregarMovimiento from "./components/Movimientos/AgregarMovimiento";
import TipoCambioPage from "./pages/TipoCambioPage";
import TipoCambioForm from "./components/TipoCambio/TipoCambioForm";



const App = () => {
  return (
    <div className="bg-white min-h-screen">
      <div>
        <ProductoContextProvider>
          <AuthProvider>
           <Navbar/>
            <div className="container mx-auto">
              <Routes>
                <Route
                  path="/trabajador/login"
                  element={<Trabajador/>}
                />

                <Route element={<ProtectedRoutes/>}>
                  <Route path="/new" element={<ProductoForm/>} />
                  <Route
                    path="/trabajador/new"
                    element={<AgregarTrabajador/>}
                  />
                  <Route
                    path="/trabajador/profile/edit/:id"
                    element={<AgregarTrabajador />}
                  />
                  <Route
                    path="/venta/new"
                    element={<NuevaVenta/>}
                  />
                  <Route
                    path="/trabajador/plantilla"
                    element={<ListadoTrabajadores/>}
                  />
                  <Route path="movimientos" element={<Movimientos/>} />
                  <Route path="/" element={<ProductosPage/>} />

                  <Route
                    path="/edit/:id_producto"
                    element={<ProductoForm/>}
                  />
                  <Route path="*" element={<NotFound/>} />
                  <Route path="prueba" element={<Prueba/>} />

                  <Route
                    path="movimientos/entrada"
                    element={
                     <AgregarMovimiento tipo={"Entrada"} key={"entrada"} />
                    }
                  />
                  <Route
                    path="movimientos/salida"
                    element={
                      <AgregarMovimiento tipo={"Salida"} key={"salida"} />
                    }
                  />
                  <Route path="cambio" element={<TipoCambioPage/>} />
                  <Route
                    path="cambio/new"
                    element={<TipoCambioPage/>}
                  />
                  <Route
                    path="cambio/edit/:id"
                    element={<TipoCambioForm/>}
                  />
                </Route>
              </Routes>
            </div>
          </AuthProvider>
        </ProductoContextProvider>
      </div>
    </div>
  );
};

export default App;
