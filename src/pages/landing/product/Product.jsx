import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { getProducts } from '../../../services/ProductService'; // Asegúrate de tener esta función correctamente implementada
import { getCategories } from '../../../services/CategoryService'; // Servicio para obtener categorías

const Product = () => {
    const { categoryId } = useParams(); // Captura el ID de la categoría de la URL
    const [products, setProducts] = useState([]); // Estado para productos
    const [categories, setCategories] = useState([]); // Estado para categorías
    const [filteredProducts, setFilteredProducts] = useState([]); // Estado para los productos filtrados

    // Obtener productos desde el backend
    const fetchProducts = async () => {
        const response = await getProducts(); // Traemos todos los productos
        if (response && Array.isArray(response)) {
            setProducts(response);
        }
    };

    // Obtener categorías desde el backend
    const fetchCategories = async () => {
        const response = await getCategories(); // Traemos todas las categorías
        if (response && Array.isArray(response)) {
            setCategories(response);
        }
    };

    // Filtrar productos por categoría
    useEffect(() => {
        if (categoryId) {
            const filtered = products.filter(product =>
                product.categories.some(category => category._id === categoryId)
            );
            setFilteredProducts(filtered); // Actualiza los productos filtrados
        } else {
            setFilteredProducts(products); // Si no hay categoría seleccionada, mostrar todos los productos
        }
    }, [categoryId, products]); // Actualizar cuando cambie la categoría o los productos

    // Obtener productos y categorías al montar el componente
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const filterByCategory = (categoryId) => {
        if (categoryId) {
            const filtered = products.filter(product =>
                product.categories.some(category => category._id === categoryId)
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }

    return (
        <div className="flex">
            {/* Sidebar de categorías */}
            <nav className="flex flex-col gap-6 mt-16 px-6">
                <NavLink
                    key="all"
                    to="/products/category/all"
                    className="text-sm font-semibold text-gray-700 hover:text-indigo-500 transition-colors pl-4"
                    onClick={() => filterByCategory(null)} // Mostrar todos los productos
                >
                    Todas las categorías
                </NavLink>
                {categories.map((category) => (
                    <NavLink
                        key={category._id}
                        to={`/products/category/${category.name}`}
                        className="text-sm font-semibold text-gray-700 hover:text-indigo-500 transition-colors pl-4"
                        onClick={() => filterByCategory(category._id)} // Filtrar productos por categoría
                    >
                        {category.name}
                    </NavLink>
                ))}
            </nav>

            {/* Sección de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                <h2 className="text-xl font-bold mb-4">
                    {categoryId
                        ? `Productos en la categoría seleccionada`
                        : 'Todos los productos'}
                </h2>

                {/* Mostrar productos filtrados */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Card key={product._id} className="py-4">
                                <CardBody className="overflow-visible py-2">
                                    <Image
                                        alt={product.name}
                                        className="object-cover rounded-xl"
                                        src={product.imageUrl || "https://via.placeholder.com/270"} // Si no hay imagen, usa un placeholder
                                        width={270}
                                        height={270}
                                    />
                                </CardBody>
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <div className="mt-2">
                                        {product.categories.map((category) => (
                                            <span key={category._id} className="text-sm text-gray-500 mr-2">
                                                {category.name}
                                            </span>
                                        ))}
                                    </div>
                                    <h4 className="font-bold text-large">{product.name}</h4>
                                    <small className="text-default-500">${product.price}</small>
                                </CardHeader>
                            </Card>
                        ))
                    ) : (
                        <p>No hay productos disponibles en esta categoría</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
