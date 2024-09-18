import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import logo from '../uploads/logo.png';
import { IoIosArrowDown } from 'react-icons/io';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure, Card, CardFooter } from "@nextui-org/react";
import ModalComponent from './Modal';
import alquiler from '../uploads/training.jpg'; // Example image import, you can change it with dynamic ones

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        solutions: false,
        products: false
    });
    const searchMenuRef = useRef(null);
    const { onOpen } = useDisclosure();

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

    const CategoriesLabels = [
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
        { key: "bateries", label: "Baterías" },
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
        <div className='w-full py-3 bg-white shadow-md text-black z-10 outline-none'>
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
                                className='p-2 text-sm flex hover:text-indigo-500 duration-300 rounded-lg'
                                style={{ outline: 'none', boxShadow: 'none' }}
                                onClick={() => toggleDropdown('products')}
                            >
                                PRODUCTOS
                                <span className={`ml-1 transition-transform duration-300 ${isDropdownOpen.products ? 'rotate-180' : 'rotate-0'}`}>
                                    <IoIosArrowDown />
                                </span>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Productos"
                            className="bg-white shadow-lg rounded-lg text-base relative px-2 right-0 mx-auto w-auto my-auto"
                        >
                            {CategoriesLabels.map(item => (
                                <DropdownItem key={item.key} className="p-2 hover:bg-gray-200 transition-all duration-300 ease-in-out rounded-lg">
                                    <NavLink
                                        to={item.path}
                                        className="block w-full h-full p-2"
                                        style={{ outline: 'none', boxShadow: 'none' }}
                                    >
                                        {item.label}
                                    </NavLink>
                                </DropdownItem>
                            ))}
                            {ItemsProducts.map(item => (
                                <DropdownItem key={item.key} className="p-2">
                                    <NavLink
                                        to={item.path}
                                        className="block w-full h-full hover:bg-gray-200 transition-all duration-300 ease-in-out rounded-lg"
                                        style={{ outline: 'none', boxShadow: 'none' }}
                                    >
                                        <div className="relative border-none h-60 rounded-lg overflow-hidden">
                                            <img
                                                alt={item.label}
                                                src={item.image}
                                                className="object-cover w-full h-full"
                                            />
                                            <div className="absolute inset-x-0 bottom-1 bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden py-3 rounded-xl shadow-small z-10 mx-1">
                                                <p className="text-base text-white pl-3">{item.description}</p>
                                                <Button
                                                    className="text-sm text-white bg-black/20 p-2 group relative overflow-hidden transition-all duration-300 ease-in-out rounded-lg"
                                                    variant="flat"
                                                    color="default"
                                                    radius="lg"
                                                    size="sm"
                                                >
                                                    <span className="relative z-10 group-hover:scale-105 transition-transform duration-300 ease-in-out">
                                                        Explorar
                                                    </span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                                </Button>
                                            </div>
                                        </div>
                                    </NavLink>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
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
                        <DropdownMenu aria-label="Opciones de usuario">
                            {ItemsUser.map(item => (
                                <DropdownItem key={item.key}>
                                    <NavLink to={item.path} className='p-2 hover:bg-gray-200 rounded-lg'>
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
