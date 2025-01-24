import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { getCategories } from '@/services/CategoryService';
import { getBrands } from '@/services/BrandService';
import { getFilteredProducts } from '@/services/ProductService';
import { useCart } from '@/hooks/useCart';
import { Helmet } from 'react-helmet-async';
import { ProductCard } from '@/components/ProductCard';
import Pagination from '@/components/dashboard-pages/Pagination';
import { motion } from 'framer-motion'; // Importar framer-motion
import { FaAngleRight } from 'react-icons/fa';
import clsx from 'clsx';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { addToCart, removeFromCart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [categoriesRes, brandsRes] = await Promise.all([getCategories(), getBrands()]);
                setCategories(categoriesRes);
                setBrands(brandsRes);
            } catch (error) {
                console.error('Error al cargar categorías o marcas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            setLoading(true);
            try {
                const [minPrice, maxPrice] = priceRange;
                const data = await getFilteredProducts({
                    categories: selectedCategories,
                    brands: selectedBrands,
                    priceRange: [minPrice, maxPrice],
                    searchQuery: searchQuery.trim(),
                    page,
                });
                setProducts(data.products);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error al obtener productos filtrados:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFilteredProducts();
    }, [selectedCategories, selectedBrands, priceRange, searchQuery, page]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter((id) => id !== categoryId)
                : [...prevSelected, categoryId]
        );
        setPage(1);
    };

    const handleBrandChange = (brandId) => {
        setSelectedBrands((prevSelected) =>
            prevSelected.includes(brandId)
                ? prevSelected.filter((id) => id !== brandId)
                : [...prevSelected, brandId]
        );
        setPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    const handlePriceChange = (min, max) => {
        setPriceRange([Number(min), Number(max)]);
        setPage(1);
    };

    const handleAddToCart = (product) => {
        if (product.countInStock === 0) {
            alert('Este producto está agotado.');
            return;
        }
        addToCart(product);
    };

    const accordionVariants = {
        open: { opacity: 1, height: 'auto', transition: { duration: 0.4 } },
        closed: { opacity: 0, height: 0, transition: { duration: 0.4 } }
    };

    const arrowVariants = {
        open: { rotate: 270 },
        closed: { rotate: 90 }
    };

    const [categoryAccordionOpen, setCategoryAccordionOpen] = useState(false);
    const [brandAccordionOpen, setBrandAccordionOpen] = useState(false);
    const [priceAccordionOpen, setPriceAccordionOpen] = useState(false);

    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Detectar si el scroll es mayor a 100px (puedes ajustar este valor)
            if (window.scrollY > 100) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <Helmet>
                <title>Catálogo de productos | Gesener</title>
                <meta name="description" content="Explora el catálogo de productos." />
            </Helmet>
            <div className="flex w-full mt-8">
                {/* Menú de Filtros en el lado izquierdo */}
                <div className="w-full sm:w-1/4 lg:w-1/5 p-4 bg-white border-r border-gray-300 sticky top-0 h-screen overflow-y-auto">
                    <div
                        className={`text-xl font-semibold mb-6 transition-all duration-300 ${hasScrolled ? 'mt-16' : 'mt-0'
                            }`}
                    >
                        Filtros
                    </div>

                    {/* Categorías */}
                    <div className="mb-4">
                        <h3 className="font-medium mb-2">Buscar</h3>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Buscar productos..."
                                className="border border-gray-300 p-2 w-full pr-10" // Espacio para el botón
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="cursor-pointer mx-auto" onClick={() => setCategoryAccordionOpen(!categoryAccordionOpen)}>
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
                            className="overflow-hidden mx-auto"
                        >
                            <div className="p-4 border bg-gray-50">
                                {categories.map((category) => (
                                    <label key={category._id} className="block mb-2">
                                        <input
                                            type="checkbox"
                                            value={category._id}
                                            onChange={() => handleCategoryChange(category._id)}
                                            className="mr-2"
                                        />
                                        {category.name}
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Marcas */}
                    <div>
                        <div className="cursor-pointer mx-auto" onClick={() => setBrandAccordionOpen(!brandAccordionOpen)}>
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
                            className="overflow-hidden mx-auto"
                        >
                            <div className="p-4 border bg-gray-50">
                                {brands.map((brand) => (
                                    <label key={brand._id} className="block mb-2">
                                        <input
                                            type="checkbox"
                                            value={brand._id}
                                            onChange={() => handleBrandChange(brand._id)}
                                            className="mr-2"
                                        />
                                        {brand.name}
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Rango de precio */}
                    <div className="mb-4">
                        <div className="cursor-pointer mx-auto" onClick={() => setPriceAccordionOpen(!priceAccordionOpen)}>
                            <motion.div
                                initial={false}
                                animate={priceAccordionOpen ? 'open' : 'closed'}
                                className={clsx("flex items-center justify-between p-2 bg-gray-200 h-12", priceAccordionOpen ? "rounded-none" : "rounded-b-lg")}
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
                            className={clsx("overflow-hidden mx-auto", priceAccordionOpen ? "rounded-b-lg" : "rounded-none")}
                        >
                            <div className="flex space-x-2 py-3 bg-gray-100 items-center justify-center">
                                <input
                                    type="number"
                                    min={0}
                                    max={50000}
                                    value={priceRange[0]}
                                    onChange={(e) => handlePriceChange(e.target.value, priceRange[1])}
                                    className="border border-gray-300 p-2 w-24"
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    min={0}
                                    max={50000}
                                    value={priceRange[1]}
                                    onChange={(e) => handlePriceChange(priceRange[0], e.target.value)}
                                    className="border border-gray-300 p-2 w-24"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Búsqueda */}
                </div>

                {/* Productos */}
                <div className="w-full sm:w-3/4 lg:w-4/5 p-4">
                    {loading ? (
                        <div>Cargando productos...</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                        onRemoveFromCart={removeFromCart}
                                    />
                                ))
                            ) : (
                                <div className="text-center">No hay productos que coincidan con los filtros seleccionados.</div>
                            )}
                        </div>
                    )}

                    {/* Paginación */}
                    <Pagination
                        totalPages={totalPages}
                        currentPage={page}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Product;
