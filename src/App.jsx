import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingLayout from "./layouts/LandingLayout";

import Login from "./pages/auth/Login";
import RecoverPassword from "./pages/auth/RecoverPassword";
import Register from "./pages/auth/Register";
import Contact from "./pages/landing/contact/contact";
import Home from "./pages/landing/home/home";
import EnergyEfficiency from "./pages/landing/solutions/energy-efficiency";
import EquipmentRental from "./pages/landing/solutions/equipment-rental";
import InfraredThermography from "./pages/landing/solutions/infrared-thermography";
import RenewableEnergy from "./pages/landing/solutions/renewable-energy";
import Training from "./pages/landing/solutions/training";
import Us from "./pages/us/us";
import Product from "./pages/landing/product/Product";

function App() {
  return (
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
          {/* product pages */}
          <Route path="product/:category" element={<Product />} />
        </Route>
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
  );
}

export default App;
