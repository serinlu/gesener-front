import React, { useContext, useEffect, useState } from 'react';
import ProfileSidebar from '../../components/ProfileSidebar';
import { AuthContext } from '../../context/AuthContext';
import { updateUser } from '../../services/AuthService';
import Departamentos from '../../utils/departamentos.json'
import Provincias from '../../utils/provincias.json'
import Distritos from '../../utils/distritos.json'
import Alert, { showSuccessAlert, showErrorAlert } from '../../components/alert';

const Profile = () => {
    const { auth } = useContext(AuthContext);
    const [provincias, setProvincias] = useState([])
    const [distritos, setDistritos] = useState([])
    const [includeCorporateData, setIncludeCorporateData] = useState(false);
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
                name: auth.name,
                lastname: auth.lastname,
                companyName: auth.companyName || '', // Cambiado a ''
                socialReason: auth.socialReason || '', // Cambiado a ''
                ruc: auth.ruc || '', // Cambiado a ''
                tipoDocumento: auth.tipoDocumento || '',
                numDoc: auth.numDoc || '',
                address: auth.address || '',
                province: auth.province || '',
                district: auth.district || '',
                city: auth.city || '',
                department: auth.department || '',
                postalCode: auth.postalCode || '',
                phone: auth.phone || '',
                email: auth.email,
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
        // Validar campos obligatorios
        if (!form.name || !form.lastname || !form.email) {
            showErrorAlert('Por favor, completa los campos obligatorios.');
            return;
        }

        try {
            // Pasar el ID de usuario junto con los datos
            const response = await updateUser(auth._id, form);
            if (response) {
                showSuccessAlert('Datos actualizados correctamente');
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

    return (
        <div className="flex my-6">
            <ProfileSidebar />
            <div className="flex-grow mx-8 p-6">
                <Alert />
                <h1 className="text-3xl font-bold mb-6">Datos del perfil</h1>
                <h1 className="text-xl mb-6">Tus datos serán usados para agilizar tus compras</h1>
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
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-semibold">Apellidos</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={form.lastname}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-semibold">Tipo de Documento</label>
                                <select
                                    name="tipoDocumento"
                                    id='tipoDocumento'
                                    value={form.tipoDocumento}
                                    onChange={handleTipoDocChange}
                                    className='w-full p-2 border rounded'
                                >
                                    <option value="">Seleccionar</option>
                                    {docOptions.map((item, key) => {
                                        return (
                                            <option key={key} value={item.value}>{item.label}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-semibold">Número de Documento</label>
                                <input
                                    type="number"
                                    name="numDoc"
                                    value={form.numDoc}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
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
                            <div>
                                <label className="block mb-1 font-semibold">Dirección</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={form.address}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
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

                            <div className="grid grid-cols-3 gap-4">
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
                                <div className="col-span-2">
                                    <label className="block mb-1 font-semibold">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Profile;
