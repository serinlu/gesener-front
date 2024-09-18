import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const ProductNavbar = () => {
    const linkLabels = [
        { label: "Baterías", path: "/products/baterias" },
        { label: "Analizadores de redes", path: "/products/analizadores-de-redes" },
        { label: "Bombas de agua", path: "/products/bombas-de-agua" },
        { label: "Cables solares", path: "/products/cables-solares" },
        { label: "Controladores", path: "/products/controladores" },
        { label: "Eficiencia energética", path: "/products/eficiencia-energetica" },
        { label: "Energías renovables", path: "/products/energias-renovables" },
        { label: "Inversores", path: "/products/inversores" },
        { label: "Paneles solares", path: "/products/paneles-solares" },
        { label: "Smart Meter", path: "/products/smart-meter" },
        { label: "Soportes solares", path: "/products/soportes-solares" },
        { label: "Termografía infrarroja", path: "/products/termografia-infrarroja" },
        { label: "Transformadores de aislamiento", path: "/products/transformadores-de-aislamiento" },
        { label: "UPS", path: "/products/ups" },
        { label: "UPS tipo Torre", path: "/products/ups-tipo-torre" },
        { label: "UPS tipo Torre/Rack", path: "/products/ups-rack" }
    ]

    return (
        <nav className="flex flex-col gap-6 mt-16 px-6">
            {linkLabels.map((data, index) => (
                <NavLink
                    key={index}
                    to={data.path}
                    className="text-sm font-semibold text-gray-700 hover:text-indigo-500 transition-colors pl-4"
                >
                    {data.label}
                </NavLink>
            ))}
        </nav>
    )
}

export default ProductNavbar
