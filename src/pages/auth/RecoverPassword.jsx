import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import clientAxios from '@/config/axios'

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // Mensaje de respuesta
  const [error, setError] = useState(''); // Mensaje de error
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Enviamos la solicitud de recuperación de contraseña
      const response = await clientAxios.post('/recover-password/send-reset-email', { email });

      // Si el email es encontrado y el correo se envía correctamente
      setMessage(response.data.message);
      setError('');
      setEmailSent(true)
      setLoading(false)
    } catch (err) {
      // Manejo de errores
      setError(err.response?.data?.message || 'Error al enviar el correo de recuperación');
      setMessage('');
      setEmailSent(false)
      setLoading(false)
    }
  };

  return (
    <>
      <div className={`${emailSent && 'hidden'}`}>
        <h2 className="text-3xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <TextField
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Correo electrónico"
              required
              className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
              size="small"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading && 'bg-indigo-400 hover:bg-indigo-400'}`}
          >
            {loading ? 'Procesando' : 'Enviar enlace de recuperación'}
          </button>

          {/* Mostrar mensaje de éxito o error */}
          {message && <div className="text-green-600 mt-2">{message}</div>}
          {error && <div className="text-red-600 mt-2">{error}</div>}

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
      {emailSent && (
        <div className="text-center mt-6">
          <p className='pb-4'>
            Hemos enviado un enlace de recuperación a tu correo electrónico. Verifica tu bandeja de entrada y sigue las instrucciones para cambiar tu contraseña.
          </p>
          <div className="space-x-8 justify-between mx-2">
            <Link to="/login" className="text-indigo-600 hover:underline">
              Iniciar sesión
            </Link>
            <Link to="/register" className="text-indigo-600 hover:underline">
              Crear cuenta
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default RecoverPassword;
