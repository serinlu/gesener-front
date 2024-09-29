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
        console.log(response.data)
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

const logoutUser = async () => {
    try {
        await clientAxios.get('/auth/logout');
    } catch (error) {
        console.error(error);
    }
}

const getProfile = async () => {
    try {
        const response = await clientAxios.get("/auth/profile");
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { loginUser, registerUser, getProfile, logoutUser };
