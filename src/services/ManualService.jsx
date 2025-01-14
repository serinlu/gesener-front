import clientAxios from '@/config/axios';

export const uploadManual = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    try {
        const response = await clientAxios.post('/leasings/manuals/uploadManual', formData, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const listManuals = async (page = 1, pageSize = 12) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        params: {
            page,
            pageSize,
        },
    }
    try {
        const response = await clientAxios.get('/leasings/manuals/listManuals', config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const listAllManuals = async () => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    try {
        const response = await clientAxios.get('/leasings/manuals/listAllManuals', config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteManual = async (manualName) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.delete(`/leasings/manuals/deleteManual/${manualName}`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}