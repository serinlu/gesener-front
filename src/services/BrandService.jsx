import axios from 'axios';
import clientAxios from '@/config/axios';

const createBrand = async (form) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.post('/brands/create', form, config);
        return response.data
    } catch (error) {
        console.error('Error al crear la marca:', error);
    }
}

const getBrands = async () => {
    const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const response = await clientAxios.get('/brands', config)
            return response.data; // Retorna la lista de productos obtenidos del backend
        } catch (error) {
            console.error('Error al obtener las marcas:', error);
            return []; // Retorna un array vacío en caso de error para evitar errores en el frontend
        }
}

const getBrand = async (brandId) => {
    try {
        const response = await clientAxios.get(`/brands/${brandId}`);
        return await response.json();
    } catch (error) {
        console.error('Error al obtener la marca:', error);
    }
}

const updateBrand = async (id, form) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.put(`/brands/${id}`, form, config);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la marca:', error);
    }
};

const deleteBrand = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.delete(`/brands/${id}`, config);
        return response.data
    } catch (error) {
        console.error('Error al eliminar la marca:', error);
    }
}

export {
    createBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand
};