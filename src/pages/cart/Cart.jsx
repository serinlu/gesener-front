import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import CartPageItem from './CartPageItem';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';

const cart = () => {
    const { cart, clearCart, addToCart, removeFromCart, removeItemUnitFromCart, setItemQuantity } = useCart();

    const calculateSubtotal = () => {
        return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    };

    const envio = cart.length === 0 ? 0 : 7;

    const total = calculateSubtotal() + envio;
    console.log(total);

    const handleExplore = () => {
        window.location.href = '/products'; // Redirecciona a la página principal
    };

    return (
        <>
            <div className='w-[80%] mx-auto my-8'>
                <h1 className='text-3xl font-bold'>Carrito</h1>
            </div>
            <div className='flex w-[80%] mx-auto my-8 space-x-4 justify-between'>
                <div className='w-2/3'>
                    {cart.length === 0 ? (
                        <>
                            <h1 className='text-xl'>Tu carrito está vacío. Comienza a explorar nuestro catálogo.</h1>
                            <Button className='text-white bg-blue-600 rounded-lg py-2 mt-3 font-bold' onClick={handleExplore}>Explora la tienda</Button>
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
                                    <button
                                        className='bg-red-600 text-white font-semibold py-2 px-4 rounded-lg'
                                        onClick={clearCart}
                                    >
                                        Vaciar carrito
                                    </button>
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
                        <h1 className='font-bold'>$
                            {envio.toFixed(2)}
                        </h1>
                        <h1>Total</h1>
                        <h1 className='font-bold'>${(calculateSubtotal() + envio).toFixed(2)}</h1>
                    </div>
                    <Button
                        className={clsx(`text-xl font-bold text-white rounded-3xl p-2 w-full ${cart.length > 0 ? 'bg-blue-600' : 'bg-blue-300'}`)}
                        disabled={cart.length === 0}
                    >
                        Finalizar compra
                    </Button>
                </div>
            </div>
        </>
    );
};

export default cart;
