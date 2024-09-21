// ProductNavbar.js
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CategoryContext } from '../context/CategoryContext';

const ProductNavbar = () => {
    const { categories } = useContext(CategoryContext);

    return (
        <nav className="flex flex-col gap-6 mt-16 px-6">
            {categories.map((category, index) => (
                <NavLink
                    key={index}
                    //to={`/products/${category.slug}`} // Asumiendo que cada categoría tiene un 'slug' para la URL
                    className="text-sm font-semibold text-gray-700 hover:text-indigo-500 transition-colors pl-4"
                >
                    {category.name}
                </NavLink>
            ))}
        </nav>
    );
};

export default ProductNavbar;
