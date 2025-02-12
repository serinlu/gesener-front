import clientAxios from "@/config/axios";

const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('files', file); // Asegúrate de que el campo coincida con el esperado por el backend
    });

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

const getImages = async (page = 1, pageSize = 12) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        params: {
            page,      // Número de la página
            pageSize   // Número de elementos por página
        }
    };
    try {   
        const response = await clientAxios.get('/images', config);
        return response.data; // Asegúrate de que el backend devuelva los datos en el formato correcto
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
    }
};

export const listAllImages = async () => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    try {
        const response = await clientAxios.get('/images/list/all', config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
    }
}

const getImage = async (imageNames) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    try {
        // Si imageNames es un array, ejecuta múltiples solicitudes
        if (Array.isArray(imageNames)) {
            const imageRequests = imageNames.map(async (name) => {
                const response = await clientAxios.get(`/images/${name}`, config);
                return response.data;
            });

            // Espera a que todas las solicitudes de imagen se completen y devuelve los resultados
            return await Promise.all(imageRequests);
        } else {
            // Si no es un array, simplemente trae una imagen
            const response = await clientAxios.get(`/images/${imageNames}`, config);
            return response.data;
        }
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        return null;
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

export { uploadImages, getImages, getImage, deleteImage };
