import { createContext, useEffect, useState } from 'react';
import { getProfile } from '../services/UserService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const autenticarUsuario = async () => {
			
			try {
				const user = await getProfile();
				setAuth(user.data);
				console.log(auth)
			} catch (error) {
				console.error(error);
			}
		}
		autenticarUsuario();
	}, []);

	const logout = () => {
		logoutUser();
		setAuth({});
		navigate('/');
	};

	return (
		<AuthContext.Provider value={{ auth, setAuth, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
