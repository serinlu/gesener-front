import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import Home from "./pages/landing/home/home";
import Contact from "./pages/landing/contact/contact";
import Login from "./pages/auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/auth/Register";
import RecuperarPassword from "./pages/auth/RecuperarPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas del LandingLayout */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Rutas de autenticación sin "auth" */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="recover-password" element={<RecuperarPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
