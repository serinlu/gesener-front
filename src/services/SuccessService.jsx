import clientAxios from "@/config/axios";

export const createSuccess = async (form) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.post('/success/create', form, config);
        return response.data;
    } catch (error) {
        console.error('Error al crear el caso de éxito:', error);
    }
}

export const getSuccess = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.get('/success', config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los casos de éxito:', error);
    }
}

export const getSuccessById = async (successId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.get(`/success/${successId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el caso de éxito:', error);
    }
}

export const updateSuccess = async (successId, form) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.put(`/success/${successId}`, form, config);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el caso de éxito:', error);
    }
}

export const deleteSuccess = async (successId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.delete(`/success/${successId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el caso de éxito:', error);
    }
}