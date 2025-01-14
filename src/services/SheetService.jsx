import clientAxios from '@/config/axios';

export const uploadSheet = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    try {
        const response = await clientAxios.post('/leasings/sheets/uploadSheet', formData, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const listSheets = async (page = 1, pageSize = 12) => {
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
        const response = await clientAxios.get('/leasings/sheets/listSheets', config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const listAllSheets = async () => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    try {
        const response = await clientAxios.get('/leasings/sheets/listAllSheets', config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteSheet = async (sheetName) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.delete(`/leasings/sheets/deleteSheet/${sheetName}`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}