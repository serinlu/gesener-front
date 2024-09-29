import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/AuthService';
import { Input, Radio, RadioGroup } from '@nextui-org/react';

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
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(form);
            console.log(response);
            return response.data;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    };

    return (
        <>
            <div>
                <h2 className="text-3xl font-bold mb-6 text-center">Crear cuenta</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            id="natural"
                            name="userType"
                            value="natural"
                            checked={form.userType === 'natural'}
                            onChange={(e) => setForm({ ...form, userType: e.target.value })}
                            className="mr-2"
                        />
                        <label htmlFor="natural" className="text-sm font-medium text-gray-700">
                            Persona Natural
                        </label>
                        <input
                            type="radio"
                            id="juridica"
                            name="userType"
                            value="juridica"
                            checked={form.userType === 'juridica'}
                            onChange={(e) => setForm({ ...form, userType: e.target.value })}
                            className="ml-4 mr-2"
                        />
                        <label htmlFor="juridica" className="text-sm font-medium text-gray-700">
                            Persona Jurídica
                        </label>
                    </div>

                    {/* Formulario para Persona Natural */}
                    {form.userType === 'natural' && (
                        <>
                            <div className='flex justify-between space-x-2'>
                                <div className="relative w-1/2">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                        className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="name"
                                        className="my-auto mt-2 absolute left-4 -top-1 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Nombre
                                    </label>
                                </div>
                                <div className="relative w-1/2">
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        value={form.lastname}
                                        onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                                        required
                                        className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="lastname"
                                        className="my-auto mt-2 absolute left-4 -top-1 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Apellidos
                                    </label>
                                </div>
                            </div>
                            <div className='flex justify-between space-x-2'>
                                <div className="relative w-1/2">
                                    <input
                                        type="text"
                                        id="tipoDocumento"
                                        name="tipoDocumento"
                                        value={form.tipoDocumento}
                                        onChange={(e) => setForm({ ...form, tipoDocumento: e.target.value })}
                                        required
                                        className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="tipoDocumento"
                                        className="my-auto mt-2 absolute left-4 -top-1 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Tipo de documento
                                    </label>
                                </div>
                                <div className="relative w-1/2">
                                    <input
                                        type="number"
                                        id="numDoc"
                                        name="numDoc"
                                        value={form.numDoc}
                                        onChange={(e) => setForm({ ...form, numDoc: e.target.value })}
                                        required
                                        className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="numDoc"
                                        className="my-auto mt-2 absolute left-4 -top-1 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Nùmero de documento
                                    </label>
                                </div>
                            </div>
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
                            <div className="relative">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    required
                                    className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="confirmPassword"
                                    className="my-auto mt-2 absolute left-4 -top-1 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Confirmar contraseña
                                </label>
                            </div>
                        </>
                    )}

                    {/* Formulario para Persona Jurídica */}
                    {form.userType === 'juridica' && (
                        <>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={form.companyName}
                                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                                    required
                                    className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="companyName"
                                    className="my-auto mt-2 absolute left-4 -top-1 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Nombre de la empresa
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="socialReason"
                                    name="socialReason"
                                    value={form.socialReason}
                                    onChange={(e) => setForm({ ...form, socialReason: e.target.value })}
                                    required
                                    className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="socialReason"
                                    className="my-auto mt-2 absolute left-4 -top-1 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Razòn social
                                </label>
                            </div>
                            <div className='flex space-x-2 justify-between'>
                                <div className="relative w-1/2">
                                    <input
                                        type="text"
                                        id="tipoDocumento"
                                        name="tipoDocumento"
                                        value={form.tipoDocumento}
                                        onChange={(e) => setForm({ ...form, tipoDocumento: e.target.value })}
                                        required
                                        className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="tipoDocumento"
                                        className="my-auto mt-2 absolute left-4 -top-1 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Tipo de documento
                                    </label>
                                </div>
                                <div className="relative w-1/2">
                                    <input
                                        type="number"
                                        id="numDoc"
                                        name="numDoc"
                                        value={form.numDoc}
                                        onChange={(e) => setForm({ ...form, numDoc: e.target.value })}
                                        required
                                        className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="numDoc"
                                        className="my-auto mt-2 absolute left-4 -top-1 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Nùmero de documento
                                    </label>
                                </div>
                            </div>
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
                                    Correo electrònico corporativo
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
                            <div className="relative">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    required
                                    className="mx-auto peer block w-full pt-6 pb-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer-focus:border-indigo-500 peer-focus:-bottom-2"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="confirmPassword"
                                    className="my-auto mt-2 absolute left-4 -top-1 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Confirmar contraseña
                                </label>
                            </div>
                        </>
                    )}

                    <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md mt-6 hover:bg-indigo-700">
                        Registrar
                    </button>
                </form>
                <p className="mt-4 text-center">
                    ¿Ya tienes una cuenta? <Link to="/login" className="text-indigo-600 hover:underline">Iniciar sesión</Link>
                </p>
            </div>
        </>
    );
};

export default Register;
