import clientAxios from "@/config/axios";

const createProduct = async (form) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.post('/products/create', form, config)
        return response.data
    } catch (error) {
        console.error('Error al crear el producto:', error);
    }
}

export const createProductsFromExcel = async (file) => {
    const formData = new FormData()
    formData.append('file', file);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    try {
        const response = await clientAxios.post('/products/upload/excel', formData, config);
        return response.data;
    } catch (error) {
        console.error('Error al cargar productos desde el archivo Excel:', error);
        throw error; // Opcional: Lanzar el error para manejarlo en el componente
    }
}

const getProducts = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.get('/products', config)
        return response.data; // Retorna la lista de productos obtenidos del backend
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return []; // Retorna un array vacío en caso de error para evitar errores en el frontend
    }
};

const getProductById = async (id) => {
    try {
        const response = await clientAxios.get(`/products/${id}`);
        return response.data
    } catch (error) {
        console.error('Error al obtener el producto:', error);
    }
}

const updateProduct = async (id, form) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.put(`/products/${id}`, form, config);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
    }
}

const deleteProduct = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.delete(`/products/${id}`, config);
        return response.data; // Retorna la respuesta del backend para confirmar la eliminación del producto
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};