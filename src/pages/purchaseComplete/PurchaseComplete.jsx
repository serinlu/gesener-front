import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLastOrderByUser, sendEmailOrderByIdSuccessfully } from '@/services/OrderService';
import { verifyPayment } from '@/services/PaymentService';
import AnimatedCheckIcon from './AnimatedCheckIcon';
import { useCart } from '@/hooks/useCart';
import { getProductById, updateProduct } from '@/services/ProductService';

const PurchaseComplete = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('payment_id');
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [envio, setEnvio] = useState(0);
    const [total, setTotal] = useState(0);
    const { clearCart } = useCart();

    // Cargar datos desde localStorage
    useEffect(() => {
        const savedOrder = localStorage.getItem('order_data');
        if (savedOrder) {
            const parsedOrder = JSON.parse(savedOrder);
            setProducts(parsedOrder.products || []);
            setSubTotal(parsedOrder.subTotal || 0);
            setEnvio(parsedOrder.envio || 0);
            setTotal(parsedOrder.total || 0);
        }
    }, []);

    useEffect(() => {
        const handlePaymentSuccess = async () => {
            try {
                const paymentProcessed = sessionStorage.getItem(`payment_${paymentId}`);
                if (paymentProcessed) {
                    console.log('El pago ya fue procesado anteriormente.');
                    return;
                }

                const verificationResponse = await verifyPayment(paymentId);

                if (verificationResponse.data && verificationResponse.data.order) {
                    await sendEmailOrderByIdSuccessfully(verificationResponse.data.order._id);
                    clearCart();
                } else {
                    console.error('No se pudo verificar el pago.');
                    navigate('/checkout/user-info');
                    return;
                }

                sessionStorage.setItem(`payment_${paymentId}`, 'processed');
            } catch (error) {
                console.error('Error al verificar el pago:', error);
                navigate('/checkout/user-info');
            }
        };

        handlePaymentSuccess();
    }, [paymentId]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const stockUpdated = sessionStorage.getItem(`stock_updated_${paymentId}`);
                if (stockUpdated) {
                    console.log('El stock ya fue actualizado anteriormente.');
                    return;
                }

                const response = await getLastOrderByUser(auth.user._id);
                const orderProducts = response.data.products;
                const newSubTotal = orderProducts
                    .map(product => product.unit_price * product.quantity)
                    .reduce((acc, curr) => acc + curr, 0);
                const env = localStorage.getItem('envio');
                const envioNumber = env ? parseFloat(env) : 0;

                // Guardar en el estado
                setProducts(orderProducts);
                setSubTotal(newSubTotal);
                setEnvio(envioNumber);
                setTotal(newSubTotal + envioNumber);

                // Guardar en localStorage
                localStorage.setItem(
                    'order_data',
                    JSON.stringify({
                        products: orderProducts,
                        subTotal: newSubTotal,
                        envio: envioNumber,
                        total: newSubTotal + envioNumber,
                    })
                );

                const cartString = localStorage.getItem('cart');
                const cartObject = cartString ? JSON.parse(cartString) : null;

                if (cartObject) {
                    for (const item of cartObject) {
                        try {
                            const productResponse = await getProductById(item._id);
                            const productData = productResponse;

                            const newStock = productData.countInStock - item.quantity;
                            if (newStock < 0) {
                                console.log(`El stock del producto ${productData.name} no es suficiente.`);
                                continue;
                            }

                            await updateProduct(item._id, { countInStock: newStock });
                            console.log(`Stock actualizado para ${productData.name}: ${newStock}`);
                        } catch (error) {
                            console.error(`Error al procesar el producto con ID ${item._id}:`, error);
                        }
                    }
                }

                sessionStorage.setItem(`stock_updated_${paymentId}`, 'true');
                clearCart()
            } catch (error) {
                console.error('Error al obtener el pedido:', error);
            }
        };

        fetchOrderData();

        // Limpiar localStorage al salir de la página
        return () => {
            localStorage.removeItem('order_data');
        };
    }, [auth, paymentId]);

    return (
        <div className='flex flex-col items-center'>
            <AnimatedCheckIcon />
            <h1 className="text-3xl font-semibold text-center mt-6">
                ¡Gracias por tu compra!
            </h1>
            <div className='text-xl'>
                <p className="text-center mt-6">
                    Tu pago ha sido procesado exitosamente.
                </p>
                <p className="text-center">
                    Recibirás un correo electrónico con los detalles de tu compra.
                </p>
            </div>
            <div className='w-4/5 py-8'>
                <h1 className='text-xl text-center font-bold pb-4'>Resumen de la compra</h1>
                <div className='flex gap-20'>
                    <div className='w-full'>
                        <div className='grid grid-cols-4 gap-4 p-2 border-b-1 border-gray-200'>
                            <div></div>
                            <h1 className='font-semibold'>Nombre</h1>
                            <h1 className='font-semibold'>Cantidad</h1>
                            <h1 className='font-semibold'>Subtotal</h1>
                        </div>
                        {products.map((product, index) => (
                            <div key={index} className='grid grid-cols-4 gap-4 items-center p-2'>
                                <img src={product.image_url} alt={product.title} className='w-16 h-16 object-cover' />
                                <h1 className='truncate'>{product.title}</h1>
                                <h1>{product.quantity}</h1>
                                <h1>${(product.unit_price * product.quantity).toFixed(2)}</h1>
                            </div>
                        ))}
                    </div>
                    <div className='w-1/3 text-base text-right mt-4'>
                        <div className='flex justify-between'>
                            <h1 className='font-semibold'>Subtotal:</h1>
                            <h1>${subTotal}</h1>
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='font-semibold'>Envío (valor fijo):</h1>
                            <h1>${envio}</h1>
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='font-bold'>Total:</h1>
                            <h1 className='font-bold text-red-500'>${total}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className='bg-gray-300 hover:bg-gray-200 duration-200 rounded-lg p-4'
                onClick={() => navigate('/orders')}
            >
                Ir a mis ordenes
            </button>
        </div>
    );
};

export default PurchaseComplete;
