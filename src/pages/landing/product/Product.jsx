import React, { useState, useEffect } from 'react';
import ProductCards from '../../../components/products/productCards';
import ProductSidebar from '../../../components/ProductSidebar';
import { getProducts, getProductsByCategory } from '../../../services/ProductService'; // Asegúrate de importar el servicio correcto
import { useParams } from 'react-router-dom';
import { getCategoryById } from '../../../services/CategoryService';

const Product = () => {
    const { categoryId } = useParams(); // Captura el ID de la categoría de la URL
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState(''); // Estado para almacenar el nombre de la categoría

    useEffect(() => {
        const fetchProducts = async () => {
            if (categoryId) {
                const response = await getProductsByCategory(categoryId);
                setProducts(response);
            }
        };

        const fetchCategoryName = async () => {
            if (categoryId) {
                const category = await getCategoryById(categoryId);
                setCategoryName(category.name);
            }
        };

        fetchProducts();
        fetchCategoryName();
    }, [categoryId]);

    return (
        <div className='flex'>
            <ProductSidebar />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                <h2 className="text-xl font-bold mb-4">Products in {categoryName}</h2>
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCards
                                key={product._id}
                                name={product.name}
                                categories={product.categories}
                                price={product.price}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default Product;
