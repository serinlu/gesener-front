import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../uploads/logo.png"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
      {/* Sección del formulario */}
      <div className="flex-1 flex justify-center bg-white p-8">
        <div className="w-full max-w-lg">
          <div className="w-full mb-32 mt-12 flex justify-center">
            <Link to="/">
              <img src={logo} className='w-96'></img>
            </Link>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Iniciar sesión
              </button>
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
        </div>
      </div>

    </>
  );
};

export default Login;
