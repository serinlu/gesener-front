import { useState } from 'react';
import CheckoutStages from '../../components/CheckoutStages';

const Checkout = () => {
    const [factureChecked, setFactureChecked] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        empresa: '',
        pais: 'Perú',
        direccion: '',
        direccionOpcional: '',
        poblacion: '',
        region: '',
        codigoPostal: '',
        telefono: '',
        correoElectronico: '',
        notas: '',
        enviarDireccionDiferente: false,
        ruc: '',
        razonSocial: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Aquí puedes manejar el envío de los datos
    };

    const handleFacture = () => {
        setFactureChecked(!factureChecked);
    };

    return (
        <div className='w-[80%] mx-auto mb-8'>
            <CheckoutStages />
            <div className='my-8 text-3xl font-bold'>
                Detalles de facturación
            </div>
            <div className='flex space-x-4'>
                <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre *</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Apellidos *</label>
                            <input
                                type="text"
                                name="apellidos"
                                value={formData.apellidos}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Checkbox y texto "Solicitar factura" clicable */}
                    <div className='flex items-center mt-4'>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className='mr-2'
                                name="solicitarFactura"
                                checked={factureChecked}
                                onChange={handleFacture}
                            />
                            <span className="text-sm font-medium text-gray-700">Solicitar factura</span>
                        </label>
                    </div>

                    {/* Campos adicionales si se selecciona "Solicitar factura" */}
                    {factureChecked && (
                        <div className="mt-6 space-y-6 p-4 border-2 rounded-2xl">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nombre de la empresa *</label>
                                <input
                                    type="text"
                                    name="empresa"
                                    value={formData.empresa}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Razón social *</label>
                                <input
                                    type="text"
                                    name="razonSocial"
                                    value={formData.razonSocial}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Número de RUC *</label>
                                <input
                                    type="text"
                                    name="ruc"
                                    value={formData.ruc}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">País / Región *</label>
                        <select
                            name="pais"
                            value={formData.pais}
                            onChange={handleChange}
                            required
                            className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="Perú">Perú</option>
                            <option value="México">México</option>
                            <option value="Argentina">Argentina</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dirección de la calle *</label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                            placeholder="Número de la casa y nombre de la calle"
                            className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="direccionOpcional"
                            value={formData.direccionOpcional}
                            onChange={handleChange}
                            placeholder="Apartamento, habitación, etc. (opcional)"
                            className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Población *</label>
                        <input
                            type="text"
                            name="poblacion"
                            value={formData.poblacion}
                            onChange={handleChange}
                            required
                            className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Región / Provincia *</label>
                            <input
                                type="text"
                                name="region"
                                value={formData.region}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Código postal *</label>
                            <input
                                type="text"
                                name="codigoPostal"
                                value={formData.codigoPostal}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Teléfono *</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                            className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dirección de correo electrónico *</label>
                        <input
                            type="email"
                            name="correoElectronico"
                            value={formData.correoElectronico}
                            onChange={handleChange}
                            required
                            className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="enviarDireccionDiferente"
                                checked={formData.enviarDireccionDiferente}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            ¿Enviar a una dirección diferente?
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notas del pedido (opcional)</label>
                        <textarea
                            name="notas"
                            value={formData.notas}
                            onChange={handleChange}
                            rows="3"
                            className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md border-1 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Realizar Pedido
                        </button>
                    </div>
                </form>
                <div>
                    {/* Aquí puedes añadir algo más si lo deseas */}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
