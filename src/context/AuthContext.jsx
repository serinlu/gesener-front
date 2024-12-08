import { createContext, useEffect, useState } from 'react';
import { getProfile } from '@/services/UserService';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/AuthService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const autenticarUsuario = async () => {
			try {
				setLoading(true); // Asegúrate de activar el estado de carga
				const user = await getProfile();
				setAuth(user.data);
				setLoading(false);
			} catch (error) {
				console.error("Error al autenticar usuario:", error);
				setAuth(null);
			} finally {
				setLoading(false); // Finaliza el estado de carga
			}
		};
		autenticarUsuario();
	}, []);

	const logout = () => {
		logoutUser();
		setAuth(null);
		setLoading(false);
		navigate('/login');
	};

	// const logout = () => {
	// 	logoutUser();
	// 	setAuth(null);
	// 	// navigate('/');
	// 	// setTimeout(() => {
	// 	// 	window.location.reload();
	// 	// }, 200); // Le das un pequeño retraso para asegurar que el logout se complete
	// };

	return (
		<AuthContext.Provider value={{ auth, setAuth, logout, loading, setLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
