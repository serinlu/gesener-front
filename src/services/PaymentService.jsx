import clientAxios from "@/config/axios"

export const generatePreference = async (orderId) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await clientAxios.post(`/order/generate-preference/${orderId}`, config);

        return response;
    } catch (error) {

    }
}