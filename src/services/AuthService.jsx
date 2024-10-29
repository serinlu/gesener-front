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

const updateUser = async (id, form) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await clientAxios.put(`/users/${id}`, form, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { loginUser, registerUser, getUserById, updateUser };
