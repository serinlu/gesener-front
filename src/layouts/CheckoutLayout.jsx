import CheckoutStages from '@/components/CheckoutStages'
import { AuthContext } from '@/context/AuthContext'
import logo from '@/uploads/logo.png'
import React, { useContext, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link, NavLink, Outlet } from 'react-router-dom'

const CheckoutLayout = () => {
    const { auth, logout } = useContext(AuthContext)
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const ItemsUser = [
        { key: "login", label: "Iniciar sesión", path: "/login" },
        { key: "register", label: "Registrarse", path: "/register" }
    ];

    const itemsAuthUser = [
        { key: "profile", label: "Perfil", path: "/profile" },
        { key: "dashboard", label: "Dashboard", path: "/dashboard" },
        { key: "orders", label: "Mis pedidos", path: "/orders" },
        { key: "logout", label: "Cerrar sesión", action: logout }
    ];

    const itemsClient = [
        { key: "profile", label: "Mi cuenta", path: "/profile" },
        { key: "orders", label: "Mis pedidos", path: "/orders" },
        { key: "logout", label: "Cerrar sesión", action: logout }
    ];

    return (
        <div className='flex flex-col min-h-screen bg-white text-gray-500'>
            <div className='w-[80%] mx-auto'>
                <div className='flex justify-between p-4'>
                    <Link to='/'>
                        <img src={logo} alt='Logo' className='w-60 h-16 mx-auto' />
                    </Link>
                    <div className='flex items-center text-3xl font-bold'>
                        Checkout
                    </div>
                    <div className="relative z-50 my-auto">
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
                </div>
                <CheckoutStages />
                <Outlet />
            </div>
            <footer className="w-full text-center mt-auto py-4 bg-white">
                <p className="text-sm text-gray-400">&copy; 2024 Gesener. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}

export default CheckoutLayout
