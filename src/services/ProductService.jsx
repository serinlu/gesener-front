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
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.get(`/products/${id}`, config);
        return response.json
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