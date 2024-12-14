import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser, checkEmailExists } from '@/services/AuthService';
import { TextField } from '@mui/material';
import { Button } from '@nextui-org/react';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const emailCheck = await checkEmailExists({ email: form.email });
            if (emailCheck.exists) {
                setErrorMessage('El correo ya está registrado.');
                setLoading(false);
                return;
            }

            const response = await registerUser(form);
            console.log('Registro exitoso:', response);
            setEmailSent(true);
            setLoading(false);
        } catch (error) {
            console.error('Error al registrar:', error);
            setErrorMessage('Ocurrió un error al registrar. Intenta nuevamente.');
            setLoading(false);
            setEmailSent(false);
        }
    };

    return (
        <div>
            <div className={`flex flex-col items-center ${emailSent && 'hidden'}`}>
                <h2 className="text-3xl font-bold mb-2 text-center text-gray-500">
                    Crea tu cuenta y agiliza tus compras
                </h2>
                <form
                    className="bg-white w-full p-4 rounded-lg flex flex-col gap-y-4 mx-auto"
                    onSubmit={handleSubmit}
                    autoComplete="off" // Desactiva el autocompletado del formulario completo
                >
                    <TextField
                        type="text"
                        id="name"
                        name="register-name" // Nombre único para evitar conflictos de autocompletado
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        label="Nombre"
                        variant="outlined"
                        size="small"
                        autoComplete="off" // Desactiva el autocompletado de este campo
                    />
                    <TextField
                        type="text"
                        id="lastname"
                        name="register-lastname" // Nombre único
                        value={form.lastname}
                        onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                        required
                        label="Apellidos"
                        variant="outlined"
                        size="small"
                        autoComplete="off"
                    />
                    <TextField
                        type="email"
                        id="email"
                        name="register-email" // Nombre único
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        label="Correo electrónico"
                        variant="outlined"
                        size="small"
                        autoComplete="off"
                    />
                    <TextField
                        type="password"
                        id="password"
                        name="register-password" // Nombre único
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                        label="Contraseña"
                        variant="outlined"
                        size="small"
                        autoComplete="new-password" // Indica al navegador que es un campo de nueva contraseña
                    />
                    <TextField
                        type="password"
                        id="confirmPassword"
                        name="register-confirm-password" // Nombre único
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        required
                        label="Confirmar contraseña"
                        variant="outlined"
                        size="small"
                        autoComplete="new-password"
                    />
                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                    )}
                    <Button
                        type="submit"
                        className={`bg-blue-500 text-white hover:bg-blue-600 rounded py-2 px-6 font-bold ${loading && 'hover:bg-blue-500 gb-blue-500'}`}
                    >
                        {loading ? 'Procesando' : 'Registrar'}
                    </Button>
                </form>
                <p className="mt-4 text-center">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Iniciar sesión
                    </Link>
                </p>
            </div>
            {emailSent && (
                <div className="text-center mt-6">
                    <p>
                        Hemos enviado un enlace de activación a tu correo electrónico. Verifica tu bandeja de entrada y sigue las instrucciones para activar tu cuenta.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Register;