import clientAxios from "@/config/axios";

export const createOrder = async (order) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await clientAxios.post('/order/create-order', order, config);

        return response;
    } catch (error) {
        console.error(error);
    }
}