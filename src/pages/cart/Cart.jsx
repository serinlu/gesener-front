import React, { useContext, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import CartPageItem from './CartPageItem';
import { Button } from '@nextui-org/react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Helmet } from 'react-helmet-async';

const Cart = () => {
    const { cart, clearCart, addToCart, removeFromCart, removeItemUnitFromCart, setItemQuantity } = useCart();
    const { auth } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const calculateSubtotal = () => {
        const subTotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
        return subTotal
    };

    const envio = cart.length === 0 ? 0 : 7;
    const total = calculateSubtotal() + envio;

    const handleExplore = () => {
        navigate('/products');
    };

    const handleFinishPurchase = () => {
        if (!auth) {
            setIsModalOpen(true); // Si no está logueado, abrir el modal
            localStorage.setItem('lastVisited', window.location.pathname); // Guardar la URL actual
        } else {
            // Si el usuario está autenticado
            const totalPedido = total;

            // Guardar el objeto en el localStorage
            localStorage.setItem('total', totalPedido);
            localStorage.setItem('envio', envio);
            localStorage.setItem('subtotal', calculateSubtotal());

            // Redirigir a la página de checkout
            navigate('/checkout/user-info');
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div>
            <Helmet>
                <title>Carrito | Gesener</title>
            </Helmet>
            <div className='mx-auto my-8'>
                <h1 className='text-3xl font-bold'>Carrito</h1>
            </div>
            <div className='flex mx-auto my-8 space-x-4 justify-between'>
                <div className='w-2/3'>
                    {cart.length === 0 ? (
                        <>
                            <h1 className='text-xl'>Tu carrito está vacío. Comienza a explorar nuestro catálogo.</h1>
                            <Button className='text-white bg-blue-600 rounded-lg py-2 mt-3 font-bold' onClick={handleExplore}>
                                Explora la tienda
                            </Button>
                        </>
                    ) : (
                        <>
                            <div className='grid grid-cols-6 text-gray-600 text-base border-b py-2'>
                                <div></div>
                                <h1>Producto</h1>
                                <h1>Precio</h1>
                                <h1>Cantidad</h1>
                                <h1>Subtotal</h1>
                                <div></div>
                            </div>

                            {/* Productos en el carrito */}
                            {cart.map((product) => (
                                <CartPageItem
                                    key={product._id}
                                    {...product} // Desestructura las propiedades del producto
                                    addToCart={() => addToCart(product)}
                                    removeFromCart={() => removeFromCart(product)}
                                    removeItemUnitFromCart={() => removeItemUnitFromCart(product)}
                                    setItemQuantity={setItemQuantity} // Pasar la función directamente
                                />
                            ))}

                            {/* Resumen de pedido */}
                            <div className='mt-6'>
                                <div className='space-y-4 mt-4'>
                                    <Button
                                        className='bg-red-600 text-white font-semibold py-2 px-4 rounded-lg'
                                        onClick={clearCart}
                                    >
                                        Vaciar carrito
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className='border-1 rounded-lg p-4 w-1/3'>
                    <h1 className='text-xl font-bold pb-1'>Resumen de tu compra</h1>
                    <div className='p-3 grid grid-cols-2 grid-rows-3 text-xl'>
                        <h1>Subtotal</h1>
                        <h1 className='font-bold'>${calculateSubtotal().toFixed(2)}</h1>
                        <h1>Envío</h1>
                        <h1 className='font-bold'>${envio.toFixed(2)}</h1>
                        <h1>Total</h1>
                        <h1 className='font-bold'>${total.toFixed(2)}</h1>
                    </div>
                    <Button
                        className={clsx(`text-xl font-bold text-white rounded-3xl items-center w-full ${cart.length > 0 ? 'bg-blue-600' : 'bg-blue-300'}`)}
                        disabled={cart.length === 0}
                        onClick={handleFinishPurchase}
                    >
                        Finalizar compra
                    </Button>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-1/3">
                        <div className="p-4 border-b">
                            <h2 className="text-2xl font-bold">Iniciar sesión</h2>
                        </div>
                        <div className="p-4">
                            <p className="text-lg">Debes iniciar sesión para finalizar tu compra.</p>
                        </div>
                        <div className="p-4 border-t flex justify-end space-x-2">
                            <Button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleLoginRedirect}>
                                Iniciar sesión
                            </Button>
                            <Button className="bg-gray-300 text-black px-4 py-2 rounded-md" onClick={() => setIsModalOpen(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
