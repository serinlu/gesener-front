import clientAxios from "../config/axios";

const getCategories = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/categories');

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
    }
}

const getCategoryById = async (categoryId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`);

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

const createCategory = async (category) => {
    try {
        const response = await fetch('http://localhost:3000/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
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
    try {
        const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
    }
}

export { createCategory, updateCategory, deleteCategory, getCategories, getCategoryById };