import React, { useEffect, useState, useRef } from 'react';
import { FaBars, FaSearch, FaTimes, FaUser } from 'react-icons/fa';
import { FaCartShopping, FaX } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import logo from '../uploads/logo.png';
import { IoIosArrowDown } from 'react-icons/io';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure, Card, CardFooter, DropdownSection } from "@nextui-org/react";
import ModalComponent from './Modal';
import alquiler from '../uploads/training.jpg'; // Example image import, you can change it with dynamic ones
import clsx from 'clsx';
import ProductNavbar from './ProductNavbar';

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        solutions: false,
        products: false
    });
    const searchMenuRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = (menu) => {
        setIsDropdownOpen((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu]
        }));
    };

    const ItemsUser = [
        { key: "login", label: "Iniciar sesión", path: "/login" },
        { key: "register", label: "Registrarse", path: "/register" }
    ];

    const ItemsSolutions = [
        { key: "energy-efficiency", label: "Eficiencia energética", path: "/solutions/energy-efficiency" },
        { key: "equipment-rental", label: "Alquiler de equipos", path: "/solutions/equipment-rental" },
        { key: "infrared-thermography", label: "Termografía infrarroja", path: "/solutions/infrared-thermography" },
        { key: "renewable-energy", label: "Energía renovable", path: "/solutions/renewable-energy" },
        { key: "training", label: "Capacitación", path: "/solutions/training" }
    ];

    // Actualización del array ItemsProducts con image y description
    const ItemsProducts = [
        { key: "solar-panels", label: "Paneles solares", path: "/products/solar-panels", image: 'https://www.gesener.pe/wp-content/uploads/2022/04/Foto-4.png', description: 'Paneles solares de alta eficiencia.' },
        { key: "inverters", label: "Inversores", path: "/products/inverters", image: '/path/to/inverter.jpg', description: 'Inversores para sistemas solares.' },
        { key: "batteries", label: "Baterías", path: "/products/batteries", image: '/path/to/battery.jpg', description: 'Baterías de larga duración para energía solar.' },
        { key: "inverters", label: "Inversores", path: "/products/inverters", image: '/path/to/inverter.jpg', description: 'Inversores para sistemas solares.' },
        { key: "inverters", label: "Inversores", path: "/products/inverters", image: '/path/to/inverter.jpg', description: 'Inversores para sistemas solares.' },
        { key: "inverters", label: "Inversores", path: "/products/inverters", image: '/path/to/inverter.jpg', description: 'Inversores para sistemas solares.' }
    ];

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchMenuRef.current && !searchMenuRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='w-full py-3 bg-white shadow-md text-black z-20 outline-none'>
            <div className="relative">

                {/* Fondo oscuro que oscurece la pantalla fuera del navbar */}
                <div
                    className={clsx(
                        "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500",
                        { 'opacity-0 pointer-events-none': !isOpen, 'opacity-100': isOpen }
                    )}
                    onClick={toggleNavbar}
                ></div>

                {/* Navbar lateral */}
                <div
                    className={clsx(
                        "fixed top-0 left-0 h-full w-[75%] md:w-[40%] lg:w-[30%] bg-white shadow-lg z-50 transform transition-transform duration-500",
                        { '-translate-x-full': !isOpen, 'translate-x-0': isOpen }
                    )}
                >
                    {/* Botón para cerrar el navbar */}
                    <button
                        onClick={toggleNavbar}
                        className="text-2xl p-2 absolute top-4 right-4 text-gray-700 focus:outline-none"
                    >
                        <FaTimes />
                    </button>

                    {/* Contenido del navbar */}
                    <ProductNavbar />
                </div>
            </div>
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
                                <span className={`ml-1 transition-transform duration-300 ${isDropdownOpen.solutions ? 'rotate-180' : 'rotate-0'}`}>
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

                    {/* Productos Link with Dropdown */}
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className='p-2 text-sm flex hover:text-indigo-500 duration-300 rounded-lg font-bold'
                                style={{ outline: 'none', boxShadow: 'none' }}
                                onClick={toggleNavbar}
                            >
                                PRODUCTOS
                            </Button>
                        </DropdownTrigger>
                    </Dropdown>



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
                            <Button
                                variant="bordered"
                                className='p-2 text-lg hover:text-indigo-500 duration-300 rounded-lg'
                                style={{ outline: 'none', boxShadow: 'none' }}
                            >
                                <FaUser className="text-xl" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Soluciones" className='bg-white shadow-lg rounded-lg p-2 text-base'>
                            {ItemsUser.map(item => (
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

                    <Button
                        variant="bordered"
                        className='p-2 text-xl hover:text-indigo-500 duration-300 rounded-lg'
                        style={{ outline: 'none', boxShadow: 'none' }}
                    >
                        <FaCartShopping />
                    </Button>
                    <ModalComponent />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
