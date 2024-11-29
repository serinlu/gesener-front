import React, { useContext, useEffect, useState } from 'react'
import { changeRole, getUsers } from '@/services/UserService'
import { getProfile, checkPassword } from '@/services/UserService'
import { Button } from '@nextui-org/react'
import { FaEye, FaEdit } from 'react-icons/fa'
import { AuthContext } from '@/context/AuthContext'
import departamentos from '@/utils/departamentos.json'
import provincias from '@/utils/provincias.json'
import distritos from '@/utils/distritos.json'

const UsersMenu = () => {
    const [users, setUsers] = useState([])
    const { auth } = useContext(AuthContext)
    const [showViewModal, setShowViewModal] = useState(false)
    const [showEditRoleModal, setShowEditRoleModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [newRole, setNewRole] = useState('')
    const [form, setForm] = useState({
        name: '', lastname: '', companyNmae: '', socialReason: '', ruc: '',
        tipoDocumento: '', numDoc: '', department: '', address: '', province: '',
        district: '', city: '', postalCode: '', phone: '', email: '', role: ''
    })
    const [authForm, setAuthForm] = useState({ email: '', password: '' })
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])

    useEffect(() => {
        fetchUsers();
        fetchProfile();
    }, []);


    const fetchProfile = async () => {
        const response = await getProfile();
        if (response) {
            setForm({
                name: response.name, lastname: response.lastname, companyNmae: response.companyNmae || '-',
                socialReason: response.socialReason || '-', ruc: response.ruc || '-', tipoDocumento: response.tipoDocumento || '-',
                numDoc: response.numDoc || '-', department: response.department || '-', address: response.address || '-',
                province: response.province || '-', district: response.district || '-', city: response.city || '-',
                postalCode: response.postalCode || '-', phone: response.phone || '-', email: response.email, role: response.role
            });
        }
    }

    const fetchUsers = async () => {
        const response = await getUsers();
        if (response) {
            setUsers(response);
        }
    };

    const testDepartments = async (user) => {
        const id_dep = user.department || '';
        const id_pro = user.province || '';
        const id_dist = user.district || '';

        // Buscar el departamento
        const department = departamentos.find(data => data.id_ubigeo === id_dep.toString());

        // Establecer provincias y distritos en función de `id_dep` y `id_pro`
        const updatedProvinces = id_dep ? provincias[id_dep] : [];
        const updatedDistricts = id_pro ? distritos[id_pro] : [];
        setProvinces(updatedProvinces);
        setDistricts(updatedDistricts);

        // Buscar la provincia y distrito con los datos actualizados
        const province_n = updatedProvinces.find(data => data.id_ubigeo === id_pro.toString());
        const district_n = updatedDistricts.find(data => data.id_ubigeo === id_dist.toString());

        // Actualizar `form` con los datos nuevos o dejar en blanco si no se encuentra
        setForm((prevForm) => ({
            ...prevForm,
            department: department ? department.nombre_ubigeo : '-',
            province: province_n ? province_n.nombre_ubigeo : '-',
            district: district_n ? district_n.nombre_ubigeo : '-'
        }));
    };


    const handleOpenModal = (user) => {
        setShowViewModal(true);
        setForm({
            name: user.name, lastname: user.lastname, companyNmae: user.companyNmae || '-',
            socialReason: user.socialReason || '-', ruc: user.ruc || '-', tipoDocumento: user.tipoDocumento || '-',
            numDoc: user.numDoc || '-', department: user.department || '-', address: user.address || '-',
            province: user.province || '-', district: user.district || '-', city: user.city || '-',
            postalCode: user.postalCode || '-', phone: user.phone || '-', email: user.email, role: user.role
        });
        setProvinces([]); // Reiniciar provincias al abrir el modal
        setDistricts([]); // Reiniciar distritos al abrir el modal
        testDepartments(user);
    };

    const handleOpenEditRoleModal = (user) => {
        setSelectedUser(user);
        setNewRole(user.role); // Rol actual del usuario
        setShowEditRoleModal(true);
        setAuthForm({ email: auth.email, password: '' });
    };

    const handleEditRole = async () => {
        // Manejar el envío del formulario para cambiar el rol
        const updatedUser = {
            role: newRole,
            email: authForm.email, // Agrega el correo del admin
            password: authForm.password, // Agrega la contraseña del admin
        };
        console.log(updatedUser);

        try {
            // Cambiar el rol del usuario usando la función changeRole
            const updateResponse = await changeRole(selectedUser._id, updatedUser);
            console.log("User ID:", selectedUser._id); // Usa el ID y el nuevo rol
            console.log(updateResponse)

            if (updateResponse) {
                setShowEditRoleModal(false);
                fetchUsers(); // Volver a cargar los usuarios después del cambio
            } else {
                console.error("Error al cambiar el rol del usuario.");
            }
        } catch (error) {
            console.error("Error al cambiar el rol:", error);
        }
    };

    // Función que valida si el botón Confirmar Cambio debe estar habilitado
    const isFormValid = () => {
        return newRole !== selectedUser.role && authForm.email !== '' && authForm.password !== '';
    }


    const userData = [
        { title: 'Nombre', value: form.name },
        { title: 'Apellidos', value: form.lastname },
        { title: 'Empresa', value: form.companyNmae },
        { title: 'Razón social', value: form.socialReason },
        { title: 'RUC', value: form.ruc },
        { title: 'Tipo de documento', value: form.tipoDocumento },
        { title: 'N° de documento', value: form.numDoc },
        { title: 'Departamento', value: form.department },
        { title: 'Dirección', value: form.address },
        { title: 'Provincia', value: form.province },
        { title: 'Distrito', value: form.district },
        { title: 'Ciudad', value: form.city },
        { title: 'Código Postal', value: form.postalCode },
        { title: 'Teléfono', value: form.phone },
        { title: 'Correo electrónico', value: form.email },
        { title: 'Rol', value: form.role }
    ]

    return (
        <div className='bg-white p-3 rounded-lg'>
            <div className="overflow-x-auto">
                <div className="p-2 h-auto grid grid-cols-7 min-w-[768px] text-gray-400 border-b-1 border-gray-200">
                    <h1>NOMBRE</h1>
                    <h1>APELLIDO</h1>
                    <h1>TIPO DE DOC.</h1>
                    <h1>N° DE DOC.</h1>
                    <h1>EMAIL</h1>
                    <h1>ROL</h1>
                    <h1>ACCIONES</h1>
                </div>
                <div className="p-2 text-black">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div
                                key={user._id}
                                className="grid grid-cols-7 gap-4 p-4 min-w-[768px] items-center"
                            >
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">{user.name}</h1>
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">{user.lastname}</h1>
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">{user.tipoDocumento}</h1>
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">{user.numDoc}</h1>
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">{user.email}</h1>
                                <h1 className="col-span-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">{user.role}</h1>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-orange-500 rounded-md w-12 h-12 flex items-center justify-center"
                                        onClick={() => handleOpenModal(user)}
                                    >
                                        <FaEye className="text-white text-xl" />
                                    </button>
                                    <button
                                        className="bg-blue-500 rounded-md w-12 h-12 flex items-center justify-center"
                                        onClick={() => handleOpenEditRoleModal(user)}
                                    >
                                        <FaEdit className="text-white text-xl" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 p-2">
                            No hay usuarios registrados
                        </div>
                    )}
                </div>
            </div>

            {showViewModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg h-auto max-h-[80vh] overflow-y-auto mx-8">
                        <h2 className="text-xl font-bold mb-4">Detalles del usuario</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {userData.map((item) => (
                                <div key={item.title} className="mb-4">
                                    <h1 className="text-sm font-medium">{item.title}:</h1>
                                    <p>{item.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button className="bg-red-500 rounded-lg text-white font-bold" onClick={() => setShowViewModal(false)}>
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {showEditRoleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Cambiar rol del usuario '{selectedUser?.name} {selectedUser?.lastname}'</h2>
                        <label className="block mb-2 text-sm font-medium">Nuevo Rol</label>
                        <select
                            className="border rounded p-2 w-full"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        >
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>

                        {newRole !== selectedUser.role && (
                            <div>
                                <label className="block mb-2 mt-6 text-sm font-bold">Confirma el cambio ingresando tus credenciales</label>
                                <h1 className='my-2'>Correo</h1>
                                <input
                                    type="text"
                                    className="border rounded p-2 w-full"
                                    value={authForm.email}
                                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                                />
                                <h1 className='my-2'>Contraseña</h1>
                                <input
                                    type="password"
                                    className="border rounded p-2 w-full"
                                    value={authForm.password}
                                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                                />
                            </div>
                        )}

                        <div className="mt-4 flex justify-end space-x-4">
                            <Button className="bg-gray-400" onClick={() => setShowEditRoleModal(false)}>
                                Cancelar
                            </Button>
                            <Button
                                className={`bg-blue-500 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={!isFormValid()}
                                onClick={handleEditRole}
                            >
                                Confirmar Cambio
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UsersMenu
