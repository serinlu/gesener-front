import clientAxios from "../config/axios";

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    try {
        const response = await clientAxios.post('/images/upload', formData, config)
        return response.data
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error
    }
}

const getImages = async () => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    try {
        const response = await clientAxios.get('/images', config)
        return response.data
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
    }
}

const getImage = async (imageName) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    try {
        // Realiza una solicitud GET con imageName en la URL
        const response = await clientAxios.get(`/images/${imageName}`, config);
        
        // Retorna los datos de la imagen (nombre y URL pública)
        return response.data;
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        return null; // O maneja el error según tu lógica
    }
};

const deleteImage = async (imageName) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    try {
        await clientAxios.delete(`/images/${imageName}`, config)
        return true;
    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        return false;
    }
};

export { uploadImage, getImages, getImage, deleteImage };
