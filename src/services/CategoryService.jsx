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
        const response = await fetch(`http://localhost/3000/api/categories/${categoryId}`);
        return await response.json();
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
    }
}

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

const updateCategory = async (category) => {
    try {
        const response = await fetch(`http://localhost:3000/api/categories/${category.id}`, {
            method: 'PUT',
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
        console.error('Error al actualizar la categoría:', error);
    }
}

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