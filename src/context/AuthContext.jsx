import { createContext, useEffect, useState } from 'react';
import { getProfile } from '@/services/UserService';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/AuthService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);
	const [loading, setLoading] = useState(true); // Inicializa en `true` para mostrar el estado de carga inicial
	const navigate = useNavigate();

	useEffect(() => {
		const autenticarUsuario = async () => {
			try {
				setLoading(true); // Asegúrate de activar el estado de carga
				const user = await getProfile();
				setAuth(user.data);
				console.log("Usuario autenticado:", user.data);
			} catch (error) {
				console.error("Error al autenticar usuario:", error);
				setAuth(null);
			} finally {
				setLoading(false); // Finaliza el estado de carga
			}
		};
		autenticarUsuario();
	}, []); // El array vacío evita el ciclo infinito

	const logout = () => {
		logoutUser();
		setAuth(null);
		// Opcional: redirige y recarga la página
		navigate('/');
		setTimeout(() => {
			window.location.reload();
		}, 200);
	};

	return (
		<AuthContext.Provider value={{ auth, setAuth, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
