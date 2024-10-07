// Cart.tsx
import React from 'react';
import { Button } from '@nextui-org/react';
import { FaXmark } from 'react-icons/fa6';
import clsx from 'clsx';
import { useCart } from '../hooks/useCart'; // Asegúrate de importar correctamente tu hook de carrito
import CartItem from './CartItem'; // Componente para cada producto del carrito

const Cart = ({ isCartOpen, toggleCart, handleExplore }) => {
    const { cart, clearCart, addToCart, removeFromCart } = useCart();

    const calculateSubtotal = () => {
        return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    };

    return (
        <>
            {/* Fondo oscuro con transición de opacidad */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500",
                    { 'opacity-0 pointer-events-none': !isCartOpen, 'opacity-100': isCartOpen }
                )}
                onClick={toggleCart}
            ></div>

            {/* Menú del carrito que se desplaza de derecha a izquierda */}
            <div
                className={clsx(
                    "fixed top-0 right-0 h-full w-[75%] md:w-[40%] lg:w-[30%] bg-white shadow-lg z-50 transform transition-transform duration-500",
                    { 'translate-x-full': !isCartOpen, 'translate-x-0': isCartOpen }
                )}
            >
                <div className="flex justify-between items-center p-6 h-[10%] border-b">
                    <h1 className="font-bold text-xl">Tu carrito</h1>
                    <Button onClick={toggleCart}>
                        <FaXmark className="text-2xl" />
                    </Button>
                </div>

                {/* Contenido del carrito */}
                <div className="flex flex-col justify-center items-center h-[75%] border-b overflow-y-auto">
                    {cart.length === 0 ? (
                        <>
                            <h1 className="text-center mb-4">Tu carrito está vacío</h1>
                            <Button
                                className="bg-indigo-500 text-white font-bold rounded-xl px-6 py-2"
                                onClick={handleExplore}
                            >
                                Explora la tienda
                            </Button>
                        </>
                    ) : (
                        <ul className="w-full p-4">
                            {cart.map((product) => (
                                <CartItem
                                    key={product._id}
                                    addToCart={() => addToCart(product)}
                                    removeFromCart={() => removeFromCart(product)}
                                    removeItem={() => removeItem(product._id)}
                                    {...product}
                                />
                            ))}
                        </ul>
                    )}
                </div>

                {/* Subtotal y botón para finalizar compra */}
                {cart.length > 0 && (
                    <div className="space-y-2 items-center py-5">
                        <div className="flex justify-between items-center mx-6 text-xl">
                            <h1>Subtotal</h1>
                            <h1 className="text-red-500 font-semibold">${calculateSubtotal().toFixed(2)}</h1>
                        </div>
                        <Button className="w-[90%] flex mx-auto bg-indigo-600 rounded-lg">
                            <h1 className="my-2 text-white font-semibold">Finalizar compra</h1>
                        </Button>
                        <Button
                            className="w-[90%] flex mx-auto bg-red-600 rounded-lg mt-4"
                            onClick={clearCart}
                        >
                            <h1 className="my-2 text-white font-semibold">Vaciar carrito</h1>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
