import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById, getUserFromCookie, loginUser } from '../services/AuthService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Estado para manejar la autenticación
  const navigate = useNavigate();

  useEffect(() => {
    const loadAuthFromCookie = async () => {
      try {
        const userData = await getUserFromCookie(); // Función para obtener el usuario desde la cookie
        if (userData) {
          setAuth(userData);
        }
      } catch (error) {
        console.error('Error al obtener el usuario desde la cookie:', error);
      }
    };
    loadAuthFromCookie();
  }, []);

  const login = async (form) => {
    try {
      const response = await loginUser(form); // Asegúrate de que `loginUser` maneje la cookie
      if (response && response.data) {
        setAuth(response.data); // Establece el usuario autenticado en el estado
        navigate('/'); // Redirige a la página deseada
      }
    } catch (error) {
      console.error('Error en el login:', error);
    }
  };

  const logout = () => {
    setAuth(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
