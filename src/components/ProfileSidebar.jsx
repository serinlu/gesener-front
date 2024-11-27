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
            <div className="text-black flex flex-col w-full md:ml-6">
                <div className="mt-10 flex flex-row md:flex-col items-center md:items-start justify-center md:justify-start">
                    {menuItems.map((item) => (
                        <div
                            key={item.title}
                            className={`flex items-center p-4 cursor-pointer transition-colors hover:text-blue-700 ${selectedOption === item.title
                                    ? 'text-blue-700 border-blue-700 border-b-3 md:border-b-0 md:border-r-4'
                                    : ''
                                }`}
                            onClick={() => handleMenuClick(item.title, item.path)} // Llamar a handleMenuClick
                        >
                            <span className="mr-4">{item.icon}</span>
                            {item.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
