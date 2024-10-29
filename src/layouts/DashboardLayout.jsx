import React, { useContext, useEffect, useState } from 'react';
import { FaAward, FaBox, FaDollarSign, FaHandshake, FaHome, FaList, FaNewspaper, FaTag, FaUser, FaUserCircle, FaEllipsisV } from 'react-icons/fa';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import logo from "../uploads/logo.png";
import { AuthContext } from '../context/AuthContext';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { FaImage } from 'react-icons/fa6';

const DashboardLayout = () => {
  const location = useLocation(); // Obtener la ubicación actual
  const [selectedOption, setSelectedOption] = useState('');
  const { auth, logout } = useContext(AuthContext); // Obtener el estado de autenticación del contexto
  const navigate = useNavigate(); // Para la navegación
  const [authForm, setAuthForm] = useState({
    name: '',
    lastname: '',
    role: ''
  });
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  const menuItems = [
    { name: 'Menú principal', icon: <FaHome />, path: '/dashboard' },
    { name: 'Usuarios', icon: <FaUser />, path: '/dashboard/users' },
    { name: 'Productos', icon: <FaTag />, path: '/dashboard/products' },
    { name: 'Categorías', icon: <FaAward />, path: '/dashboard/categories' },
    { name: 'Imágenes', icon: <FaImage />, path: '/dashboard/images' },
    { name: 'Marcas', icon: <FaList />, path: '/dashboard/brands' },
    { name: 'Pedidos', icon: <FaBox />, path: '/dashboard/orders' },
    { name: 'Ventas', icon: <FaDollarSign />, path: '/dashboard/sales' },
    { name: 'Casos de éxito', icon: <FaHandshake />, path: '/dashboard/success-cases' },
    { name: 'Noticias', icon: <FaNewspaper />, path: '/dashboard/news' },
  ];

  // Efecto para establecer la opción seleccionada según la ruta actual
  useEffect(() => {
    if (!auth) {
      setLoading(true); // Si no hay auth, mostrar pantalla de carga
      return;
    }

    // Si hay auth, proceder a configurar la información
    authHandler();
    const currentItem = menuItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setSelectedOption(currentItem.name);
    }

    if (!auth) {
      navigate('/login');
    } else {
      setLoading(false); // Dejar de mostrar la pantalla de carga cuando auth esté disponible
    }
  }, [auth, location.pathname]); // Ejecutar cuando la ruta cambie o el estado auth cambie

  const handleMenuClick = (name, path) => {
    setSelectedOption(name); // Actualizar la opción seleccionada
    navigate(path); // Navegar a la ruta correspondiente
  };

  const authHandler = () => {
    if (auth) {
      setAuthForm({
        name: auth.name || '',
        lastname: auth.lastname || '',
        role: auth.role || ''
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Navegar a la página de login
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white text-black w-64 flex flex-col justify-between h-full sticky top-0">
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

        {/* User section at the bottom */}
        <div className='mt-auto p-4'>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaUserCircle className='text-4xl' />
              <div>
                <h1>{authForm.name} {authForm.lastname}</h1>
                <h1 className='text-red-500 uppercase'>{auth.role}</h1>
              </div>
            </div>
            <div className='text-md'>
              <Dropdown>
                <DropdownTrigger>
                  <Button>
                    <FaEllipsisV />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu className='z-10 shadow-md rounded-lg bg-white p-2'>
                  <DropdownItem className='text-sm p-2'>Ir a Mi Perfil</DropdownItem>
                  <DropdownItem className='text-sm text-red-500 font-bold p-2' onClick={handleLogout}>Cerrar sesión</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-10 bg-gray-100 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">{selectedOption}</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
