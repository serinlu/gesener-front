import clientAxios from "../config/axios";

const createNew = async (form) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.post('/news/create', form, config);
        return response.data;
    } catch (error) {
        console.error('Error al crear la noticia:', error);
    }
}

const getNews = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.get('/news', config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las noticias:', error);
    }
}

const getNewById = async (newId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.get(`/news/${newId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la noticia:', error);
    }
}

const updateNew = async (newId, form) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.put(`/news/${newId}`, form, config);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la noticia:', error);
    }
}

const deleteNew = async (newId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.delete(`/news/${newId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la noticia:', error);
    }
}

export { createNew, getNews, getNewById, updateNew, deleteNew };