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
    const [sortBy, setSortBy] = useState('name'); // Campo por el que ordenar
    const [order, setOrder] = useState('asc'); // Orden ascendente o descendente

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
                    sortBy, // Incluir el campo de orden
                    order, // Incluir el tipo de orden
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
    }, [selectedCategories, selectedBrands, priceRange, searchQuery, page, sortBy, order]);

    const handleSortChange = (e) => {
        const value = e.target.value;
        const [field, direction] = value.split('-');
        setSortBy(field);
        setOrder(direction);
        setPage(1); // Reiniciar a la primera página al cambiar el orden
    };

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

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange([0, 50000]);
        setPage(1);
        setSearchQuery('');
    }

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
                        className={`flex items-center text-xl font-semibold mb-6 transition-all duration-300 justify-between ${hasScrolled ? 'mt-16' : 'mt-0'
                            }`}
                    >
                        <h1>Filtros</h1>
                        <Button
                            className={`text-sm border-2 rounded-lg ${selectedCategories.length === 0 &&
                                selectedBrands.length === 0 &&
                                priceRange[0] === 0 &&
                                priceRange[1] === 50000 &&
                                searchQuery === ""
                                ? "cursor-not-allowed opacity-50"
                                : ""
                                }`}
                            onClick={clearFilters}
                            disabled={
                                selectedCategories.length === 0 &&
                                selectedBrands.length === 0 &&
                                priceRange[0] === 0 &&
                                priceRange[1] === 50000 &&
                                searchQuery === ""
                            }
                        >
                            Limpiar
                        </Button>
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
                                {selectedCategories.length > 0 && (
                                    <span className="text-white bg-blue-500 rounded-full px-2 text-xs">
                                        {selectedCategories.length}
                                    </span>
                                )}
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
                                            checked={selectedCategories.includes(category._id)} // Depende del estado
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
                                {selectedBrands.length > 0 && (
                                    <span className="text-white bg-blue-500 rounded-full px-2 text-xs">
                                        {selectedBrands.length}
                                    </span>
                                )}
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
                                            checked={selectedBrands.includes(brand._id)} // Depende del estado
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
                                {(priceRange[0] !== 0 || priceRange[1] !== 50000) && (
                                    <span className="text-white bg-blue-500 rounded-full px-2 text-xs">
                                        {priceRange[0]} - {priceRange[1]}
                                    </span>
                                )}
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
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 py-3 bg-gray-100 items-center justify-center xl:px-2">
                                <div className="flex flex-col items-center sm:items-start">
                                    <label className="text-sm">Min</label>
                                    <input
                                        type="number"
                                        min={0}
                                        max={50000}
                                        value={priceRange[0]}
                                        onChange={(e) => handlePriceChange(e.target.value, priceRange[1])}
                                        className="border border-gray-300 p-2 w-full sm:w-20 2xl:w-24"
                                    />
                                </div>
                                <span className="hidden sm:block">-</span>
                                <div className="flex flex-col items-center sm:items-start">
                                    <label className="text-sm">Máx</label>
                                    <input
                                        type="number"
                                        min={0}
                                        max={50000}
                                        value={priceRange[1]}
                                        onChange={(e) => handlePriceChange(priceRange[0], e.target.value)}
                                        className="border border-gray-300 p-2 w-full sm:w-20 2xl:w-24"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Productos */}
                <div className="w-full sm:w-3/4 lg:w-4/5 p-4">
                    <div>
                        <div className="text-4xl pb-4 font-bold">Productos</div>

                        {/* Contenedor para ordenar */}
                        <div className="mb-4 w-full flex justify-end">
                            <div className="w-auto flex items-center space-x-3">
                                <h3 className="font-medium">Ordenar por</h3>
                                <select
                                    className="border border-gray-300 p-2"
                                    value={`${sortBy}-${order}`}
                                    onChange={handleSortChange}
                                >
                                    <option value="name-asc">Nombre (A-Z)</option>
                                    <option value="name-desc">Nombre (Z-A)</option>
                                    <option value="price-asc">Precio (Menor a Mayor)</option>
                                    <option value="price-desc">Precio (Mayor a Menor)</option>
                                </select>
                            </div>
                        </div>

                        {/* Contenedor de los productos */}
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
                                    <div className="w-full">No hay productos que coincidan con los filtros seleccionados.</div>
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
        </div>
    );
};

export default Product;
