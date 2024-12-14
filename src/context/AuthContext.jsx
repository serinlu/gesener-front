import { createContext, useEffect, useState } from 'react';
import { getProfile } from '@/services/UserService';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/AuthService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null); // Estado para manejar errores
	const navigate = useNavigate();

	useEffect(() => {
		const autenticarUsuario = async () => {
			setLoading(true);
			try {
				const user = await getProfile();
				if (user) {
					setAuth({ isAuthenticated: true, user: user.data });
				} else {
					setAuth({ isAuthenticated: false, user: null });
				}
			} catch (err) {
				console.error("Error al autenticar usuario:", err);
				setError("No se pudo autenticar al usuario. Por favor, intenta nuevamente.");
				setAuth({ isAuthenticated: false, user: null });
			} finally {
				setLoading(false);
			}
		};

		autenticarUsuario();
	}, []);

	const logout = () => {
		logoutUser();
		setAuth({ isAuthenticated: false, user: null });
		setLoading(false);
		navigate('/login');
	};

	return (
		<AuthContext.Provider value={{ auth, setAuth, logout, loading, setLoading }}>
			{loading ? (
				<div className="loading-container">Cargando...</div> // Indicador de carga personalizable
			) : error ? (
				<div className="error-container">{error}</div> // Muestra el error si existe
			) : (
				children
			)}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
