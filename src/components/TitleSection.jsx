import React from 'react';
import { useLocation } from 'react-router-dom';

import renewableEnergy from '../uploads/renewable-energy.jpg';
import training from '../uploads/training.jpg';

const images = {
    '/solutions/renewable-energy': renewableEnergy,
    '/solutions/training': training,
};

const titles = {
    '/solutions/renewable-energy': 'Energía renovable',
    '/solutions/training': 'Capacitaciones',
};

const TitleSection = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const coverImage = images[currentPath]
    const title = titles[currentPath] 

    return (
        <div className="relative w-full object-cover h-[70vh]">
            <img src={coverImage} alt={title} className="w-full h-full object-cover" />
            <h1 className="absolute bottom-0 left-0 p-14 font-bold text-6xl text-white">{title}</h1>
        </div>
    );
};

export default TitleSection;
