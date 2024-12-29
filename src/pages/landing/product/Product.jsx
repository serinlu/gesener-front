import React, { useState, useEffect, useId, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProducts } from '@/services/ProductService';
import { getCategories } from '@/services/CategoryService';
import { getBrands } from '@/services/BrandService';
import { Button } from '@nextui-org/react';
import { useCart } from '@/hooks/useCart';
import ProductFilters from '@/components/ProductFilters';
import { Helmet } from 'react-helmet-async';
import Cart from '@/components/Cart';
import debounce from "lodash.debounce";
import clientAxios from '@/config/axios';
import { ProductCard } from '@/components/ProductCard'

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
    const [cartItems, setCartItems] = useState([]);

    //estados para la busqueda de productos
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState({
        products: []
    });
    const [error, setError] = useState(null);

    const [categoryAccordionOpen, setCategoryAccordionOpen] = useState(false);
    const [brandAccordionOpen, setBrandAccordionOpen] = useState(false);
    const [priceAccordionOpen, setPriceAccordionOpen] = useState(false);
    const [minPrice, setMinPrice] = useState(0); // Valor mínimo del slider
    const [maxPrice, setMaxPrice] = useState(50000); // Valor máximo del slider
    const [priceRange, setPriceRange] = useState([0, 50000]); // Rango actual (min y max)
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [filtrosMenu, setFiltrosMenu] = useState(false)
    const searchRef = useRef(null)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        // const [productsRes, categoriesRes, brandsRes] = await Promise.all([getProducts(), getCategories(), getBrands()]);
        const productsRes = await getProducts();
        console.log(productsRes)
        const categoriesRes = await getCategories();
        console.log(categoriesRes)
        const brandsRes = await getBrands();
        console.log(brandsRes)
        setProducts(productsRes);
        setCategories(categoriesRes);
        setBrands(brandsRes);
        setFilteredProducts(productsRes);
        setLoading(false);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen); // Alterna el estado de apertura del carrito
    };

    const fetchSearchResults = debounce(async (query) => {
        if (!query) {
            setFilteredProducts(products); // Si no hay búsqueda, muestra todos los productos
            console.log("Consulta vacía, resultados mostrados nuevamente.");
            return;
        }

        console.log("Buscando productos con query:", query);
        setLoading(true);
        setError(null);

        try {
            // Filtrar los productos ya obtenidos por el nombre del producto
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );

            setFilteredProducts(filtered); // Actualiza el estado de productos filtrados
        } catch (err) {
            console.error("Error al buscar productos:", err);
            setError('Error al buscar. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    }, 300);


    const handleResultSelect = () => {
        setSearchQuery(null);
    }

    const clearSearchQuery = () => {
        fetchSearchResults();
        setSearchQuery('');
        fetchData()
    }

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchSearchResults(query); // Realiza la búsqueda sobre los productos ya cargados
    };

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


    const { addToCart, removeFromCart } = useCart()

    const handleAddToCart = (product) => {
        // Validaciones antes de llamar a addToCart
        if (product.countInStock === 0) {
            alert("Este producto está agotado.");
            return;
        }

        const existingItem = cartItems.find(item => item._id === product._id); // cartItems viene de useCart() o un contexto global.

        if (existingItem) {
            if (existingItem.quantity >= product.maxItems) {
                alert(`Has alcanzado el máximo permitido de ${product.maxItems} para este producto.`);
                return;
            }

            if (existingItem.quantity >= product.countInStock) {
                alert("No hay suficiente stock disponible para agregar más unidades.");
                return;
            }
        }

        // Si las validaciones pasan, llama a addToCart del hook
        addToCart(product);
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
                <div ref={searchRef} className="w-full mx-auto flex flex-col items-center md:w-2/3">
                    <h1 className='w-full text-3xl my-4'>Catálogo</h1>
                    <div className='w-full flex items-center justify-between my-4'>
                        <div className='w-2/3 relative'>
                            <input
                                type="text"
                                value={searchQuery}
                                placeholder="Buscar productos por nombre..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => clearSearchQuery()}
                            >
                                ✕
                            </button>
                        </div>
                        <div className='flex items-center'>
                            <h1 className='pr-2'>Ordenar por:</h1>
                            <select className='border py-2 px-2 rounded-lg border-gray-300 focus:outline-none'>
                                <option value="">Seleccione</option>
                                <option value="price-asc">Precio: Menor a Mayor</option>
                                <option value="price-desc">Precio: Mayor a Menor</option>
                                <option value="name-asc">Nombre: A-Z</option>
                                <option value="name-desc">Nombre: Z-A</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <h1>Cargando productos...</h1>
                        </div>
                    ) : (
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.length > 0
                                ? filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                        onRemoveFromCart={() => removeFromCart(product)}
                                        cartItems={cartItems} // Pasa el carrito actual
                                    />
                                ))
                                : (
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
