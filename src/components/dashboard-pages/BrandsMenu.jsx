import React, { useEffect, useState } from 'react';
import { createBrand, getBrands, updateBrand, deleteBrand } from '../../services/BrandService';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Button } from '@nextui-org/react';

const BrandsMenu = () => {
    const [brands, setBrands] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = () => {
        getBrands()
            .then(data => setBrands(data))
            .catch(error => console.error('Error al obtener las marcas:', error));
    };

    const handleCreateClick = () => {
        setShowCreateModal(true);
        setName('');
        setDescription('');
    };

    const handleEditClick = (brand) => {
        setSelectedBrand(brand);
        setName(brand.name);
        setDescription(brand.description);
        setShowEditModal(true);
    };

    const handleCreate = async () => {
        const newBrand = {
            name,
            description,
        };
        const response = await createBrand(newBrand)
        if (response) {
            fetchBrands();
            setShowCreateModal(false);
        }
    }

    const handleUpdate = async () => {
        if (!selectedBrand) return; // Verificar que hay una categoría seleccionada
        console.log(selectedBrand);

        const updatedBrand = {
            // Asegúrate de incluir el ID
            name,
            description,
        };

        const response = await updateBrand(selectedBrand._id, updatedBrand)
        console.log(response);
        fetchBrands();
        setShowEditModal(false);
    };

    const handleDeleteClick = (brand) => {
        setSelectedBrand(brand);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        deleteBrand(selectedBrand._id)
            .then(() => {
                fetchBrands();
                setShowDeleteModal(false);
                console.log('Marca eliminada:', selectedBrand); // Log para verificar
            })
            .catch(error => {
                console.error('Error al eliminar la marca:', error);
            });
    };

    return (
        <>
            <div className='mb-3 flex justify-end'>
                <Button
                    className='p-3 text-sm w-[5%] flex text-white font-bold rounded-xl bg-blue-600'
                    onPress={handleCreateClick}
                >
                    <FaPlus />
                </Button>
            </div>
            <div className='bg-white w-full p-4 rounded-lg h-auto space-y-2'>
                <div className='p-2 h-auto grid grid-cols-3 text-gray-400 border-b-1 border-gray-200'>
                    <h1>NOMBRE</h1>
                    <h1>DESCRIPCIÓN</h1>
                    <h1>ACCIONES</h1>
                </div>
                <div className="p-2 text-black">
                    {brands.length > 0 ? (
                        brands.map((brand) => (
                            <div key={brand.id} className="grid grid-cols-3 items-start gap-4 p-2">
                                <h1 className="col-span-1 text-left">{brand.name}</h1>
                                <h1 className="col-span-1 text-left">{brand.description}</h1>
                                <div className="col-span-1 flex space-x-2 text-base">
                                    <button onClick={() => handleEditClick(brand)}>
                                        <FaEdit className="text-green-400" />
                                    </button>
                                    <button onClick={() => handleDeleteClick(brand)}>
                                        <FaTrash className="text-red-500" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 p-2">No hay marcas creadas</div>
                    )}
                </div>
                
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-1/3 transform transition-transform duration-300">
                            <h2 className="text-xl font-bold">Crear Marca</h2>
                            <div>
                                <label className="block mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Descripción</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-2 border rounded"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowCreateModal(false)}>Cancelar</button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreate}>Crear</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para Editar Categoría */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-1/3 transform transition-transform duration-300">
                            <h2 className="text-xl font-bold">Editar Marca</h2>
                            <div>
                                <label className="block mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Descripción</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-2 border rounded"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowEditModal(false)}>Cancelar</button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para Confirmar Eliminación */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-1/3 transform transition-transform duration-300">
                            <h2 className="text-xl font-bold">Eliminar Marca</h2>
                            <p>¿Estás seguro que deseas eliminar la marca "{selectedBrand?.name}"?</p>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BrandsMenu;
