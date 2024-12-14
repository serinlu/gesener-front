import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLastOrderByUser } from '../../services/OrderService';
import { verifyPayment } from '../../services/PaymentService';
import AnimatedCheckIcon from './AnimatedCheckIcon';

const PurchaseComplete = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('payment_id');
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [envio, setEnvio] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const handlePaymentSuccess = async () => {
            try {
                const verificationResponse = await verifyPayment(paymentId);
                return verificationResponse;
            } catch (error) {
                console.error('Error al verificar el pago:', error);
            }
        };

        handlePaymentSuccess()
    }, [])

    // Obtiene los productos del pedido
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await getLastOrderByUser(auth.user.user._id);
                const orderProducts = response.data.products
                setProducts(orderProducts);
                const newSubTotal = orderProducts.map(product => product.unit_price * product.quantity).reduce((acc, curr) => acc + curr, 0);
                setSubTotal(newSubTotal);
                setTotal(newSubTotal + envio);
            } catch (error) {
                console.error('Error al obtener el pedido:', error);
            }
        };

        fetchOrderData();
    }, [auth, envio]);

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
                        {/* Encabezados alineados con los datos */}
                        <div className='grid grid-cols-4 gap-4 p-2 border-b-1 border-gray-200'>
                            <div></div> {/* Espacio reservado para la imagen */}
                            <h1 className='font-semibold'>Nombre</h1>
                            <h1 className='font-semibold'>Cantidad</h1>
                            <h1 className='font-semibold'>Subtotal</h1>
                        </div>

                        {/* Lista de productos */}
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
    )
}

export default PurchaseComplete