import { createContext, useEffect, useState } from 'react';
import { getProfile } from '@/services/UserService';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/AuthService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	console.log(auth)

	useEffect(() => {
		const autenticarUsuario = async () => {
			try {
				const user = await getProfile();
				setAuth(user.data);
				console.log(auth)
			} catch (error) {
				console.error(error);
				setAuth(null);
			} finally {
				setLoading(false);
			}
		}
		autenticarUsuario();
	}, [auth]);

	const logout = () => {
		logoutUser();
		setAuth(null);
		// navigate('/');
		// setTimeout(() => {
		// 	window.location.reload();
		// }, 200); // Le das un pequeño retraso para asegurar que el logout se complete
	};

	return (
		<AuthContext.Provider value={{ auth, setAuth, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
