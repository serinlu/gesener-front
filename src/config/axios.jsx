import axios from "axios";

const clientAxios = axios.create({
    baseURL: import.meta.env.REACT_APP_VITE_BACKEND_URL + '/api',
    withCredentials: true,
});

export default clientAxios;