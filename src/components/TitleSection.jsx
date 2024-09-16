import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import energyEfficiency from '../uploads/energy-efficiency.jpg';
import equipmentRental from '../uploads/equipment-rental.jpeg';
import infraredThermography from '../uploads/infrared-thermography.jpg';
import renewableEnergy from '../uploads/renewable-energy.jpg';
import training from '../uploads/training.jpg';

import nosotros from '../uploads/nosotros.jpg';

const images = {
    '/solutions/energy-efficiency': energyEfficiency,
    '/solutions/equipment-rental': equipmentRental,
    '/solutions/infrared-thermography': infraredThermography,
    '/solutions/renewable-energy': renewableEnergy,
    '/solutions/training': training,
    '/us': nosotros,
};

const titles = {
    '/solutions/energy-efficiency': 'Eficiencia energética',
    '/solutions/equipment-rental': 'Alquiler de equipos',
    '/solutions/infrared-thermography': 'Termografía infrarroja',
    '/solutions/renewable-energy': 'Energía renovable',
    '/solutions/training': 'Capacitaciones',
    '/us': 'Nosotros',
};

const TitleSection = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const coverImage = images[currentPath];
    const title = titles[currentPath];

    // Estado para controlar cuándo iniciar la animación
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Iniciar la animación después de un breve retraso
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500); // 500 ms delay

        return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
    }, [currentPath]);

    return (
        <div className="relative w-full object-cover h-[70vh]">
            <img src={coverImage} alt={title} className="w-full h-full object-cover" />
            <h1
                className={`absolute bottom-0 left-0 p-14 font-bold text-6xl text-white transition-all duration-1000 
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                {title}
            </h1>
        </div>
    );
};

export default TitleSection;
