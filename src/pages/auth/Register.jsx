import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/UserService';

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
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={form.lastname}
                                    onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700">
                                    Tipo de Documento
                                </label>
                                <input
                                    type="text"
                                    id="tipoDocumento"
                                    name="tipoDocumento"
                                    value={form.tipoDocumento}
                                    onChange={(e) => setForm({ ...form, tipoDocumento: e.target.value })}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="numDoc" className="block text-sm font-medium text-gray-700">
                                    Número de Documento
                                </label>
                                <input
                                    type="text"
                                    id="numDoc"
                                    name="numDoc"
                                    value={form.numDoc}
                                    onChange={(e) => setForm({ ...form, numDoc: e.target.value })}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirmar Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </>
                    )}

                    {/* Formulario para Persona Jurídica */}
                    {form.userType === 'juridica' && (
                        <>
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                    Nombre de la Empresa
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={form.companyName}
                                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="socialReason" className="block text-sm font-medium text-gray-700">
                                    Razón Social
                                </label>
                                <input
                                    type="text"
                                    id="socialReason"
                                    name="socialReason"
                                    value={form.socialReason}
                                    onChange={(e) => setForm({ ...form, socialReason: e.target.value })}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700">
                                    Tipo de Documento
                                </label>
                                <input
                                    type="text"
                                    id="tipoDocumento"
                                    name="tipoDocumento"
                                    value={form.tipoDocumento}
                                    onChange={(e) => setForm({ ...form, tipoDocumento: e.target.value })}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="numDoc" className="block text-sm font-medium text-gray-700">
                                    Número de Documento
                                </label>
                                <input
                                    type="text"
                                    id="numDoc"
                                    name="numDoc"
                                    value={form.numDoc}
                                    onChange={(e) => setForm({ ...form, numDoc: e.target.value })}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Correo Electrónico Corporativo
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirmar Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
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
