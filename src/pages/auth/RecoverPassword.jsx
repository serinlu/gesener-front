import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../uploads/logo.png'; // Asegúrate de ajustar la ruta de la imagen

const RecoverPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario
    console.log('Email:', email);
    // Aquí podrías hacer una solicitud para recuperar la contraseña
  };

  return (
    <>
      <div>
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
    </>
  );
};

export default RecoverPassword;
