import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import clsx from "clsx"; // Instala clsx con `npm install clsx`
import { useEffect, useState } from "react";

export const ProductCard = ({ product, onAddToCart, onRemoveFromCart }) => {
    const [cart, setCart] = useState([]);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isOutOfStock = product.countInStock === 0;

    // Buscar la cantidad actual de este producto en el carrito
    const cartItem = cart.find(item => item._id === product._id);
    const currentQuantity = cartItem?.quantity || 0;

    // Verificar si el límite de `maxItems` o el stock han sido alcanzados
    const isMaxReached = currentQuantity >= product.maxItems;
    const disableAddToCart = isOutOfStock || isMaxReached;

    // Cargar el carrito al montar el componente
    useEffect(() => {
        getCart();

        // Escuchar cambios en el localStorage para sincronización
        const handleStorageChange = () => {
            getCart();
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const getCart = () => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(storedCart);

        // Comprobar si el producto actual ya está en el carrito
        const productExists = storedCart.some(item => item._id === product._id);
        setIsAddedToCart(productExists);
    };

    const handleAddToCart = () => {
        if (!disableAddToCart) {
            onAddToCart(product);

            // Actualizar el carrito en `localStorage`
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);
            setIsAddedToCart(true);
        }
    };

    const handleRemoveFromCart = () => {
        const updatedCart = cart.filter(item => item._id !== product._id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
        setIsAddedToCart(false);
        onRemoveFromCart?.(product);
    };

    const handleClick = () => {
        if (isAddedToCart) {
            handleRemoveFromCart();
        } else {
            handleAddToCart();
        }
    };

    return (
        <div
            className="product-card w-full sm:w-auto border rounded-lg p-4 flex flex-col items-center bg-white shadow-md hover:shadow-lg transition-shadow"
        >
            <div className="relative w-full pb-[100%] overflow-hidden rounded-lg mb-4">
                <img
                    src={product.imageUrl || "/images/default-product.png"}
                    alt={product.name || "Producto"}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>
            <div className="w-full text-center">
                <div className="text-sm text-gray-500 mb-2">
                    {product.brand?.name || "Sin marca"}
                </div>
                <Link
                    to={`/products/${product._id}`}
                    className="text-lg font-bold mb-2 block hover:text-indigo-600"
                >
                    {product.name || "Producto sin nombre"}
                </Link>
                <p className="font-bold mb-4">$ {product.price?.toFixed(2) || "0.00"}</p>

                <div className="w-full">
                    <Button
                        className={clsx(
                            "text-white font-bold w-full py-2 rounded-xl transition",
                            {
                                "bg-indigo-600 hover:bg-indigo-700": !isAddedToCart,
                                "bg-green-500": isAddedToCart && !isHovered,
                                "bg-red-500 hover:bg-red-600": isAddedToCart && isHovered,
                                "bg-gray-300 cursor-not-allowed hover:bg-gray-00": disableAddToCart && !isAddedToCart,
                            }
                        )}
                        onClick={handleClick}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        disabled={disableAddToCart && !isAddedToCart}
                    >
                        {isOutOfStock
                            ? "Sin stock"
                            : isAddedToCart
                            ? isHovered
                                ? "Eliminar del carrito"
                                : "Agregado al carrito"
                            : "Agregar"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
