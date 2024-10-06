import React, { useContext, useEffect, useState, useRef } from 'react';
import { FaBars, FaCross, FaSearch, FaTimes, FaUser } from 'react-icons/fa';
import { FaCartShopping, FaX, FaXmark } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../uploads/logo.png';
import { IoIosArrowDown } from 'react-icons/io';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import ModalComponent from './Modal';
import { AuthContext } from '../context/AuthContext';
import clsx from 'clsx';

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const { auth, logout } = useContext(AuthContext); // Obtén el estado de autenticación y logout del contexto
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        solutions: false,
        products: false
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const searchMenuRef = useRef(null);

    const toggleDropdown = (menu) => {
        setIsDropdownOpen((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu]
        }));
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const navigate = useNavigate()
    const location = useLocation()

    const handleExplore = () => {
        if (location.pathname !== '/products') {
            navigate('/products')
        }
        setIsCartOpen(!isCartOpen);
    }

    const ItemsUser = [
        { key: "login", label: "Iniciar sesión", path: "/login" },
        { key: "register", label: "Registrarse", path: "/register" }
    ];

    const itemsAuthUser = [
        { key: "profile", label: "Perfil", path: "/dashboard/profile" },
        { key: "dashboard", label: "Dashboard", path: "/dashboard" },
        { key: "orders", label: "Mis pedidos", path: "/dashboard/orders" },
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
        const handleClickOutside = (event) => {
            if (searchMenuRef.current && !searchMenuRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };
    }, []);

    return (
        <div className='w-full py-3 bg-white shadow-md text-black z-20 outline-none'>
            <nav className='w-[90%] mx-auto flex justify-between items-center'>
                <NavLink to="/">
                    <img src={logo} alt="logo" className='w-[10rem] h-[2.5rem]' />
                </NavLink>
                <div className='flex gap-x-6'>
                    {/* Soluciones Link with Dropdown */}
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className='p-2 text-sm flex hover:text-indigo-500 duration-300 rounded-lg'
                                style={{ outline: 'none', boxShadow: 'none' }}
                                onClick={() => toggleDropdown('solutions')}
                            >
                                SOLUCIONES
                                <span className={`transition-transform duration-300 ${isDropdownOpen.solutions ? 'rotate-180' : 'rotate-0'}`}>
                                    <IoIosArrowDown />
                                </span>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Soluciones" className='bg-white shadow-lg rounded-lg p-2 text-base'>
                            {ItemsSolutions.map(item => (
                                <DropdownItem key={item.key} className="p-2">
                                    <NavLink
                                        to={item.path}
                                        className="hover:bg-gray-200 transition-all duration-300 ease-in-out p-2 rounded-lg"
                                        style={{ outline: 'none', boxShadow: 'none' }}
                                    >
                                        {item.label}
                                    </NavLink>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>

                    {/* Productos Link */}
                    <NavLink to="products">
                        <Button
                            variant="bordered"
                            className='p-2 text-sm flex hover:text-indigo-500 duration-300 rounded-lg font-bold'
                            style={{ outline: 'none', boxShadow: 'none' }}
                        >
                            PRODUCTOS
                        </Button>
                    </NavLink>

                    {/* Casos de Éxito */}
                    <NavLink to="#">
                        <Button
                            variant="bordered"
                            className='p-2 text-sm hover:text-indigo-500 duration-300 rounded-lg'
                            style={{ outline: 'none', boxShadow: 'none' }}
                        >
                            CASOS DE ÉXITO
                        </Button>
                    </NavLink>

                    {/* Noticias */}
                    <NavLink to="news">
                        <Button
                            variant="bordered"
                            className='p-2 text-sm hover:text-indigo-500 duration-300 rounded-lg'
                            style={{ outline: 'none', boxShadow: 'none' }}
                        >
                            NOTICIAS
                        </Button>
                    </NavLink>

                    {/* Nosotros */}
                    <NavLink to="us">
                        <Button
                            variant="bordered"
                            className='p-2 text-sm hover:text-indigo-500 duration-300 rounded-lg'
                            style={{ outline: 'none', boxShadow: 'none' }}
                        >
                            NOSOTROS
                        </Button>
                    </NavLink>

                    {/* Contáctanos */}
                    <NavLink to="contact">
                        <Button
                            variant="bordered"
                            className='p-2 text-sm hover:text-indigo-500 duration-300 rounded-lg'
                            style={{ outline: 'none', boxShadow: 'none' }}
                        >
                            CONTÁCTANOS
                        </Button>
                    </NavLink>
                </div>

                <div className='flex gap-x-2'>
                    <Dropdown>
                        <DropdownTrigger>
                            {auth ? (
                                <Button
                                    variant="bordered"
                                    className='p-2 text-lg hover:text-indigo-500 duration-300 rounded-lg'
                                >
                                    {auth.name} {/* Muestra el nombre del usuario */}
                                </Button>
                            ) : (
                                <Button
                                    variant="bordered"
                                    className='p-2 text-lg hover:text-indigo-500 duration-300 rounded-lg'
                                >
                                    <FaUser />
                                </Button>
                            )}
                        </DropdownTrigger>

                        <DropdownMenu aria-label="Opciones de usuario" className='bg-white shadow-lg rounded-lg p-2 text-base'>
                            {auth ? (
                                itemsAuthUser.map(item => (
                                    <DropdownItem
                                        key={item.key}
                                        className="p-2"
                                        onClick={item.action ? item.action : null} // Si el ítem es logout, llama a la acción
                                    >
                                        <NavLink
                                            to={item.path}
                                            className="hover:bg-gray-200 transition-all duration-300 ease-in-out p-2 rounded-lg"
                                        >
                                            {item.label}
                                        </NavLink>
                                    </DropdownItem>
                                ))
                            ) : (
                                ItemsUser.map(item => (
                                    <DropdownItem key={item.key} className="p-2">
                                        <NavLink
                                            to={item.path}
                                            className="hover:bg-gray-200 transition-all duration-300 ease-in-out p-2 rounded-lg"
                                        >
                                            {item.label}
                                        </NavLink>
                                    </DropdownItem>
                                ))
                            )}
                        </DropdownMenu>
                    </Dropdown>

                    <Button
                        variant="bordered"
                        className='p-2 text-xl hover:text-indigo-500 duration-300 rounded-lg'
                        style={{ outline: 'none', boxShadow: 'none' }}
                        onClick={toggleCart}
                    >
                        <FaCartShopping />
                    </Button>
                    <ModalComponent />
                    {isCartOpen && (
                        <>
                            {/* Fondo oscuro con transición de opacidad */}
                            <div
                                className={clsx(
                                    "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500",
                                    { 'opacity-0 pointer-events-none': !isCartOpen, 'opacity-100': isCartOpen }
                                )}
                                onClick={toggleCart}
                            ></div>

                            {/* Menú del carrito que se desplaza de derecha a izquierda */}
                            <div
                                className={clsx(
                                    "fixed top-0 right-0 h-full w-[75%] md:w-[40%] lg:w-[30%] bg-white shadow-lg z-50 transform transition-transform duration-500",
                                    { '-translate-x-full': !isCartOpen, 'translate-x-0': isCartOpen }
                                )}
                            >
                                <div className='flex justify-between items-center p-6 h-[10%] border-b-1'>
                                    <div className='font-bold text-xl'>
                                        <h1>Tu carrito</h1>
                                    </div>
                                    <Button onClick={toggleCart}>
                                        <FaXmark className='text-2xl' />
                                    </Button>
                                </div>
                                <div className="flex flex-col justify-center items-center h-[75%] border-b-1">
                                    <h1 className='text-center mb-4'>Tu carrito está vacío</h1>
                                    <Button
                                        className='bg-indigo-500 text-white font-bold rounded-xl px-6 py-2'
                                        onClick={handleExplore}
                                    >
                                        Explora la tienda
                                    </Button>
                                </div>
                                <div className='my-auto space-y-2 items-center py-5'>
                                    <div className='flex justify-between items-center mx-6 text-xl'>
                                        <h1>Subtotal</h1>
                                        <h1 className='text-red-500 font-semibold'>$ </h1>
                                    </div>
                                    <Button className='w-[90%] flex mx-auto bg-indigo-600 rounded-lg'>
                                        <h1 className='my-2 text-white font-semibold'>Finalizar compra</h1>
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
