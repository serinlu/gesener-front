import { createContext, useEffect, useState } from "react";
import { getProfile } from "@/services/UserService";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/AuthService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            try {
                const user = await getProfile();
                console.log("Respuesta de Profile", { isAuthenticated: true, user: user.data.user })
                if (user) {
                    setAuth({ isAuthenticated: true, user: user.data.user });
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error al autenticar usuario:", err);
                setAuth({ isAuthenticated: false, user: null });
                setLoading(false);
            }
        };

        autenticarUsuario();
    }, []);

    const logout = () => {
        logoutUser();
        setAuth({ isAuthenticated: false, user: null });
        setLoading(false);
        navigate("/");
    };

    if (loading) {
        return <div>Cargando...</div>; // Indicador de carga personalizable
    }

    return (
        <AuthContext.Provider
            value={{ auth, setAuth, logout, loading, setLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
