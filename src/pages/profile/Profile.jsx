import React, { useContext, useEffect, useState } from 'react';
import ProfileSidebar from '../../components/ProfileSidebar';
import { AuthContext } from '../../context/AuthContext';
import { updateUser } from '../../services/AuthService';
import { checkPassword } from '../../services/UserService';
import Departamentos from '../../utils/departamentos.json'
import Provincias from '../../utils/provincias.json'
import Distritos from '../../utils/distritos.json'
import Alert, { showSuccessAlert, showErrorAlert } from '../../components/alert';
import { Button } from '@nextui-org/react';

const Profile = () => {
    const { auth } = useContext(AuthContext);
    const [provincias, setProvincias] = useState([])
    const [distritos, setDistritos] = useState([])
    const [includeCorporateData, setIncludeCorporateData] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [form, setForm] = useState({
        name: '',
        lastname: '',
        companyName: '',
        socialReason: '',
        ruc: '',
        tipoDocumento: '',
        numDoc: '',
        address: '',
        province: '',
        district: '',
        city: '',
        department: '',
        postalCode: '',
        phone: '',
        email: '',
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        name: null,
        lastname: null,
        companyName: null,
        socialReason: null,
        ruc: null,
        tipoDocumento: null,
        numDoc: null,
        address: null,
        province: null,
        district: null,
        city: null,
        department: null,
        postalCode: null,
        phone: null,
        email: null,
        currentPassword: null,
        newPassword: null,
        confirmPassword: null,
    })

    useEffect(() => {
        if (auth) {
            // Verifica si hay datos corporativos
            const corporateDataExists = auth.companyName || auth.socialReason || auth.ruc;

            // Establece el estado del formulario
            setIncludeCorporateData(corporateDataExists);

            const departmentName = auth.department ? Departamentos.find(d => d.id_ubigeo === auth.department)?.nombre_ubigeo : '';
            const provinceName = auth.province ? Provincias[auth.department]?.find(p => p.id_ubigeo === auth.province)?.nombre_ubigeo : '';
            const districtName = auth.district ? Distritos[auth.province]?.find(d => d.id_ubigeo === auth.district)?.nombre_ubigeo : '';

            // Establece los valores del formulario, utilizando valores vacíos si no hay datos
            setForm({
                name: auth.name || '',
                lastname: auth.lastname || '',
                companyName: auth.companyName || '',
                socialReason: auth.socialReason || '',
                ruc: auth.ruc || '',
                tipoDocumento: auth.tipoDocumento || '',
                numDoc: auth.numDoc || '',
                address: auth.address || '',
                province: auth.province || '',
                district: auth.district || '',
                city: auth.city || '',
                department: auth.department || '',
                postalCode: auth.postalCode || '',
                phone: auth.phone || '',
                email: auth.email || '',
            });
            setProvincias(auth.department ? Provincias[auth.department] : []);
            setDistritos(auth.province ? Distritos[auth.province] : []);
        }
    }, [auth]);

    const docOptions = [
        { value: 'DNI', label: 'DNI' },
        { value: 'RUC', label: 'RUC' },
        { value: 'Pasaporte', label: 'Pasaporte' },
        { value: 'Carnet de extranjería', label: 'Carnet de extranjería' },
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.lastname || !form.numDoc || !form.tipoDocumento || !form.email) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: !form.name || null,
                lastname: !form.lastname || null,
                tipoDocumento: !form.tipoDocumento || null, // Solo marcará error si está vacío
                numDoc: !form.numDoc || null,               // Solo marcará error si está vacío
                email: !form.email || null,
            }));
            return;
        }

        try {
            // Pasar el ID de usuario junto con los datos
            const response = await updateUser(auth._id, form);
            if (response) {
                showSuccessAlert('Datos actualizados correctamente');
                setErrors({
                    name: null,
                    lastname: null,
                    companyName: null,
                    socialReason: null,
                    ruc: null,
                    tipoDocumento: null,
                    numDoc: null,
                    address: null,
                    province: null,
                    district: null,
                    city: null,
                    department: null,
                    postalCode: null,
                    phone: null,
                    email: null,
                })
            }
            console.log(response);
        } catch (error) {
            showErrorAlert('Hubo un error al actualizar los datos');
            console.error(error);
        }
    };

    const changeDepartamentos = (e) => {
        const selectedDepartmentId = e.target.value;
        setForm((prevForm) => ({
            ...prevForm,
            department: selectedDepartmentId,
            province: '',
            district: '',
        }));
        setProvincias(selectedDepartmentId ? Provincias[selectedDepartmentId] : []);
        setDistritos([]);
    };

    const changeProvincias = (e) => {
        const selectedProvinceId = e.target.value;
        setForm((prevForm) => ({
            ...prevForm,
            province: selectedProvinceId,
            district: '',
        }));
        setDistritos(selectedProvinceId ? Distritos[selectedProvinceId] : []);
    };

    const changeDistritos = (e) => {
        const selectedDistrictId = e.target.value;
        setForm((prevForm) => ({
            ...prevForm,
            district: selectedDistrictId,
        }));
    };

    const handleTipoDocChange = (e) => {
        const selectedDoc = e.target.value;
        console.log(selectedDoc)
        setForm((prevForm) => ({
            ...prevForm,
            tipoDocumento: selectedDoc
        }));
    }

    const togglePasswordModal = () => {
        setShowPasswordModal(!showPasswordModal);
        setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
        setErrors({
            currentPassword: null,
            newPassword: null,
            confirmPassword: null,
        });
    };

    const updatePassword = async (e) => {
        e.preventDefault();

        // Validación de campos vacíos
        const newErrors = {
            currentPassword: !passwordForm.currentPassword ? 'Este campo es obligatorio' : null,
            newPassword: !passwordForm.newPassword ? 'Este campo es obligatorio' : null,
            confirmPassword: !passwordForm.confirmPassword ? 'Este campo es obligatorio' : null,
        };
        setErrors(newErrors);

        // Si hay errores, detener la ejecución
        if (Object.values(newErrors).some((error) => error !== null)) {
            return;
        }

        try {
            // Primero verificamos que la contraseña actual sea la correcta
            const response = await checkPassword(passwordForm.currentPassword);
            if (response) {
                if (passwordForm.newPassword === passwordForm.confirmPassword) {
                    const updatedUser = await updateUser(auth._id, { password: passwordForm.newPassword });

                    if (updatedUser) {
                        showSuccessAlert('Contraseña actualizada correctamente');
                        setErrors({
                            currentPassword: null,
                            newPassword: null,
                            confirmPassword: null,
                        });
                        setPasswordForm({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        });
                        togglePasswordModal();
                    } else {
                        console.log('Error al actualizar contraseña');
                    }
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        confirmPassword: 'Las contraseñas no coinciden',
                    }));
                }
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    currentPassword: 'Contraseña actual incorrecta',
                }));
            }
        } catch (error) {
            console.error('Error al verificar la contraseña:', error);
        }
    };

    return (
        <div className="flex my-6">
            <ProfileSidebar />
            <div className="flex-grow mx-8 p-6">
                <Alert />
                {auth ? (
                    <div>
                        <h1 className="text-3xl font-bold mb-6">Datos del perfil</h1>
                        <h1 className="text-xl mb-6">Tus datos serán utilizados para agilizar tus compras</h1>
                        <h1 className='font-bold'>Usuario:</h1>
                        <h1 className='text-xl'>{auth.email}</h1>
                        <Button className='my-2 bg-gray-400 rounded-lg text-white font-bold' onClick={togglePasswordModal}>
                            <h1>Cambiar contraseña</h1>
                        </Button>
                        {showPasswordModal && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                    <h2 className="text-2xl font-bold mb-4">Cambiar Contraseña</h2>
                                    <form onSubmit={updatePassword} className="space-y-4">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Contraseña Actual</label>
                                            <input
                                                type="password"
                                                value={passwordForm.currentPassword}
                                                onChange={(e) =>
                                                    setPasswordForm((prevForm) => ({
                                                        ...prevForm,
                                                        currentPassword: e.target.value,
                                                    }))
                                                }
                                                className={`w-full p-2 border rounded ${errors.currentPassword ? 'border-red-500' : ''}`}
                                                required
                                            />
                                            {errors.currentPassword && <span className="text-red-500">{errors.currentPassword}</span>}
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Nueva Contraseña</label>
                                            <input
                                                type="password"
                                                value={passwordForm.newPassword}
                                                onChange={(e) =>
                                                    setPasswordForm((prevForm) => ({
                                                        ...prevForm,
                                                        newPassword: e.target.value,
                                                    }))
                                                }
                                                className={`w-full p-2 border rounded ${errors.newPassword ? 'border-red-500' : ''}`}
                                                required
                                            />
                                            {errors.newPassword && <span className="text-red-500">{errors.newPassword}</span>}
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Confirmar Nueva Contraseña</label>
                                            <input
                                                type="password"
                                                value={passwordForm.confirmPassword}
                                                onChange={(e) =>
                                                    setPasswordForm((prevForm) => ({
                                                        ...prevForm,
                                                        confirmPassword: e.target.value,
                                                    }))
                                                }
                                                className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                                required
                                            />
                                            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
                                        </div>
                                        <div className="flex justify-end space-x-4 mt-6">
                                            <button type="button" onClick={togglePasswordModal} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <h1 className='font-bold py-6'>1. Información del usuario</h1>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1 font-semibold">Nombre</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleInputChange}
                                            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                                        />
                                        {errors.name ? <span className='text-red-500'>Este campo es obligatorio</span> : null}
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-semibold">Apellidos</label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            value={form.lastname}
                                            onChange={handleInputChange}
                                            className={`w-full p-2 border rounded ${errors.lastname ? 'border-red-500' : ''}`}
                                        />
                                        {errors.lastname ? <span className='text-red-500'>Este campo es obligatorio</span> : null}
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-semibold">Tipo de Documento</label>
                                        <select
                                            name="tipoDocumento"
                                            id='tipoDocumento'
                                            value={form.tipoDocumento}
                                            onChange={handleTipoDocChange}
                                            className={`w-full p-2 border rounded ${errors.tipoDocumento ? 'border-red-500' : ''}`}
                                        >
                                            <option value="">Seleccionar</option>
                                            {docOptions.map((item, key) => {
                                                return (
                                                    <option key={key} value={item.value}>{item.label}</option>
                                                )
                                            })}
                                        </select>
                                        {errors.tipoDocumento ? <span className='text-red-500'>Este campo es obligatorio</span> : null}
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-semibold">Número de Documento</label>
                                        <input
                                            type="number"
                                            name="numDoc"
                                            value={form.numDoc}
                                            onChange={handleInputChange}
                                            className={`w-full p-2 border rounded ${errors.numDoc ? 'border-red-500' : ''}`}
                                        />
                                        {errors.numDoc ? <span className='text-red-500'>Este campo es obligatorio</span> : null}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='py-6 space-y-3'>
                                    <h1 className='font-bold'>2. Datos corporativos (opcional)</h1>
                                    <h1>Agrega datos de tu empresa si deseas adquirir una factura al momento de realizar una compra</h1>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block mb-1 font-semibold">Nombre de la Empresa</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={form.companyName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-semibold">Razón Social</label>
                                        <input
                                            type="text"
                                            name="socialReason"
                                            value={form.socialReason}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-semibold">RUC</label>
                                        <input
                                            type="text"
                                            name="ruc"
                                            value={form.ruc}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className='font-bold py-6'>3. Datos de contacto</h1>
                                <div className='space-y-3'>
                                    <div className='grid grid-cols-3 gap-4'>
                                        <div className='col-span-2'>
                                            <label className="block mb-1 font-semibold">Dirección</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={form.address}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block mb-1 font-semibold">Teléfono</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        <div>
                                            <label className="block mb-1 font-semibold">Región</label>
                                            <select
                                                name="departamentos"
                                                value={form.department}
                                                id="departamentos"
                                                className='w-full p-2 border rounded'
                                                onChange={changeDepartamentos}
                                            >
                                                <option value="">Seleccionar</option>
                                                {Departamentos.map((data, key) => {
                                                    return (
                                                        <option key={key} value={data.id_ubigeo}>{data.nombre_ubigeo}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-semibold">Provincia</label>
                                            <select
                                                name="provincias"
                                                value={form.province}
                                                id="provincias"
                                                className='w-full p-2 border rounded'
                                                onChange={changeProvincias}
                                            >
                                                <option value="">Seleccionar</option>
                                                {provincias.map((data, key) => {
                                                    return (
                                                        <option key={key} value={data.id_ubigeo}>{data.nombre_ubigeo}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-semibold">Distrito</label>
                                            <select
                                                name="distritos"
                                                value={form.district}
                                                id="distritos"
                                                className='w-full p-2 border rounded'
                                                onChange={changeDistritos}
                                            >
                                                <option value="">Seleccionar</option>
                                                {distritos.map((data, key) => {
                                                    return (
                                                        <option key={key} value={data.id_ubigeo}>{data.nombre_ubigeo}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-semibold">Código Postal</label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                value={form.postalCode}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
                                Guardar Cambios
                            </Button>
                        </form>
                    </div>
                ) : <p>cargando...</p>}
            </div>
        </div>
    );
}

export default Profile;
