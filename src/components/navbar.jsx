import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaBars, FaSearch, FaUser, FaUserCircle } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import logo from '@/uploads/logo.png';
import Cart from '@/components/Cart';
import debounce from "lodash.debounce";
import clientAxios from "@/config/axios";
import { useCart } from "@/hooks/useCart";

const Navbar = () => {
    const { cart } = useCart()
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const { auth, logout } = useContext(AuthContext);
    const [results, setResults] = useState({
        products: [],
        news: [],
        successCases: [],
    })
    const [isScrollingUp, setIsScrollingUp] = useState(true)
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isOpen, setIsOpen] = useState(false); // Controla la visibilidad del menú lateral
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false); // Controla el submenú de soluciones
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const searchRef = useRef(null);

    const fetchSearchResults = debounce(async (query) => {
        if (!query) {
            setResults({ products: [], news: [], successCases: [] });
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await clientAxios.get('/search', { params: { query } });
            setResults(response.data);
            console.log(results)
        } catch (err) {
            setError('Error al buscar. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    }, 300);

    const handleResultSelect = () => {
        setSearchQuery(null);
        toggleSearch()
    }

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchSearchResults(query);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
        if (openSearch) {
            setOpenSearch(false);
            searchRef.current.blur();
        }
    };

    const navigate = useNavigate();
    const location = useLocation();

    const handleExplore = () => {
        if (location.pathname !== '/products') {
            navigate('/products');
        }
        setIsCartOpen(!isCartOpen);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (openSearch) {
            setOpenSearch(false);
            searchRef.current.blur();
        }
    };

    const toggleUserDropdown = () => {
        setShowUserDropdown(!showUserDropdown);
    }

    const toggleSearch = () => {
        setOpenSearch(!openSearch);
        setSearchQuery('');
        fetchSearchResults('')
    };

    const clearSearchQuery = () => {
        fetchSearchResults('');
        setSearchQuery('');
    };

    const ItemsUser = [
        { key: "login", label: "Iniciar sesión", path: "/login" },
        { key: "register", label: "Registrarse", path: "/register" }
    ];

    const itemsClient = [
        { key: "profile", label: "Mi cuenta", path: "/profile" },
        { key: "orders", label: "Mis pedidos", path: "/orders" },
        { key: "logout", label: "Cerrar sesión", action: logout }
    ]

    const itemsAuthUser = [
        { key: "profile", label: "Perfil", path: "/profile" },
        { key: "dashboard", label: "Dashboard", path: "/dashboard" },
        { key: "orders", label: "Mis pedidos", path: "/orders" },
        { key: "logout", label: "Cerrar sesión", action: logout }
    ];

    const ItemsSolutions = [
        { key: "energy-efficiency", label: "Eficiencia energética", path: "/solutions/energy-efficiency" },
        { key: "equipment-rental", label: "Alquiler de equipos", path: "/solutions/equipment-rental" },
        { key: "infrared-thermography", label: "Termografía infrarroja", path: "/solutions/infrared-thermography" },
        { key: "renewable-energy", label: "Energía renovable", path: "/solutions/renewable-energy" },
        { key: "training", label: "Capacitación", path: "/solutions/training" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Solo esconder/mostrar el Navbar si el menú lateral no está abierto
            if (!isOpen) {
                if (currentScrollY > lastScrollY && !openSearch && !isCartOpen && !showSolutionsDropdown && !showUserDropdown) {
                    // Usuario está bajando y la barra de búsqueda no está abierta
                    setIsScrollingUp(false);
                } else {
                    // Usuario está subiendo
                    setIsScrollingUp(true);
                }
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY, openSearch, isOpen, isCartOpen, showSolutionsDropdown, showUserDropdown]);

    return (
        <div className="z-10 relative">
            <div className={`w-full py-3 bg-white shadow-md text-black z-10 ${openSearch ? 'shadow-none' : ''}`}>
                <div
                    className={`fixed top-0 h-16 left-0 w-full flex bg-white shadow-md z-50 transition-transform duration-300 ease-in-out ${isScrollingUp ? 'translate-y-0' : '-translate-y-full'
                        }`}
                >
                    <nav className="w-[90%] mx-auto flex justify-between items-center z-10 relative">
                        <div className="flex items-center">
                            {/* Botón de menú hamburguesa - Oculto en pantallas lg o más grandes */}
                            <button onClick={toggleMenu} className="text-2xl p-2 lg:hidden">
                                <FaBars />
                            </button>
                            <NavLink to="/">
                                <img src={logo} alt="logo" className="h-[2rem] ml-3" />
                            </NavLink>
                        </div>

                        {/* Menú Completo / Hamburguesa */}
                        <div
                            className="hidden lg:flex items-center space-x-1"
                        >
                            <ul className="flex lg:space-x-1 xl:space-x-3 items-center">
                                <li>
                                    <NavLink
                                        to="/"
                                        className="block px-2 py-2 text-gray-700 hover:text-indigo-500"
                                    >
                                        Inicio
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/products"
                                        className="block px-2 py-2 text-gray-700 hover:text-indigo-500"
                                    >
                                        Productos
                                    </NavLink>
                                </li>
                                {/* Soluciones en Navbar */}
                                <li className="relative">
                                    <button
                                        onClick={() => setShowSolutionsDropdown(!showSolutionsDropdown)}
                                        className="flex items-center px-2 py-2 text-gray-700 hover:text-indigo-500 focus:outline-none"
                                    >
                                        Soluciones
                                        <IoIosArrowDown
                                            className={`ml-2 transition-transform duration-300 ${showSolutionsDropdown ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    <div
                                        className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out transform ${showSolutionsDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                                            }`}
                                    >
                                        <ul className="py-2">
                                            {ItemsSolutions.map((item) => (
                                                <li key={item.key}>
                                                    <NavLink
                                                        to={item.path}
                                                        onClick={() => setShowSolutionsDropdown(false)}
                                                        className="block px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white"
                                                    >
                                                        {item.label}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <NavLink
                                        to="/news"
                                        className="block px-2 py-2 text-gray-700 hover:text-indigo-500"
                                    >
                                        Noticias
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/success-cases"
                                        className="block px-2 py-2 text-gray-700 hover:text-indigo-500 lg:text-center"
                                    >
                                        Casos de éxito
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/contact"
                                        className="block px-2 py-2 text-gray-700 hover:text-indigo-500"
                                    >
                                        Contáctanos
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* Menú lateral: aparece solo cuando se abre el menú en pantallas pequeñas */}
                        {isOpen && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-20"
                                onClick={toggleMenu}
                            ></div>
                        )}
                        <div
                            className={`fixed top-0 left-0 h-screen bg-white w-64 z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                                }`}
                            style={{
                                position: 'fixed', // Mantener fijo
                                top: 0, // Pegado al borde superior
                                height: '100vh', // Altura completa
                            }}
                        >
                            <button className="absolute top-4 right-4 text-2xl" onClick={toggleMenu}>
                                ✕
                            </button>
                            <div className="p-6 flex flex-col gap-y-6">
                                <NavLink to="/products" onClick={toggleMenu} className="text-lg font-semibold">
                                    Productos
                                </NavLink>
                                <div className="relative w-full">
                                    <button
                                        onClick={() => setShowSolutionsDropdown(!showSolutionsDropdown)}
                                        className="flex items-center text-lg font-semibold w-full justify-between"
                                    >
                                        Soluciones
                                        <IoIosArrowDown
                                            className={`ml-2 transition-transform duration-300 ${showSolutionsDropdown ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown con animación de altura */}
                                    <div
                                        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${showSolutionsDropdown ? 'max-h-96' : 'max-h-0'
                                            }`}
                                    >
                                        <ul className="py-2 pl-4">
                                            {ItemsSolutions.map((item) => (
                                                <li key={item.key}>
                                                    <NavLink
                                                        to={item.path}
                                                        onClick={toggleMenu}
                                                        className="block py-2 text-base text-gray-700 hover:text-indigo-500"
                                                    >
                                                        {item.label}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <NavLink to="/success-cases" onClick={toggleMenu} className="text-lg font-semibold">
                                    Casos de éxito
                                </NavLink>
                                <NavLink to="/news" onClick={toggleMenu} className="text-lg font-semibold">
                                    Noticias
                                </NavLink>
                                <NavLink to="/us" onClick={toggleMenu} className="text-lg font-semibold">
                                    Nosotros
                                </NavLink>
                                <NavLink to="/contact" onClick={toggleMenu} className="text-lg font-semibold">
                                    Contáctanos
                                </NavLink>
                            </div>
                        </div>

                        <div className="flex items-center justify-between sm:gap-2 xl:gap-4">
                            {/* Dropdown de usuario */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                                    className="flex items-center text-lg p-2 rounded-md bg-white hover:bg-gray-100 transition-all"
                                >
                                    <FaUserCircle className="text-2xl sm:mr-2" />
                                    <h1 className="hidden sm:block">{auth ? auth.name : 'Ingresar'}</h1>
                                </button>

                                {/* Dropdown */}
                                <div
                                    className={`absolute -right-12 mt-2 w-48 bg-white rounded-md shadow-lg transition-[max-height,opacity] duration-500 ease-in-out ${showUserDropdown ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'
                                        } overflow-hidden`}
                                >
                                    <ul className="py-2">
                                        {auth ? (
                                            auth.role === 'admin' ? (
                                                itemsAuthUser.map((item) => (
                                                    <li key={item.key}>
                                                        {/* Verifica si el item tiene una acción, de ser así, ejecuta la acción */}
                                                        {item.action ? (
                                                            <button
                                                                onClick={() => {
                                                                    item.action(); // Ejecuta la acción (logout en este caso)
                                                                    setShowUserDropdown(false); // Cierra el dropdown
                                                                }}
                                                                className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-500 w-full text-left"
                                                            >
                                                                {item.label}
                                                            </button>
                                                        ) : (
                                                            <NavLink
                                                                to={item.path}
                                                                onClick={() => setShowUserDropdown(false)} // Cierra el dropdown al hacer clic
                                                                className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-500"
                                                            >
                                                                {item.label}
                                                            </NavLink>
                                                        )}
                                                    </li>
                                                ))
                                            ) : (
                                                itemsClient.map((item) => (
                                                    <li key={item.key}>
                                                        {/* Verifica si el item tiene una acción, de ser así, ejecuta la acción */}
                                                        {item.action ? (
                                                            <button
                                                                onClick={() => {
                                                                    item.action(); // Ejecuta la acción (logout en este caso)
                                                                    setShowUserDropdown(false); // Cierra el dropdown
                                                                }}
                                                                className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-500 w-full text-left"
                                                            >
                                                                {item.label}
                                                            </button>
                                                        ) : (
                                                            <NavLink
                                                                to={item.path}
                                                                onClick={() => setShowUserDropdown(false)} // Cierra el dropdown al hacer clic
                                                                className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-500"
                                                            >
                                                                {item.label}
                                                            </NavLink>
                                                        )}
                                                    </li>
                                                ))
                                            )
                                        ) : (
                                            ItemsUser.map((item) => (
                                                <li key={item.key}>
                                                    {/* Verifica si el item tiene una acción, de ser así, ejecuta la acción */}
                                                    {item.action ? (
                                                        <button
                                                            onClick={() => {
                                                                item.action(); // Ejecuta la acción (logout en este caso)
                                                                setShowUserDropdown(false); // Cierra el dropdown
                                                            }}
                                                            className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-500 w-full text-left"
                                                        >
                                                            {item.label}
                                                        </button>
                                                    ) : (
                                                        <NavLink
                                                            to={item.path}
                                                            onClick={() => setShowUserDropdown(false)} // Cierra el dropdown al hacer clic
                                                            className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-500"
                                                        >
                                                            {item.label}
                                                        </NavLink>
                                                    )}
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>

                            {/* Botón del carrito */}
                            <Button
                                variant="bordered"
                                className="relative text-2xl p-2 hover:text-indigo-500 duration-300 rounded-lg flex items-center justify-center"
                                style={{ outline: 'none', boxShadow: 'none' }}
                                onClick={toggleCart}
                            >
                                <FaCartShopping />
                                <span className="absolute -top-0 -right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                                    {totalItems > 0 ? (totalItems > 9 ? '9+' : totalItems) : 0}
                                </span>
                            </Button>
                            <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} handleExplore={handleExplore} />

                            {/* Botón de búsqueda */}
                            <Button
                                className="text-2xl px-1 hover:text-indigo-500 duration-300 rounded-lg flex items-center justify-center"
                                style={{ outline: 'none', boxShadow: 'none' }}
                                onClick={toggleSearch}
                            >
                                <FaSearch />
                            </Button>
                        </div>

                    </nav>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 -z-20" // Asegura que el overlay está detrás del navbar
                    style={{ top: '4rem' }} // Ajusta la parte superior según la altura del navbar
                    onClick={toggleMenu} // Cierra el menú al hacer clic fuera
                ></div>
            )}

            {openSearch && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 -z-20" // Asegura que el overlay está detrás del navbar
                    style={{ top: '4rem' }} // Ajusta la parte superior según la altura del navbar
                    onClick={toggleSearch} // Cierra el buscador al hacer clic fuera
                ></div>
            )}
            <div
                ref={searchRef}
                className={`fixed top-[0rem] left-0 w-full bg-white transition-transform duration-300 ease-in-out -z-10 ${openSearch ? 'translate-y-16' : '-translate-y-full'
                    }`}
            >
                <div className="relative w-[80%] mx-auto py-4">
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-sm bg-gray-200 rounded-md focus:outline-none shadow-sm focus:ring-2 focus:ring-indigo-500"
                        value={searchQuery}
                        onChange={handleInputChange}
                        placeholder="Buscar productos, noticias, casos de éxito..."
                    />
                    <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => clearSearchQuery()}
                    >
                        ✕
                    </button>
                </div>
                <div className="w-[80%] mx-auto bg-white shadow-md rounded-md">
                    {loading && <p className="text-center py-2">Cargando resultados...</p>}
                    {error ? <p className="text-red-500 text-center py-2">{error}</p> : ''}
                    {!loading && !error && (
                        <div className="py-4 space-y-4">
                            {/* Renderizar productos */}
                            {results.products?.length > 0 && (
                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-semibold">Productos</h3>
                                        <Link to='/products' onClick={toggleSearch}>
                                            <h1 className="hover:text-blue-500">Ver todos los resultados</h1>
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                        {results.products.slice(0, 5).map((product) => (
                                            <div
                                                key={product.id}
                                                className="p-4 border rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                                            >
                                                <NavLink
                                                    to={`/products/${product._id}`}
                                                    className="block text-sm font-semibold text-gray-600 hover:text-blue-500 transition-all duration-300"
                                                    onClick={handleResultSelect}
                                                >
                                                    <div className="w-full aspect-square overflow-hidden rounded-t-md">
                                                        <img
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <p className="mt-2">{product.name}</p>
                                                    <h1>${(product.price).toFixed(2)}</h1>
                                                </NavLink>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Renderizar noticias */}
                            {results.news?.length > 0 && (
                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-semibold">Noticias</h3>
                                        <Link to='/news' onClick={toggleSearch}>
                                            <h1 className="hover:text-blue-500">Ver todos los resultados</h1>
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {results.news.slice(0, 3).map((newsItem) => (
                                            <div
                                                key={newsItem._id}
                                                className="p-4 border rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                                            >
                                                <NavLink
                                                    to={`/news/${newsItem._id}`}
                                                    className="text-sm font-semibold text-gray-600 hover:text-blue-500 transition-all duration-300"
                                                    onClick={handleResultSelect}
                                                >
                                                    {newsItem.title}
                                                </NavLink>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Renderizar casos de éxito */}
                            {results.successCases?.length > 0 && (
                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-semibold">Casos de éxito</h3>
                                        <Link to='/success-cases' onClick={toggleSearch}>
                                            <h1 className="hover:text-blue-500">Ver todos los resultados</h1>
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {results.successCases.slice(0, 3).map((successCase) => (
                                            <div
                                                key={successCase._id}
                                                className="p-4 border rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                                            >
                                                <NavLink
                                                    to={`/success-cases/${successCase._id}`}
                                                    className="text-sm font-semibold text-gray-600 hover:text-blue-500 transition-all duration-300"
                                                    onClick={handleResultSelect}
                                                >
                                                    {successCase.title}
                                                </NavLink>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>

    );
};

export default Navbar;
