import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../uploads/logo.png'; // Ajusta la ruta según tu proyecto
import { Link } from 'react-router-dom';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [hovering, setHovering] = useState(null);
  const [popOverLeft, setPopOverLeft] = useState(null);

  const onMouseEnter = (index, el) => {
    setHovering(index);
    setPopOverLeft(el.offsetLeft);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const Soluciones = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Soluciones</h3>
      <ul className="space-y-2">
        <li className="hover:text-indigo-600 cursor-pointer">Opción 1</li>
        <li className="hover:text-indigo-600 cursor-pointer">Opción 2</li>
        <li className="hover:text-indigo-600 cursor-pointer">Opción 3</li>
      </ul>
    </div>
  );

  const Productos = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Productos</h3>
      <ul className="space-y-2">
        <li className="hover:text-indigo-600 cursor-pointer">Opción 1</li>
        <li className="hover:text-indigo-600 cursor-pointer">Opción 2</li>
        <li className="hover:text-indigo-600 cursor-pointer">Opción 3</li>
      </ul>
    </div>
  );

  const Acceder = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Acceder</h3>
      <ul className="space-y-2">
        <li className="hover:text-indigo-600 cursor-pointer">Opción 1</li>
        <li className="hover:text-indigo-600 cursor-pointer">Opción 2</li>
        <li className="hover:text-indigo-600 cursor-pointer">Opción 3</li>
      </ul>
    </div>
  );

  const SlideWrapper = ({ index, hovering, children }) => {
    return (
      <div
        className={`absolute w-full transition-all duration-300 ${
          hovering === index ? 'opacity-100' : 'opacity-0',
          hovering === index ? 'transform-none' : hovering
        }`}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="relative">
      <header className="bg-gray-100 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">

          {/* Logo */}
          <div className="flex justify-start items-center flex-shrink-0 -ml-6">
            <Link to="/">
              <img src={logo} alt="Gesener Logo" className="h-12" />
            </Link>
          </div>

          {/* Navegación */}
          <nav
            onMouseLeave={() => setHovering(null)}
            className="flex-grow flex justify-center items-center space-x-4"
          >
            <a
              onMouseEnter={(event) => onMouseEnter(0, event.currentTarget)}
              href="#"
              className="text-black transition-colors duration-300 text-center text-base font-medium leading-6 tracking-wide px-4 py-2 hover:text-indigo-600"
            >
              SOLUCIONES
            </a>
            <a
              onMouseEnter={(event) => onMouseEnter(1, event.currentTarget)}
              href="#"
              className="text-black transition-colors duration-300 text-center text-base font-medium leading-6 tracking-wide px-4 py-2 hover:text-indigo-600"
            >
              PRODUCTOS
            </a>
            <a
              onMouseEnter={() => setHovering(null)} // No tiene popover
              href="#"
              className="text-black transition-colors duration-300 text-center text-base font-medium leading-6 tracking-wide px-4 py-2 hover:text-indigo-600"
            >
              CASOS DE ÉXITO
            </a>
            <a
              onMouseEnter={() => setHovering(null)}
              href="#"
              className="text-black transition-colors duration-300 text-center text-base font-medium leading-6 tracking-wide px-4 py-2 hover:text-indigo-600"
            >
              NOTICIAS
            </a>
            <a
              onMouseEnter={() => setHovering(null)}
              href="#"
              className="text-black transition-colors duration-300 text-center text-base font-medium leading-6 tracking-wide px-4 py-2 hover:text-indigo-600"
            >
              NOSOTROS
            </a>
            <a
              onMouseEnter={() => setHovering(null)}
              href="#"
              className="text-black transition-colors duration-300 text-center text-base font-medium leading-6 tracking-wide px-4 py-2 hover:text-indigo-600"
            >
              CONTÁCTANOS
            </a>
          </nav>

          {/* Acceder y Carrito */}
          <div className="flex items-center space-x-2 ml-4">
            <a
              onMouseEnter={(event) => onMouseEnter(2, event.currentTarget)}
              href="#"
              className="text-black transition-colors duration-300 hover:text-indigo-600 flex items-center"
            >
              <FontAwesomeIcon icon={faUser} className="mr-4" />
            </a>
            <a
              onMouseEnter={() => setHovering(null)}
              href="#"
              className="text-black transition-colors duration-300 hover:text-indigo-600 flex items-center"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-4" />
            </a>
            <button
              onClick={toggleSearch}
              className="text-black transition-colors duration-300 hover:text-indigo-600"
              aria-label="Buscar"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </header>

      {/* Input de Buscador */}
      {showSearch && (
        <div className="bg-gray-200 py-4">
          <div className="container mx-auto">
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded"
              placeholder="Buscar..."
            />
          </div>
        </div>
      )}

      {/* Popover al hacer hover */}
      {hovering !== null && (
        <div
          style={{ left: popOverLeft || 0 }}
          className={`absolute top-12 left-0 pt-6 w-[600px] bg-white overflow-hidden rounded shadow-lg transition-all duration-300 ${hovering !== null ? 'opacity-100 scale-100' : 'opacity-0'}`}
        >
          {hovering === 0 && <Soluciones />}
          {hovering === 1 && <Productos />}
          {hovering === 2 && <Acceder />}
        </div>
      )}
    </div>
  );
};

export default Header;
