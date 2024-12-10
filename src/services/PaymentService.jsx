import clientAxios from "@/config/axios"

export const generatePreference = async (orderId) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await clientAxios.post(`/orders/generate-preference/${orderId}`, config);

        return response;
    } catch (error) {

    }
}

export const verifyPayment = async (paymentId) => {
    try {
        const response = await clientAxios.post(`/orders/success/${paymentId}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};