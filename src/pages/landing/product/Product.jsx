import React, { useState, useEffect, useId } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProducts } from '../../../services/ProductService';
import { getCategories } from '../../../services/CategoryService';
import { getBrands } from '../../../services/BrandService';
import { motion } from 'framer-motion';
import { FaAngleRight } from 'react-icons/fa6';
import { Button } from '@nextui-org/react';
import { useCart } from '../../../hooks/useCart';
import clsx from 'clsx';
import Cart from '../../../components/Cart';
import ProductFilters from '../../../components/ProductFilters';
import { Helmet } from 'react-helmet-async';

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
    const [minPrice, setMinPrice] = useState(0); // Valor mínimo del slider
    const [maxPrice, setMaxPrice] = useState(50000); // Valor máximo del slider
    const [priceRange, setPriceRange] = useState([0, 50000]); // Rango actual (min y max)
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [filtrosMenu, setFiltrosMenu] = useState(false)

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen); // Alterna el estado de apertura del carrito
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [productsRes, categoriesRes, brandsRes] = await Promise.all([getProducts(), getCategories(), getBrands()]);
            setProducts(productsRes);
            setCategories(categoriesRes);
            setBrands(brandsRes);
            setFilteredProducts(productsRes);
            setLoading(false);
        };
        fetchData();
    }, []);

    // Unificar el filtro por categorías y marcas en un solo efecto
    useEffect(() => {
        let filtered = products;

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product =>
                product.categories.some(category => selectedCategories.includes(category._id))
            );
        }

        if (selectedBrands.length > 0) {
            filtered = filtered.filter(product =>
                selectedBrands.includes(product.brand._id)
            );
        }

        // Filtrar por precio
        filtered = filtered.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        setFilteredProducts(filtered);
    }, [selectedCategories, selectedBrands, priceRange, products]);

    const { addToCart } = useCart()

    const handleAddToCart = (product) => {
        addToCart(product); // Agregar el producto al carrito
        toggleCart(); // Abrir el carrito
    };

    const handleCategoryChange = (categoryId) => {
        setLoading(true);
        setSelectedCategories(prevSelected =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter(id => id !== categoryId)
                : [...prevSelected, categoryId]
        );
        setLoading(false);
    };

    const handleBrandChange = (brandId) => {
        setLoading(true);
        setSelectedBrands(prevSelected =>
            prevSelected.includes(brandId)
                ? prevSelected.filter(id => id !== brandId)
                : [...prevSelected, brandId]
        );
        setLoading(false);
    };

    const clearFilters = () => {
        if (selectedCategories.length === 0 && selectedBrands.length === 0) return;
        setLoading(true);
        setSelectedCategories([]);
        setSelectedBrands([]);
        setMinPrice(0);
        setMaxPrice(50000);
        setFilteredProducts(products);
        setLoading(false);
    };

    const toggleCategoryAccordion = () => {
        setCategoryAccordionOpen(prevState => !prevState);
    };

    const toggleBrandAccordion = () => {
        setBrandAccordionOpen(prevState => !prevState);
    };

    const togglePriceAccordion = () => {
        setPriceAccordionOpen(prevState => !prevState);
    };

    const handleFiltros = () => {
        setFiltrosMenu(!filtrosMenu)
    }

    return (
        <div>
            <Helmet>
                <title>Catálogo de productos | Gesener</title>
                <meta name="description" content="Explora el catálogo de productos." />
            </Helmet>
            <div className='w-[90%] mx-auto mt-8 md:hidden'>
                <Button
                    className='bg-blue-500 text-white font-bold rounded-lg'
                    onClick={handleFiltros}>
                    Filtros

                </Button>
            </div>
            {filtrosMenu && (
                <div onClick={handleFiltros} className="fixed inset-0 bg-black opacity-50 z-20 transition-opacity duration-300 ease-in-out">
                </div>
            )}
            <div className={`fixed top-0 left-0 h-full bg-white w-64 z-30 transform ${filtrosMenu ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <ProductFilters
                    categories={categories}
                    brands={brands}
                    selectedCategories={selectedCategories}
                    selectedBrands={selectedBrands}
                    priceRange={priceRange}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onCategoryChange={handleCategoryChange}
                    onBrandChange={handleBrandChange}
                    onPriceRangeChange={setPriceRange}
                    onClearFilters={clearFilters}
                />
            </div>
            <div className="flex py-10 w-[90%] mx-auto space-x-4 justify-center md:justify-normal">
                {/* Sidebar con el acordeón */}
                <div className="w-1/3 p-2 hidden md:block">
                    <ProductFilters
                        categories={categories}
                        brands={brands}
                        selectedCategories={selectedCategories}
                        selectedBrands={selectedBrands}
                        priceRange={priceRange}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onCategoryChange={handleCategoryChange}
                        onBrandChange={handleBrandChange}
                        onPriceRangeChange={setPriceRange}
                        onClearFilters={clearFilters}
                    />
                </div>

                {/* Contenido principal con los productos */}
                <div className="w-full mx-auto flex flex-col items-center md:w-2/3">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <h1>Cargando productos...</h1>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className="product-card w-full sm:w-auto border rounded-lg p-4 flex flex-col items-center bg-white shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        {/* Contenedor para la imagen */}
                                        <div className="relative w-full pb-[100%] overflow-hidden rounded-lg mb-4">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="absolute top-0 left-0 w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Información del producto */}
                                        <div className="w-full text-center">
                                            <div className="text-sm text-gray-500 mb-2">
                                                {product.brand ? product.brand.name : 'Sin marca'}
                                            </div>

                                            <Link
                                                to={`/products/${product._id}`}
                                                className="text-lg font-bold mb-2 block hover:text-indigo-600"
                                            >
                                                {product.name}
                                            </Link>
                                            <p className="text-gray-600 mb-2">{product.description}</p>
                                            <p className="font-bold mb-4">$ {product.price}</p>

                                            {/* Mostrar las categorías */}
                                            <div className="text-sm text-gray-500 mb-4">
                                                <strong>Categorías: </strong>
                                                {product.categories.length === 0
                                                    ? 'Sin categorizar'
                                                    : product.categories.map((category) => category.name).join(', ')}
                                            </div>

                                            {/* Botón de agregar */}
                                            <div className="w-full">
                                                <Button
                                                    className="bg-indigo-600 text-white font-bold w-full py-2 rounded-xl hover:bg-indigo-700 transition"
                                                    onClick={() => handleAddToCart(product)}
                                                >
                                                    Agregar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center">
                                    <h2>No hay productos disponibles.</h2>
                                </div>
                            )}
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
};

export default Product;
