import { AuthContext } from '@/context/AuthContext';
import { getProfile } from '@/services/UserService';
import { TextField } from '@mui/material';
import { Button } from '@nextui-org/react';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/AuthService';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  // const [loading, setLoading] = useState(false);

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      const response = await loginUser(form);
      if (!response) {
        console.log("error al iniciar sesión");
        return;
      }
      // const user = await getProfile();
      // console.log("Respuesta de Profile", user)
      console.log("Respuesta de Login", {isAuthenticated: true, user: response.user})
      setAuth({isAuthenticated: true, user: response.user});

      const lastVisited = localStorage.getItem('lastVisited');
      if (lastVisited) {
        localStorage.removeItem('lastVisited');
        navigate(lastVisited);
      } else {
        navigate('/');
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='space-y-4'>
            <div className="relative space-y-4">
              <TextField
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                label="Correo electrónico"
                required
                className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                size="small"
              />
              <TextField
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                label="Contraseña"
                required
                className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                size="small"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {/* {loading ? 'Cargando...' : 'Iniciar sesión'} */}
            Iniciar sesión
          </Button>
          <div className="flex justify-between mx-2">
            <Link to="/register" className="text-indigo-600 hover:underline">
              Crear cuenta
            </Link>
            <Link to="/recover-password" className="text-indigo-600 hover:underline">
              Recuperar contraseña
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
