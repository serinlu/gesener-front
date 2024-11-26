import clientAxios from "../config/axios"

export const generatePayment = async (orderId) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await clientAxios.post(`/order/generate-payment/${orderId}`, config);

        return response;
    } catch (error) {

    }
}