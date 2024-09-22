const createProduct = async (product) => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al crear el producto:', error);
    }
}

const getProducts = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/products');

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

const getProductsByCategory = async (categoryId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/products/category/${categoryId}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
    }
};

const getProductById = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al obtener el producto:', error);
    }
}

const updateProduct = async (product) => {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}

export {
    createProduct,
    getProducts,
    getProductsByCategory,
    getProductById,
    updateProduct,
    deleteProduct
};