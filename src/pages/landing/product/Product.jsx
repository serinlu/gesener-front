import React, { useState } from 'react';
import ProductCards from '../../../components/products/productCards';
import ProductSidebar from '../../../components/ProductSidebar';

const Product = () => {
    // Iniciamos el estado con un arreglo que tenga 5 elementos de prueba
    const [cards] = useState(Array(5).fill(0)); // Array con 5 elementos

    return (
        <div className='flex justify-between mx-24'>
            <ProductSidebar />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {/* Renderiza 5 ProductCards */}
                {cards.map((_, index) => (
                    <ProductCards key={index} />
                ))}
            </div>
        </div>
    );
};

export default Product;
