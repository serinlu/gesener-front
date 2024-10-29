import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = () => {
    return <ToastContainer />;
};

// Función para mostrar alertas de éxito
export const showSuccessAlert = (message) => {
    toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

// Función para mostrar alertas de error
export const showErrorAlert = (message) => {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

// Puedes agregar más funciones para otros tipos de alerta si es necesario

export default Alert;
