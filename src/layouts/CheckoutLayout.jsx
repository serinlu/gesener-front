import React, { useContext } from 'react'
import CheckoutStages from '@/components/CheckoutStages'
import logo from '@/uploads/logo.png'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'
import { AuthContext } from '@/context/AuthContext'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { FaUser } from 'react-icons/fa'

const CheckoutLayout = () => {
    const { auth, logout } = useContext(AuthContext)

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

    return (
        <div className='w-full bg-white text-gray-500'>
            <div className='w-[80%] mx-auto'>
                <div className='flex justify-between p-4'>
                    <Link to='/'>
                        <img src={logo} alt='Logo' className='w-60 h-16 mx-auto' />
                    </Link>
                    <div className='flex items-center text-3xl font-bold'>
                        Checkout
                    </div>
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
                </div>
                <CheckoutStages />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default CheckoutLayout
