import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../../uploads/1.jpg'; // Asegúrate de ajustar la ruta de la imagen

const RecoverPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario
    console.log('Email:', email);
    // Aquí podrías hacer una solicitud para recuperar la contraseña
  };

  return (
    <div className="min-h-screen flex">
      {/* Sección del formulario */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
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
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enviar enlace de recuperación
            </button>
            <div className="flex justify-between mx-2">
              <Link to="/login" className="text-indigo-600 hover:underline">
                Iniciar sesión
              </Link>
              <Link to="/register" className="text-indigo-600 hover:underline">
                Crear cuenta
              </Link>
            </div>
          </form>
        </div>
      </div>
      {/* Sección de la imagen con fade */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center relative">
        <img src={loginImage} alt="Login" className="w-full h-full object-cover" />
        {/* Degradado de fade */}
        <div className="absolute inset-0 bg-gradient-to-l from-white/0 to-white"></div>
      </div>
    </div>
  );
};

export default RecoverPassword;
