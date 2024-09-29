import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getProfile, loginUser } from '../../services/UserService';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  // const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(form);
      navigate('/');
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='space-y-4'>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="my-auto mt-2 absolute left-4 -top-1 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Correo electrónico
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="my-auto mt-2 absolute left-4 -top-1 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Contraseña
              </label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
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
