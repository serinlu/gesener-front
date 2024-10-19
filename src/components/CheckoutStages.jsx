import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutStages = () => {
    const location = useLocation();

    const getCurrentStage = () => {
        switch (location.pathname) {
            case '/checkout':
                return 0; // Datos de facturación
            case '/payment':
                return 1; // Pago
            case '/confirmation':
                return 2; // Confirmación
            default:
                return 0;
        }
    };

    const stages = [
        { label: 'Carrito', key: 'carrito' },
        { label: 'Datos de facturación', key: 'facturacion' },
        { label: 'Pago', key: 'pago' },
        { label: 'Confirmación', key: 'confirmacion' }
    ];

    const isCompleted = (index) => index <= getCurrentStage();

    return (
        <div className='flex justify-between w-[90%] mx-auto gap-4 my-10'>
            {stages.map((stage, index) => (
                <>
                    {index > 0 && (
                        <div className={`flex items-center h-1 w-[80%] mx-auto mt-5 transform ${isCompleted(index - 1) ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    )}
                    <div key={stage.key} className='flex flex-col items-center'>
                        <div className={`rounded-full w-10 h-10 flex z-10 items-center justify-center ${isCompleted(index - 1) ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                            {index + 1}
                        </div>
                        <span className={`text-center mt-1 ${isCompleted(index - 1) ? 'text-blue-600' : ''}`}>{stage.label}</span>
                    </div>
                </>
            ))}
        </div>
    );
};

export default CheckoutStages;
