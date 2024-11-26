import React from 'react'

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { usePayment } from '../../context/PaymentContext';
import { generatePayment } from '../../services/PaymentService';
initMercadoPago('TEST-8166d9c2-d8dd-4273-afa6-77b668c4864b'), { locale: 'es-PE' };


const Payment = () => {
    const { formData } = usePayment();

    const preferenceId = async () => {
        // const response = await generatePayment(formData._id);
        const response = await generatePayment("6745082a387a066708f4eb46");
        console.log(response)
    }

    return (
        <>
            <p>Pagar con Mercado Pago</p>
            <div className='w-72'>
                {/* <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} /> */}
                <button
                    className='bg-indigo-500 hover:bg-indigo-600 rounded-lg border-2 py-2 px-4 text-white'
                    onClick={preferenceId}
                >
                    Pagar Prueba
                </button>
            </div>
        </>
    )
}

export default Payment
