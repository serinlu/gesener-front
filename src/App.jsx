import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import Home from "./pages/landing/home/home";
import Contact from "./pages/landing/contact/contact";
import Login from "./pages/auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/auth/Register";
import RecoverPassword from "./pages/auth/RecoverPassword";
import DashboardLayout from "./layouts/DashboardLayout";
import EnergyEfficiency from "./pages/landing/solutions/energy-efficiency";
import EquipmentRental from "./pages/landing/solutions/equipment-rental";
import InfraredThermography from "./pages/landing/solutions/infrared-thermography";
import RenewableEnergy from "./pages/landing/solutions/renewable-energy";
import Training from "./pages/landing/solutions/training";

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
          {/* Solutions Page */}
          <Route path="contact" element={<Contact />} />
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
