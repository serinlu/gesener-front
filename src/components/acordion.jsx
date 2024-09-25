import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion"; // Asegúrate de instalar framer-motion
import { useParams } from "react-router-dom";
import { getCategories } from "../services/CategoryService";
import { getProducts } from "../services/ProductService";

const Accordion = () => {
    const { categoryId } = useParams(); // Captura el ID de la categoría de la URL
    const [products, setProducts] = useState([]); // Estado para productos
    const [categories, setCategories] = useState([]); // Estado para categorías
    const [filteredProducts, setFilteredProducts] = useState([]); // Estado para los productos filtrados
    const [loading, setLoading] = useState(true); // Estado de carga
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Obtener productos desde el backend
    const fetchProducts = async () => {
        const response = await getProducts();
        if (response && Array.isArray(response)) {
            setProducts(response);
        }
    };

    // Obtener categorías desde el backend
    const fetchCategories = async () => {
        const response = await getCategories();
        if (response && Array.isArray(response)) {
            setCategories(response);
        }
    };

    // Filtrar productos por categoría cuando categoryId cambia
    useEffect(() => {
        if (categoryId) {
            const filtered = products.filter(product =>
                product.categories.some(category => category._id === categoryId)
            );
            setFilteredProducts(filtered); // Actualiza los productos filtrados
        } else {
            setFilteredProducts(products); // Si no hay categoría seleccionada, mostrar todos los productos
        }
    }, [categoryId, products]);

    // Obtener productos y categorías al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchProducts(), fetchCategories()]);
            setLoading(false);
        };
        fetchData();
    }, []);

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

    const handleCategoryChange = (categoryId) => {
        setLoading(true); // Mostrar estado de cargando

        setSelectedCategories(prevSelected =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter(id => id !== categoryId) // Desmarcar
                : [...prevSelected, categoryId] // Marcar
        );

        setTimeout(() => setLoading(false), 500); // Simular tiempo de carga
    };

    const filterByCategory = (categoryId) => {
        if (categoryId) {
            const filtered = products.filter(product =>
                product.categories.some(category => category._id === categoryId)
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    };
    const [openIndex, setOpenIndex] = useState(null); // Estado para manejar el acordeón abierto

    const handleToggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Abrir o cerrar acordeón
    };

    return (
        <div className="w-[80%] mx-auto">
            {/* Acordeón Item 1 */}
            <AccordionItem
                title="Categorías"
                isOpen={openIndex === 0}
                onToggle={() => handleToggleAccordion(0)}
            >
                <div className="p-4 border rounded-lg">
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
            </AccordionItem>

            {/* Acordeón Item 2 */}
            <AccordionItem
                title="Accordion 2"
                isOpen={openIndex === 1}
                onToggle={() => handleToggleAccordion(1)}
            >
                <div className="p-4 border rounded-lg">Contenido 2</div>
            </AccordionItem>

            {/* Acordeón Item 3 */}
            <AccordionItem
                title="Accordion 3"
                isOpen={openIndex === 2}
                onToggle={() => handleToggleAccordion(2)}
            >
                <div className="p-4 border rounded-lg">Contenido 3</div>
            </AccordionItem>
        </div>
    );
};

const AccordionItem = ({ title, isOpen, onToggle, children }) => {
    const contentRef = useRef(null); // Ref para obtener la altura del contenido

    return (
        <div className="border-b">
            <button
                className="flex justify-between w-full p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={onToggle}
            >
                <span>{title}</span>
                {/* Ícono de flecha con rotación basada en el estado de isOpen */}
                <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </motion.span>
            </button>

            {/* Contenido del acordeón con animación de expansión */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: isOpen ? contentRef.current.scrollHeight : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                ref={contentRef}
            >
                <div className="p-4">{children}</div>
            </motion.div>
        </div>
    );
};

export default Accordion;
