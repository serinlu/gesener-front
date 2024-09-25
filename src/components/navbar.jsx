import React, { useEffect, useState, useRef } from 'react';
import { FaBars, FaSearch, FaTimes, FaUser } from 'react-icons/fa';
import { FaCartShopping, FaX } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import logo from '../uploads/logo.png';
import { IoIosArrowDown } from 'react-icons/io';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure, Card, CardFooter, DropdownSection } from "@nextui-org/react";
import ModalComponent from './Modal';

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        solutions: false,
        products: false
    });
    const searchMenuRef = useRef(null);

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
                    <NavLink to="products/category/all">
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
