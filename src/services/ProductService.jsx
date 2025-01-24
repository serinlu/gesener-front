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

export const getFilteredProducts = async ({ categories = [], brands = [], priceRange = [0, 50000], searchQuery = '', page = 1 }) => {
    try {
        // Validar que priceRange sea un array válido con dos elementos
        const [minPrice, maxPrice] = Array.isArray(priceRange) && priceRange.length === 2
            ? priceRange
            : [0, 50000];

        // Construir los parámetros dinámicamente
        const params = {
            minPrice,
            maxPrice,
            page,
        };

        // Agregar categorías si están definidas
        if (categories.length > 0) {
            params.category = categories.join(','); // Cambiar 'categories' por 'category'
        }

        // Agregar marcas si están definidas
        if (brands.length > 0) {
            params.brand = brands.join(','); // Cambiar 'brands' por 'brand'
        }

        // Agregar búsqueda si está definida
        if (searchQuery.trim()) {
            params.search = searchQuery.trim();
        }

        // Llamar al endpoint
        const { data } = await clientAxios.get('/products/list/filtered', { params });

        // Devolver los datos obtenidos
        return data; // La respuesta debe incluir productos, totalPages y totalProducts
    } catch (error) {
        console.error('Error al obtener productos filtrados:', error);
        throw error; // Relanzar el error para que el frontend lo maneje
    }
};


export const getProductsWithPagination = async (page = 1, pageSize = 12) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        params: {
            page,
            pageSize,
        },
    };
    try {
        const response = await clientAxios.get('/products/list/paginated', config);
        return response.data; // Devuelve los productos paginados
    } catch (error) {
        console.error('Error al obtener productos paginados:', error);
        return { data: [], totalPages: 0 }; // Valores predeterminados en caso de error
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