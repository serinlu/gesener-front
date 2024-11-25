import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/AuthService';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        lastname: '',
        companyName: '',
        socialReason: '',
        tipoDocumento: '',
        numDoc: '',
        phone: '',
        postalCode: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'natural',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(form);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return (
        <>
            <div>
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-500">Crea tu cuenta y agiliza tus compras</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex w-full justify-center mb-4 mx-auto">
                        <div className="space-y-4 w-full">
                            <div className="sm:flex justify-between sm:space-x-2 space-y-4 sm:space-y-0 w-full">
                                <div class="flex flex-col-reverse sm:w-1/2">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        htmlFor="name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                        placeholder="Nombre"
                                        class="peer outline-none ring px-4 py-1 h-12 border-0 rounded-lg ring-neutral-200 duration-500 focus:ring-2 focus:border-neutral-100 relative placeholder:duration-500 placeholder:absolute placeholder: focus:placeholder:pt-10 text-xs shadow-xl shadow-neutral-400/10 focus:shadow-none focus:rounded-md focus:ring-blue-600 placeholder:text-neutral-400 placeholder:"
                                    />
                                    <span
                                        class="duration-500 opacity-0 mb-2 peer-focus:opacity-100 text-neutral-500 text-xs -translate-y-12 peer-focus:translate-y-0"
                                        onClick={'peer ring'}
                                    >
                                        Nombre
                                    </span>
                                </div>
                                <div class="flex flex-col-reverse sm:w-1/2">
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        value={form.lastname}
                                        onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                                        required
                                        placeholder="Apellidos"
                                        class="peer outline-none ring px-4 py-1 h-12 border-0 rounded-lg ring-neutral-200 duration-500 focus:ring-2 focus:border-neutral-100 relative placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 text-xs shadow-xl shadow-neutral-400/10 focus:shadow-none focus:rounded-md focus:ring-blue-600 placeholder:text-neutral-400"
                                    />
                                    <span
                                        class="duration-500 opacity-0 mb-2 peer-focus:opacity-100 text-neutral-500 text-xs -translate-y-12 peer-focus:translate-y-0"
                                    >
                                        Apellidos
                                    </span>
                                </div>
                            </div>
                            <div class="flex flex-col-reverse w-full">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                    placeholder="Correo electrónico"
                                    class="peer outline-none ring px-4 py-1 h-12 border-0 rounded-lg ring-neutral-200 duration-500 focus:ring-2 focus:border-neutral-100 relative placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 text-xs shadow-xl shadow-neutral-400/10 focus:shadow-none focus:rounded-md focus:ring-blue-600 placeholder:text-neutral-400"
                                />
                                <span
                                    class="duration-500 opacity-0 mb-2 peer-focus:opacity-100 text-neutral-500 text-xs -translate-y-12 peer-focus:translate-y-0"
                                >
                                    Correo electrónico
                                </span>
                            </div>
                            <div class="flex flex-col-reverse w-full">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    placeholder="Contraseña"
                                    class="peer outline-none ring px-4 py-1 h-12 border-0 rounded-lg ring-neutral-200 duration-500 focus:ring-2 focus:border-neutral-100 relative placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 text-xs shadow-xl shadow-neutral-400/10 focus:shadow-none focus:rounded-md focus:ring-blue-600 placeholder:text-neutral-400"
                                />
                                <span
                                    class="duration-500 opacity-0 mb-2 peer-focus:opacity-100 text-neutral-500 text-xs -translate-y-12 peer-focus:translate-y-0"
                                >
                                    Contraseña
                                </span>
                            </div>
                            <div class="flex flex-col-reverse w-full">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    placeholder="Repetir Contraseña"
                                    class="peer outline-none ring px-4 py-1 h-12 border-0 rounded-lg ring-neutral-200 duration-500 focus:ring-2 focus:border-neutral-100 relative placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 text-xs shadow-xl shadow-neutral-400/10 focus:shadow-none focus:rounded-md focus:ring-blue-600 placeholder:text-neutral-400"
                                />
                                <span
                                    class="duration-500 opacity-0 mb-2 peer-focus:opacity-100 text-neutral-500 text-xs -translate-y-12 peer-focus:translate-y-0"
                                >
                                    Repetir Contraseña
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 rounded-md mt-6 hover:bg-indigo-700"
                            >
                                Registrar
                            </button>
                        </div>
                    </div>
                </form>
                <p className="mt-4 text-center">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Iniciar sesión
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Register;
