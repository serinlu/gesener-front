import React from 'react';
import { useCart } from '../../hooks/useCart';

const cart = () => {
    const { cart, clearCart, addToCart, removeFromCart } = useCart();

    const calculateSubtotal = () => {
        return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    };

    return (
        <div className='w-[80%] mx-auto my-8'>
            <h1 className='text-3xl font-bold mb-6'>Carrito</h1>

            {cart.length === 0 ? (
                <h1>Tu carrito está vacío</h1>
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
                        <div key={product._id} className='grid grid-cols-6 items-center py-4 border-b'>
                            {/* Imagen del producto */}
                            <img
                                src={product.image}
                                alt={product.name}
                                className='w-16 h-16 object-cover'
                            />

                            {/* Nombre del producto */}
                            <h1 className='text-gray-700'>{product.name}</h1>

                            {/* Precio */}
                            <h1 className='text-gray-700'>$ {product.price}</h1>

                            {/* Cantidad con botones para aumentar y disminuir */}
                            <div className='flex items-center'>
                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    className='px-2 py-1 bg-gray-200 rounded-l'
                                >
                                    -
                                </button>
                                <span className='px-4'>{product.quantity}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className='px-2 py-1 bg-gray-200 rounded-r'
                                >
                                    +
                                </button>
                            </div>

                            {/* Subtotal (precio x cantidad) */}
                            <h1 className='text-gray-700'>
                                $ {(product.price * product.quantity).toFixed(2)}
                            </h1>

                            {/* Botón de quitar producto */}
                            <button
                                onClick={() => removeFromCart(product._id)}
                                className='text-red-600 hover:text-red-800'
                            >
                                Quitar
                            </button>
                        </div>
                    ))}

                    {/* Resumen de pedido */}
                    <div className='mt-6'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl'>Subtotal</h1>
                            <h1 className='text-red-500 font-semibold'>${calculateSubtotal().toFixed(2)}</h1>
                        </div>

                        <div className='space-y-4 mt-4'>
                            <button className='bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg'>
                                Finalizar compra
                            </button>
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
    );
};

export default cart;
