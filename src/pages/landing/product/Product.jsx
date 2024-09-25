import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../../../services/ProductService';
import { getCategories } from '../../../services/CategoryService';
import { getBrands } from '../../../services/BrandService';
import { motion } from 'framer-motion';
import { FaAngleRight } from 'react-icons/fa6';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';

const accordionVariants = {
    open: {
        opacity: 1,
        height: 'auto',
        transition: { duration: 0.4 }
    },
    closed: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.4 }
    }
};

const arrowVariants = {
    open: { rotate: 270 },
    closed: { rotate: 90 }
};

const Product = () => {
    const { categoryId } = useParams();
    const { brandId } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [categoryAccordionOpen, setCategoryAccordionOpen] = useState(false);
    const [brandAccordionOpen, setBrandAccordionOpen] = useState(false);
    const [priceAccordionOpen, setPriceAccordionOpen] = useState(false);

    // Fetch productos y categorías
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [productsRes, categoriesRes, brandsRes] = await Promise.all([getProducts(), getCategories(), getBrands()]);
            setProducts(productsRes);
            setCategories(categoriesRes);
            setBrands(brandsRes);
            setLoading(false);
        };
        fetchData();
    }, []);

    // Filtra productos basados en las categorías seleccionadas manualmente
    useEffect(() => {
        if (selectedCategories.length > 0) {
            const filtered = products.filter(product =>
                product.categories.some(category => selectedCategories.includes(category._id))
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [selectedCategories, products]);

    useEffect(() => {
        console.log(products); // Verifica la estructura de product
        if (selectedBrands.length > 0) {
            const filtered = products.filter(product =>
                selectedBrands.includes(product.brand._id)
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [selectedBrands, products]);
    


    // Función para manejar el cambio de categoría
    const handleCategoryChange = (categoryId) => {
        setLoading(true); // Muestra el spinner cuando se selecciona una categoría
        setSelectedCategories(prevSelected =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter(id => id !== categoryId)
                : [...prevSelected, categoryId]
        );
        setTimeout(() => setLoading(false), 500); // Simulando tiempo de carga
    };

    const handleBrandChange = (brandId) => {
        setLoading(true); // Muestra el spinner cuando se selecciona una marca
        setSelectedBrands(prevSelected =>
            prevSelected.includes(brandId)
                ? prevSelected.filter(id => id !== brandId)
                : [...prevSelected, brandId]
        );
        setTimeout(() => setLoading(false), 500); // Simulando tiempo de carga
    };

    // Función para limpiar todos los filtros activos
    const clearFilters = () => {
        if (selectedCategories.length === 0) {
            if (selectedBrands.length === 0) return; // Si no hay marcas seleccionadas, no hace
        } // Si no hay categorías seleccionadas, no hace
        setLoading(true); // Muestra el spinner mientras se limpia
        setSelectedCategories([]); // Resetea las categorías seleccionadas
        setSelectedBrands([]); // Resetea las marcas seleccionadas
        setFilteredProducts(products); // Restablece todas las marcas
        setTimeout(() => setLoading(false), 500); // Simulando tiempo de carga
    };

    const toggleCategoryAccordion = () => {
        setCategoryAccordionOpen(prevState => !prevState); // Cambia el estado del acordeón
    };

    const toggleBrandAccordion = () => {
        setBrandAccordionOpen(prevState => !prevState); // Cambia el estado del acordeón
    };

    const togglePriceAccordion = () => {
        setPriceAccordionOpen(prevState => !prevState); // Cambia el estado del acordeón
    };

    return (
        <div className="flex py-10 w-[90%] space-x-4">
            {/* Sidebar con el acordeón */}
            <div className="w-1/3 p-4">
                <div className='flex justify-between w-[75%] mx-auto items-center pb-4'>
                    <h1 className='text-lg'>Filtros</h1>
                    <Button className='border-1 border-gray-300 rounded-md' onClick={clearFilters}>
                        Limpiar
                    </Button>
                </div>
                {/* Acordeón de Categorías */}
                <div className="cursor-pointer w-[75%] mx-auto" onClick={toggleCategoryAccordion}>
                    <motion.div
                        initial={false}
                        animate={categoryAccordionOpen ? 'open' : 'closed'}
                        className="flex items-center justify-between p-2 bg-gray-200 rounded-t-lg h-12"
                    >
                        <h3 className="font-bold text-md pl-2">Categorías</h3>
                        <motion.span
                            variants={arrowVariants}
                            animate={categoryAccordionOpen ? 'open' : 'closed'}
                            transition={{ duration: 0.3 }}
                            className="text-xl"
                        >
                            <FaAngleRight />
                        </motion.span>
                    </motion.div>
                </div>
                <motion.div
                    variants={accordionVariants}
                    initial={false}
                    animate={categoryAccordionOpen ? 'open' : 'closed'}
                    className="overflow-hidden w-[75%] mx-auto"
                >
                    <div className="p-4 border bg-gray-50">
                        {categories.map((category) => (
                            <div key={category._id} className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    id={category._id}
                                    checked={selectedCategories.includes(category._id)}
                                    onChange={() => handleCategoryChange(category._id)}
                                    className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                />
                                <label htmlFor={category._id} className="text-gray-700">
                                    {category.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Acordeón de Marcas */}
                <div className="cursor-pointer w-[75%] mx-auto" onClick={toggleBrandAccordion}>
                    <motion.div
                        initial={false}
                        animate={brandAccordionOpen ? 'open' : 'closed'}
                        className="flex items-center justify-between p-2 bg-gray-200 h-12"
                    >
                        <h3 className="font-bold text-md pl-2">Marcas</h3>
                        <motion.span
                            variants={arrowVariants}
                            animate={brandAccordionOpen ? 'open' : 'closed'}
                            transition={{ duration: 0.3 }}
                            className="text-xl"
                        >
                            <FaAngleRight />
                        </motion.span>
                    </motion.div>
                </div>
                <motion.div
                    variants={accordionVariants}
                    initial={false}
                    animate={brandAccordionOpen ? 'open' : 'closed'}
                    className="overflow-hidden w-[75%] mx-auto"
                >
                    <div className="p-4 border bg-gray-50">
                        {brands.map((brand) => (
                            <div key={brand._id} className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    id={brand._id}
                                    checked={selectedBrands.includes(brand._id)}
                                    onChange={() => handleBrandChange(brand._id)}
                                    className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                />
                                <label htmlFor={brand._id} className="text-gray-700">
                                    {brand.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Acordeón de Precio */}
                <div className="cursor-pointer w-[75%] mx-auto" onClick={togglePriceAccordion}>
                    <motion.div
                        initial={false}
                        animate={priceAccordionOpen ? 'open' : 'closed'}
                        className={clsx(
                            'flex items-center justify-between p-2 bg-gray-200 h-12',
                            priceAccordionOpen ? 'rounded-none' : 'rounded-b-lg'
                        )}
                    >
                        <h3 className="font-bold text-md pl-2">Precio</h3>
                        <motion.span
                            variants={arrowVariants}
                            animate={priceAccordionOpen ? 'open' : 'closed'}
                            transition={{ duration: 0.3 }}
                            className="text-xl"
                        >
                            <FaAngleRight />
                        </motion.span>
                    </motion.div>
                </div>
                <motion.div
                    variants={accordionVariants}
                    initial={false}
                    animate={priceAccordionOpen ? 'open' : 'closed'}
                    className="overflow-hidden w-[75%] mx-auto"
                >
                    <div className="p-4 border rounded-b-lg bg-gray-50">
                        price
                    </div>
                </motion.div>
            </div>

            {/* Contenido principal con los productos */}
            <div className="w-2/3">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <h1>Cargando productos...</h1>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product._id} className="border rounded-lg p-4">
                                    <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                                    <p className="text-gray-600 mb-2">{product.description}</p>
                                    <p className="font-bold">{product.price} €</p>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <h1>No se encontraron productos.</h1>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
