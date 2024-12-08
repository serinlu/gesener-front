import React, { useEffect, useState } from 'react'

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { usePayment } from '@/context/PaymentContext';
import { generatePreference } from '../../services/PaymentService';

const Payment = () => {
    const { formData, orderData, loadingOrder } = usePayment();
    const [preferenceId, setPreferenceId] = useState(null);

    useEffect(() => {
        const createPreferenceId = async () => {
            if (!orderData) {
                console.error("orderData no está inicializado.");
                return;
            }
    
            try {
                console.log(orderData._id); // Verificar que _id esté disponible
                // const orderByUserId = await getOrderById(orderData._id?.toString());
                // console.log(orderByUserId);
    
                const response = await generatePreference(orderData._id);
                console.log(response);
    
                setPreferenceId(response.data.id);
    
                initMercadoPago('TEST-8166d9c2-d8dd-4273-afa6-77b668c4864b', { locale: 'es-PE' });
            } catch (error) {
                console.error("Error al crear la preferencia:", error);
            }
        };
    
        if (!loadingOrder) {
            createPreferenceId();
        }
    }, [orderData, loadingOrder]);

    return (
        <>
            <p>Pagar con Mercado Pago</p>
            <div className='w-72'>
                    <Wallet initialization={{ preferenceId: preferenceId, redirectMode: 'modal' }} customization={{ texts: { valueProp: 'smart_option' } }} locale='es-PE' />
            </div>
        </>
    )
}

export default Payment
