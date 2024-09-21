import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingLayout from "./layouts/LandingLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProductsLayout from "./layouts/ProductsLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/landing/home/home";
import Contact from "./pages/landing/contact/contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RecoverPassword from "./pages/auth/RecoverPassword";
import EnergyEfficiency from "./pages/landing/solutions/energy-efficiency";
import EquipmentRental from "./pages/landing/solutions/equipment-rental";
import InfraredThermography from "./pages/landing/solutions/infrared-thermography";
import RenewableEnergy from "./pages/landing/solutions/renewable-energy";
import Training from "./pages/landing/solutions/training";
import Us from "./pages/us/us";

import { CategoryProvider } from "./context/CategoryContext";  // Importa el Provider

function App() {
  return (
    <CategoryProvider> {/* Aquí envolvemos toda la app */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<Home />} />
            {/* Solutions Page */}
            <Route path="solutions/energy-efficiency" element={<EnergyEfficiency />} />
            <Route path="solutions/equipment-rental" element={<EquipmentRental />} />
            <Route path="solutions/infrared-thermography" element={<InfraredThermography />} />
            <Route path="solutions/equipment-rental" element={<EquipmentRental />} />
            <Route path="solutions/renewable-energy" element={<RenewableEnergy />} />
            <Route path="solutions/training" element={<Training />} />
            {/* other pages */}
            <Route path="contact" element={<Contact />} />
            <Route path="us" element={<Us />} />
          </Route>
          <Route path="/products" element={<ProductsLayout />} />
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="recover-password" element={<RecoverPassword />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="" />
          </Route>
        </Routes>
      </BrowserRouter>
    </CategoryProvider>
  );
}

export default App;
