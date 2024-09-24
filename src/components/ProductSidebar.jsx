import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../services/CategoryService';

const ProductNavbar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <nav className="flex flex-col gap-6 mt-16 px-6">
            {categories.map((category) => (
                <NavLink
                    key={category._id}
                    to={`/products/category/${category.name}`} // Usar el ID en la URL
                    className="text-sm font-semibold text-gray-700 hover:text-indigo-500 transition-colors pl-4"
                >
                    {category.name} {/* Mostrar el nombre en el frontend */}
                </NavLink>
            ))}
        </nav>
    );
};

export default ProductNavbar;
