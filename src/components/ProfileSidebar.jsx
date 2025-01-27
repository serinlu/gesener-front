import React, { useEffect, useState } from 'react';
import { FaInfo, FaBox } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfileSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const menuItems = [
        { title: 'Mi información', icon: <FaInfo />, path: '/profile' },
        { title: 'Mis pedidos', icon: <FaBox />, path: '/orders' },
    ];

    useEffect(() => {
        const currentItem = menuItems.find(item => item.path === location.pathname);
        if (currentItem) {
            setSelectedOption(currentItem.title);
        }
    }, [location.pathname]);

    const handleMenuClick = (title, path) => {
        setSelectedOption(title); // Actualizar la opción seleccionada
        navigate(path); // Navegar a la ruta correspondiente
    };

    return (
        <div className="flex w-full md:w-1/5">
            <div className="text-black flex flex-col w-full">
                <div className="md:mt-10 flex flex-row md:flex-col items-center md:items-start justify-center md:justify-start">
                    {menuItems.map((item) => (
                        <div
                            key={item.title}
                            className={`flex items-center p-4 cursor-pointer transition-colors w-full font-semibold ${selectedOption === item.title
                                ? 'text-white bg-blue-500 hover:text-white md:border-b-0 md:border-r-4'
                                : 'text-gray-500 bg-gray-100 md:bg-white hover:text-blue-500'
                                }`}
                            onClick={() => handleMenuClick(item.title, item.path)} // Llamar a handleMenuClick
                        >
                            <div className='flex items-center mx-auto'>
                                <span className="mr-3">{item.icon}</span>
                                <span className="flex-1">{item.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;