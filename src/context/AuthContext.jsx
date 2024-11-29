import { createContext, useEffect, useState } from 'react';
import { getProfile, logoutUser } from '../services/UserService';
import { getUserById } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const autenticarUsuario = async () => {
			try {
				const user = await getProfile();
				setAuth(user.data);
				console.log(auth)
			} catch (error) {
				console.error(error);
				setAuth(null);
			}
		}
		autenticarUsuario();
	}, []);

	const logout = () => {
		logoutUser();
		setAuth(null);
		navigate('/');
		setTimeout(() => {
			window.location.reload();
		}, 200); // Le das un pequeño retraso para asegurar que el logout se complete
	};

	return (
		<AuthContext.Provider value={{ auth, setAuth, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
