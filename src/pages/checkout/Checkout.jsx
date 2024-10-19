import { useContext, useEffect, useState } from 'react';
import CheckoutStages from '../../components/CheckoutStages';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '@nextui-org/react';
import { useCart } from '../../hooks/useCart';

const Checkout = () => {
    const { auth } = useContext(AuthContext);
    const { cart } = useCart();
    const [factureChecked, setFactureChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        companyName: '',
        socialReason: '',
        ruc: '',
        address: '',
        optionalAddress: '',
        province: '',
        district: '',
        city: '',
        postalCode: '',
        phone: '',
        email: '',
        notes: ''
    });

    useEffect(() => {
        // Verificamos que `auth` esté disponible antes de actualizar `formData`
        if (auth) {
            setFormData({
                name: auth.name || '',
                lastname: auth.lastname || '',
                companyName: auth.companyName || '',
                socialReason: auth.socialReason || '',
                ruc: auth.ruc || '',
                address: auth.address || '',
                province: auth.province || '',
                district: auth.district || '',
                city: auth.city || '',
                postalCode: auth.postalCode || '',
                phone: auth.phone || '',
                email: auth.email || '',
                cart: cart,
                userId: auth._id,
            });
            setLoading(false); // Datos cargados
        }
    }, [auth]); // Se ejecuta cuando `auth` cambia

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const total = parseFloat(localStorage.getItem('total'))
        formData.total = total;
        console.log(formData);
        // Aquí puedes manejar el envío de los datos
        if (!factureChecked) {
            delete formData.companyName;
            delete formData.socialReason;
            delete formData.ruc;
        }
    };

    const handleFacture = () => {
        setFactureChecked(!factureChecked);
    };

    if (loading) {
        return <div>Cargando datos...</div>; // O un spinner de carga
    }

    return (
        <div>
            <div className='my-8 text-3xl font-bold'>
                Datos de facturación
            </div>
            <div className='flex space-x-4'>
                <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre *</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.name}
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
                                value={formData.lastname}
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
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Razón social *</label>
                                <input
                                    type="text"
                                    name="socialReason"
                                    value={formData.socialReason}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Número de RUC *</label>
                                <input
                                    type="number"
                                    name="ruc"
                                    value={formData.ruc}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tipo de Documento *</label>
                            <input
                                type="text"
                                name="tipoDocumento"
                                value={formData.tipoDocumento}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número de Documento *</label>
                            <input
                                type="number"
                                name="numDoc"
                                value={formData.numDoc}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Correo electrónico *</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Teléfono *</label>
                            <input
                                type="number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dirección *</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500 mb-4"
                        />
                        <input
                            type="text"
                            name="optionalAddress"
                            placeholder='Ej. Frente a la plaza principal'
                            value={formData.optionalAddress}
                            onChange={handleChange}
                            className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Provincia *</label>
                            <input
                                type="text"
                                name="province"
                                value={formData.province}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Distrito *</label>
                            <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ciudad *</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Código Postal *</label>
                            <input
                                type="number"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 block w-full h-10 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notas para el pedido</label>
                        <textarea
                            name="notas"
                            value={formData.notas}
                            onChange={handleChange}
                            className="mt-1 px-3 block w-full h-20 rounded-md border-gray-300 border-1 focus:border-indigo-500 focus:ring-indigo-500"
                            rows={4} // Puedes ajustar el número de filas según la altura deseada
                        />
                    </div>


                    {/* Rest of the form fields */}
                    <div className='pb-10'>
                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md border-1 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-bold"
                        >
                            Proceder a pagar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
