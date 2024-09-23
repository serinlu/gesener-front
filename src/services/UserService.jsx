import axios from "axios";
import clientAxios from "../config/axios";

const loginUser = async (form) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Usa clientAxios con la ruta relativa
        const response = await clientAxios.post('/auth/login', form, config);

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const registerUser = async (form) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await clientAxios.post('/auth/register', form, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { loginUser, registerUser };