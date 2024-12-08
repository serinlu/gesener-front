import clientAxios from "@/config/axios";

export const createOrder = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await clientAxios.post('/order/create-order', data, config);

        return response;
    } catch (error) {
        console.error(error);
    }
}