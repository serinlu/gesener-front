import React, { useContext, useEffect, useState } from 'react';
import { FaAward, FaBox, FaDollarSign, FaHandshake, FaHome, FaList, FaNewspaper, FaTag, FaUser } from 'react-icons/fa';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'; // Importar useLocation
import logo from "../uploads/logo.png";
import { AuthContext } from '../context/AuthContext';

const DashboardLayout = () => {
  const location = useLocation(); // Obtener la ubicación actual
  const [selectedOption, setSelectedOption] = useState('');
  const {auth} = useContext(AuthContext);
  const navigate = useNavigate(); // Para la navegación

  const menuItems = [
    { name: 'Menú principal', icon: <FaHome />, path: '/dashboard' },
    { name: 'Usuarios', icon: <FaUser />, path: '/dashboard/users' },
    { name: 'Productos', icon: <FaTag />, path: '/dashboard/products' },
    { name: 'Categorías', icon: <FaAward />, path: '/dashboard/categories' },
    { name: 'Marcas', icon: <FaList />, path: '/dashboard/brands' },
    { name: 'Pedidos', icon: <FaBox />, path: '/dashboard/orders' },
    { name: 'Ventas', icon: <FaDollarSign />, path: '/dashboard/sales' },
    { name: 'Casos de éxito', icon: <FaHandshake />, path: '/dashboard/success-cases' },
    { name: 'Noticias', icon: <FaNewspaper />, path: '/dashboard/news' },
  ];

  // Efecto para establecer la opción seleccionada según la ruta actual
  useEffect(() => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setSelectedOption(currentItem.name);
    }

    if (!auth) {
      navigate('/login');
    }
  }, [auth, location.pathname]); // Ejecutar cuando la ruta cambie

  const handleMenuClick = (name, path) => {
    setSelectedOption(name); // Actualizar la opción seleccionada
    navigate(path); // Navegar a la ruta correspondiente
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white text-black w-64 flex flex-col justify-between">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className="w-[70%] mx-auto mt-10 mb-10" />
          </Link>
          <nav className="mt-10">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className={`flex items-center p-4 cursor-pointer transition-colors hover:text-blue-700 ${selectedOption === item.name ? 'text-blue-700 border-blue-700 border-r-3' : ''}`}
                onClick={() => handleMenuClick(item.name, item.path)} // Llamar a handleMenuClick
              >
                <span className="mr-4">{item.icon}</span>
                {item.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">{selectedOption}</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
