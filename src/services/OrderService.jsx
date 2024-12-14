import clientAxios from "@/config/axios";

export const createOrder = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await clientAxios.post('/orders/create-order', data, config);

        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getOrderByUser = async (userId) => {
    try {
        const response = await clientAxios.get(`/orders/getOrderByUser/${userId}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getLastOrderByUser = async (userId) => {
    try {
        const response = await clientAxios.get(`/orders/getLastOrderByUser/${userId}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}