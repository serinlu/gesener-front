import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';
import { Button } from '@nextui-org/react';
import { updateUser } from '../../services/AuthService';
import clientAxios from '@/config/axios'

const ResetPassword = () => {
    const { token } = useParams();  // Obtener el token de la URL
    const [form, setForm] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(true); // Para verificar si el token es válido
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga

    useEffect(() => {
        // Verificar si el token es válido
        const verifyToken = async () => {
            try {
                const response = await axios.get(`/recover-password/verify-reset-token/${token}`);
                if (!response) {
                    setIsTokenValid(false);
                    navigate('/login'); // Redirigir al login si el token no es válido
                }
            } catch (error) {
                setError('El token es inválido o ha expirado');
                setIsTokenValid(false);
            }
        };

        verifyToken();
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (form.newPassword !== form.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            // Enviar solicitud al backend para cambiar la contraseña
            const response = await clientAxios.put(`/recover-password/reset-password/${token}`, {
                password: form.newPassword // Cambiado a "password" para coincidir con el backend
            });

            // Redirigir al login si la contraseña se actualizó correctamente
            if (response.status === 200) {
                console.log('Contraseña cambiada correctamente');
                setSuccess(true);
                setLoading(false);
                setError(null)
            }
        } catch (error) {
            console.error(error);
            setError('Hubo un error al intentar cambiar la contraseña. Por favor, intenta nuevamente.');
            setLoading(false);
            setSuccess(false)
        }
    };

    const handleReturn = () => {
        navigate('/login')
    }

    if (!isTokenValid) {
        return <div>El enlace de recuperación no es válido o ha expirado.</div>;
    }

    return (
        <div>
            <div className={`${success && 'hidden'}`}>
                <div className='flex w-full justify-center my-6'>
                    <h2 className='text-xl'>Restablecer Contraseña</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        <TextField
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                            label="Nueva contraseña"
                            required
                            className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                            size="small"
                        />
                        <TextField
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            label="Confirma tu nueva contraseña"
                            required
                            className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                            size="small"
                        />
                    </div>
                    <Button type='submit' className={`bg-blue-500 text-white font-bold rounded-lg w-full my-4 ${loading ? 'bg-blue-400' : ''}`}>{loading ? 'Procesando' : 'Restablecer ontraseña'}</Button>
                </form>
                {error && <p>{error}</p>}
            </div>
            <div className={`'w-full flex-col mx-auto py-4 space-y-4 ${success ? 'flex' : 'hidden'}`}>
                <h1 className='flex text-lg justify-center'>Contraseña actualizada correctamente</h1>
                <Button onClick={handleReturn} className='w-full bg-blue-500 text-white rounded-lg font-bold flex mx-auto'>Iniciar sesión</Button>
            </div>
        </div>
    );
};

export default ResetPassword;
