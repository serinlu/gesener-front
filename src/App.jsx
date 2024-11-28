import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingLayout from "./layouts/LandingLayout";
import CheckoutLayout from "./layouts/CheckoutLayout";

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
import NewsPage from "./pages/news/NewsPage";
import New from "./pages/news/New";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import MainMenu from "./components/dashboard-pages/MainMenu";
import UsersMenu from "./components/dashboard-pages/UsersMenu";
import ProductsMenu from "./components/dashboard-pages/ProductsMenu";
import BrandsMenu from "./components/dashboard-pages/BrandsMenu";
import CategoriesMenu from "./components/dashboard-pages/CategoriesMenu";
import ImagesMenu from "./components/dashboard-pages/ImagesMenu";
import OrdersMenu from "./components/dashboard-pages/OrdersMenu";
import SalesMenu from "./components/dashboard-pages/SalesMenu";
import SuccessCasesMenu from "./components/dashboard-pages/SuccessCasesMenu";
import NewsMenu from "./components/dashboard-pages/NewsMenu";
import ProductView from "./pages/landing/product/ProductView";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Payment from "./pages/payment/Payment";
import Profile from "./pages/profile/Profile";
import Orders from "./pages/profile/Orders";
import SuccessCases from "./pages/success-cases/SuccessCases";
import ViewSuccessCase from "./pages/success-cases/ViewSuccessCase";
import { PaymentProvider } from "./context/PaymentContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <PaymentProvider>
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
                  <Route path="products" element={<Product />} />
                  <Route path="products/:id" element={<ProductView />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path='news' element={<NewsPage />} />
                  <Route path='news/:id' element={<New />} />
                  <Route path='success-cases' element={<SuccessCases />} />
                  <Route path='success-cases/:id' element={<ViewSuccessCase />} />
                  {/* cart */}

                </Route>
                <Route element={<AuthLayout />}>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="recover-password" element={<RecoverPassword />} />
                </Route>
                <Route path="/dashboard" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <DashboardLayout />
                  </ProtectedRoute>}>
                  <Route index element={<MainMenu />} />
                  <Route path='users' element={<UsersMenu />} />
                  <Route path="products" element={<ProductsMenu />} />
                  <Route path="brands" element={<BrandsMenu />} />
                  <Route path="categories" element={<CategoriesMenu />} />
                  <Route path="images" element={<ImagesMenu />} />
                  <Route path="orders" element={<OrdersMenu />} />
                  <Route path="sales" element={<SalesMenu />} />
                  <Route path="success-cases" element={<SuccessCasesMenu />} />
                  <Route path="news" element={<NewsMenu />} />
                </Route>

                <Route path='/checkout' element={<CheckoutLayout />}>
                  <Route path="cart" element={<Cart />} />
                  <Route path="user-info" element={<Checkout />} />
                  <Route path='payment' element={<Payment />} />
                </Route>
              </Routes>
            </PaymentProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter >
    </HelmetProvider>
  );
}

export default App;
