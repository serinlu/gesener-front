import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import logo from '../uploads/logo.png';
import { IoIosArrowDown } from 'react-icons/io';

const Navbar = () => {
    const [showSolutionsMenu, setShowSolutionsMenu] = useState(false);
    const [showProductsMenu, setShowProductsMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const handleMouseEnterSolutions = () => setShowSolutionsMenu(true);
    const handleMouseLeaveSolutions = () => setShowSolutionsMenu(false);

    const handleMouseEnterProducts = () => setShowProductsMenu(true);
    const handleMouseLeaveProducts = () => setShowProductsMenu(false);

    const onClickSearch = () => setShowSearch(!showSearch);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const searchMenu = document.getElementById('search-menu');
            if (searchMenu && !searchMenu.contains(event.target)) {
                setShowSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='w-full py-4 bg-white shadow-md'>
            <nav className='w-[90%] mx-auto flex justify-between items-center'>
                <NavLink to="/">
                    <img src={logo} alt="logo" className='w-48' />
                </NavLink>
                <div className='flex gap-x-6'>

                    {/* Soluciones Link with Dropdown */}
                    <div
                        className='relative'
                        onMouseEnter={handleMouseEnterSolutions}
                        onMouseLeave={handleMouseLeaveSolutions}
                    >
                        <NavLink to="#" className='p-4 hover:text-indigo-500 duration-300 flex items-center gap-2'>
                            SOLUCIONES
                            <span>
                                <IoIosArrowDown />
                            </span>
                        </NavLink>
                        {showSolutionsMenu && (
                            <div className='absolute top-full left-0 w-96 rounded-lg bg-white shadow-lg z-50'>
                                <ul className='py-2'>
                                    <li className='px-4 py-2 hover:bg-gray-100'>
                                        <NavLink to="/solutions/energy-efficiency">Eficiencia Energética</NavLink>
                                    </li>
                                    <li className='px-4 py-2 hover:bg-gray-100'>
                                        <NavLink to="/solutions/equipment-rental">Alquiler de Equipos</NavLink>
                                    </li>
                                    <li className='px-4 py-2 hover:bg-gray-100'>
                                        <NavLink to="/solutions/infrared-thermography">Termografía Infrarroja</NavLink>
                                    </li>
                                    <li className='px-4 py-2 hover:bg-gray-100'>
                                        <NavLink to="/solutions/renewable-energy">Energía Renovable</NavLink>
                                    </li>
                                    <li className='px-4 py-2 hover:bg-gray-100'>
                                        <NavLink to="/solutions/training">Capacitación</NavLink>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Productos Link with Dropdown */}
                    <div
                        className='relative'
                        onMouseEnter={handleMouseEnterProducts}
                        onMouseLeave={handleMouseLeaveProducts}
                    >
                        <NavLink to="#" className='p-4 hover:text-indigo-500 duration-300 flex items-center gap-2'>
                            PRODUCTOS
                            <span>
                                <IoIosArrowDown />
                            </span>
                        </NavLink>
                        {showProductsMenu && (
                            <div className='absolute top-full left-0 w-96 rounded-lg bg-white shadow-lg z-50'>
                                <ul className='py-2'>
                                    <li className='px-4 py-2 hover:bg-gray-100'>
                                        <NavLink to="/products/solar-panels">Paneles Solares</NavLink>
                                    </li>
                                    <li className='px-4 py-2 hover:bg-gray-100'>
                                        <NavLink to="/products/inverters">Inversores</NavLink>
                                    </li>
                                    <li className='px-4 py-2 hover:bg-gray-100'>
                                        <NavLink to="/products/batteries">Baterías</NavLink>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <NavLink to="success-stories" className='p-4 hover:text-indigo-500 duration-300'>CASOS DE ÉXITO</NavLink>
                    <NavLink to="news" className='p-4 hover:text-indigo-500 duration-300'>NOTICIAS</NavLink>
                    <NavLink to="us" className='p-4 hover:text-indigo-500 duration-300'>NOSOTROS</NavLink>
                    <NavLink to="contact" className='p-4 hover:text-indigo-500 duration-300'>CONTÁCTANOS</NavLink>
                </div>
                <div className='flex gap-x-2'>
                    <button className='p-2 text-lg hover:text-indigo-500 duration-300'>
                        <FaUser />
                    </button>
                    <button className='p-2 text-lg hover:text-indigo-500 duration-300'>
                        <FaCartShopping />
                    </button>
                    <div
                        className='relative'
                    >
                        <button
                            className='p-2 text-lg hover:text-indigo-500 duration-300'
                            onClick={onClickSearch}
                        >
                            <IoSearch />
                        </button>
                        {showSearch && (
                            <div id='search-menu' className='absolute top-full right-0 mt-1 w-96 rounded-lg bg-white shadow-lg z-50'>
                                <form className='p-4'>
                                    <input type='text' placeholder='Buscar' className='w-full p-2 border border-gray-200 rounded-lg' />
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar