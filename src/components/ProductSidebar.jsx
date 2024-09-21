// ProductNavbar.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../services/CategoryService';

const ProductNavbar = () => {
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(response);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <nav className="flex flex-col gap-6 mt-16 px-6">
            {categories.map((category, index) => (
                <NavLink
                    key={index}
                    to={`/product/${category.name}`} // Asumiendo que cada categoría tiene un 'slug' para la URL
                    className="text-sm font-semibold text-gray-700 hover:text-indigo-500 transition-colors pl-4"
                >
                    {category.name}
                </NavLink>
            ))}
        </nav>
    );
};

export default ProductNavbar;
