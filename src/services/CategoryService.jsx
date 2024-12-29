import clientAxios from "@/config/axios";

const getCategories = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.get('/categories', config)
        return response.data; // Retorna la lista de productos obtenidos del backend
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
        return []; // Retorna un array vacío en caso de error para evitar errores en el frontend
    }
}

const getCategoryById = async (categoryId) => {
    try {
        const response = await clientAxios.get(`/categories/${categoryId}`);

        if (!response.ok) {
            throw new Error('Error al obtener la categoría');
        }

        const data = await response.json(); // Convertir la respuesta a JSON
        return data;
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        throw error; // Para manejar el error en el componente
    }
};

const createCategory = async (form) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await clientAxios.post('/categories/create', form, config)
        return response.data;
    } catch (error) {
        console.error('Error al crear la categoría:', error);
    }
}

const updateCategory = async (id, form) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await clientAxios.put(`/categories/${id}`, form, config);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
    }
};


const deleteCategory = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await clientAxios.delete(`/categories/${id}`, config);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
    }
}

export { createCategory, updateCategory, deleteCategory, getCategories, getCategoryById };