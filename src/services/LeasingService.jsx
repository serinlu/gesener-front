import clientAxios from '@/config/axios';

export const createLeasing = async (form) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.post('/leasings/create', form, config);
        return response.data;
    } catch (error) {
        console.error('Error al crear el leasing:', error);
    }
}

export const getLeasings = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.get('/leasings', config)
        return response.data;
    } catch (error) {
        console.error('Error al obtener los leasing:', error);
        return [];
    }
}

export const getLeasingById = async (id) => {
    try {
        const response = await clientAxios.get(`/leasings/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el leasing:', error);
    }
}

export const updateLeasing = async (id, form) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.put(`/leasings/${id}`, form, config);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el leasing:', error);
    }
}

export const deleteLeasing = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        await clientAxios.delete(`/leasings/${id}`, config);
    } catch (error) {
        console.error('Error al eliminar el leasing:', error);
    }
}
