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
    try {
        const response = await clientAxios.get('/brands');

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al obtener las marcas:', error);
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