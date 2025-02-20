import clientAxios from "@/config/axios";

const getProfile = async () => {
    try {
        const response = await clientAxios.get("/auth/profile");
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getUsers = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await clientAxios.get('/users', config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const checkPassword = async (currentPassword) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // Wrap the password in an object for correct JSON formatting
        const response = await clientAxios.post('/auth/checkPassword', { password: currentPassword }, config);
        return response.data; // El backend devolverá el mensaje de verificación
    } catch (error) {
        console.error(error);
        return null;
    }
};


const changeRole = async (id, form) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await clientAxios.post(`/users/change-role/${id}`, form, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { getProfile, getUsers, checkPassword, changeRole };
