import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutStages = () => {
    const location = useLocation();

    const getCurrentStage = () => {
        switch (location.pathname) {
            case '/checkout/cart':
                return 0; // Carrito
            case '/checkout/user-info':
                return 1; // Datos de facturación
            case '/checkout/payment':
                return 2; // Pago
            case '/checkout/confirmation':
                return 3; // Confirmación
            default:
                return 0; // Ruta desconocida o antes de empezar
        }
    };

    const stages = [
        { label: 'Carrito', key: 'cart' },
        { label: 'Datos de facturación', key: 'user-info' },
        { label: 'Pago', key: 'payment' },
        { label: 'Confirmación', key: 'confirmation' }
    ];

    const currentStage = getCurrentStage();

    const isCompleted = (index) => index <= currentStage;

    return (
        <div className='flex justify-between w-[90%] mx-auto gap-4 my-10'>
            {stages.map((stage, index) => (
                <React.Fragment key={stage.key}>
                    {index > 0 && (
                        <div
                            className={`flex items-center h-1 w-[80%] mx-auto mt-5 transform ${isCompleted(index) ? 'bg-blue-600' : 'bg-gray-300'}`}
                        ></div>
                    )}
                    <div className='flex flex-col items-center'>
                        <div
                            className={`rounded-full w-10 h-10 flex z-10 items-center justify-center ${isCompleted(index) ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                        >
                            {index + 1}
                        </div>
                        <span className={`text-center mt-1 ${isCompleted(index) ? 'text-blue-600' : ''}`}>{stage.label}</span>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default CheckoutStages;
