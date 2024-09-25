import axios from 'axios';
import clientAxios from '../config/axios';

const createBrand = async (brand) => {
    try {
        const response = await fetch('http://localhost:3000/api/brands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(brand),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al crear la marca:', error);
    }
}

const getBrands = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/brands');

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
        const response = await fetch(`http://localhost/3000/api/brands/${brandId}`);
        return await response.json();
    } catch (error) {
        console.error('Error al obtener la marca:', error);
    }
}

const updateBrand = async (brand) => {
    try {
        const response = await fetch(`http://localhost:3000/api/brands/${brand.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar la marca:', error);
    }
}

const deleteBrand = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/brands/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
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