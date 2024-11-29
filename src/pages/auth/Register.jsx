import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '@/services/AuthService';
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

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado (recarga de página)
        try {
            const response = await registerUser(form);
            console.log('Registro exitoso:', response.data);
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-500">
                Crea tu cuenta y agiliza tus compras
            </h2>
            <form
                className="bg-white w-full p-4 rounded-lg flex flex-col gap-y-4 mx-auto"
                onSubmit={handleSubmit} // Manejador único aquí
            >
                <TextField
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    label="Nombre"
                    variant="outlined"
                    size="small"
                />
                <TextField
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={form.lastname}
                    onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                    required
                    label="Apellidos"
                    variant="outlined"
                    size="small"
                />
                <TextField
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    label="Correo electrónico"
                    variant="outlined"
                    size="small"
                />
                <TextField
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    label="Contraseña"
                    variant="outlined"
                    size="small"
                />
                <TextField
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    required
                    label="Confirmar contraseña"
                    variant="outlined"
                    size="small"
                />
                <Button
                    type="submit"
                    className="bg-blue-500 text-white hover:bg-blue-600 rounded py-2 px-6 font-bold"
                >
                    Registrar
                </Button>
            </form>
            <p className="mt-4 text-center">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="text-indigo-600 hover:underline">
                    Iniciar sesión
                </Link>
            </p>
        </div>
    );
};

export default Register;
