import React, { useEffect } from 'react'
import { usePayment } from '../../context/PaymentContext'
import { verifyPayment } from '../../services/PaymentService'

const PurchaseComplete = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('payment_id');

    useEffect(() => {
        const handlePaymentSuccess = async () => {
            try {
                // Verifica el estado del pago con tu backend
                const verificationResponse = await verifyPayment(paymentId);
                return verificationResponse;
            } catch (error) {
                console.error('Error al verificar el pago:', error);
            }
        };

        handlePaymentSuccess()
    }, [])

    return (
        <div>Compra realizada con exito</div>
    )
}

export default PurchaseComplete