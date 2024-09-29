import clientAxios from "../config/axios";

import axios from 'axios';

const loginUser = async (form) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Permite el envío y recepción de cookies
        };

        const response = await clientAxios.post('/auth/login', form, config);
        return response.data; // Devuelve la respuesta
    } catch (error) {
        console.error('Error en la autenticación:', error.response.data);
        return null;
    }
};


const registerUser = async (form) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await clientAxios.post('/auth/register', form, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getUserById = async (userId) => {
    try {
        const response = await clientAxios.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// services/AuthService.js
export const getUserFromCookie = () => {
    return new Promise((resolve, reject) => {
        // Ejemplo simple de lectura de cookie
        const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
        if (userCookie) {
            const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1])); // Decodifica y convierte a objeto
            resolve(userData);
        } else {
            resolve(null);
        }
    });
};


export { loginUser, registerUser, getUserById };
