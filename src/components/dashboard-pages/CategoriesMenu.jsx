import React, { useEffect, useState } from 'react';
import { createCategory, getCategories, updateCategory, deleteCategory } from '@/services/CategoryService';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Button } from '@nextui-org/react';
import LoadingSpinner from '../LoadingSpinner';

const CategoriesMenu = () => {
    const [categories, setCategories] = useState([]);
    const [showFormModal, setShowFormModal] = useState(false); // Usar un solo modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Estado para distinguir entre crear y editar
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        setLoading(true)
        try {
            getCategories()
                .then(data => setCategories(data))
                .catch(error => console.error('Error al obtener categorías:', error));
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        } finally {
            setLoading(false);
        }
    };

    const openFormModal = (category = null) => {
        if (category) {
            // Modo Editar
            setSelectedCategory(category);
            setName(category.name);
            setDescription(category.description);
            setIsEditing(true);
        } else {
            // Modo Crear
            setSelectedCategory(null);
            setName('');
            setDescription('');
            setIsEditing(false);
        }
        setShowFormModal(true);
    };

    const handleSave = async () => {
        const categoryData = { name, description };

        if (isEditing) {
            // Editar categoría
            if (!selectedCategory) return;
            await updateCategory(selectedCategory._id, categoryData)
                .then(() => fetchCategories())
                .catch(error => console.error('Error al actualizar categoría:', error));
        } else {
            // Crear categoría
            await createCategory(categoryData)
                .then(() => fetchCategories())
                .catch(error => console.error('Error al crear categoría:', error));
        }
        setShowFormModal(false); // Cerrar modal al guardar
    };

    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!selectedCategory) return;
        await deleteCategory(selectedCategory._id)
            .then(() => fetchCategories())
            .catch(error => console.error('Error al eliminar categoría:', error));
        setShowDeleteModal(false); // Cerrar modal al eliminar
    };

    return (
        <>
            <div className='mb-3 flex justify-end'>
                <Button
                    className='p-3 text-sm w-[5%] flex text-white font-bold rounded-xl bg-blue-600'
                    onPress={() => openFormModal()}
                >
                    <FaPlus />
                </Button>
            </div>
            <div className="bg-white w-full p-4 rounded-lg h-[80vh] flex flex-col space-y-2">
                <div className="flex-grow overflow-auto">
                    <div className="p-2 bg-gray-100 border-b border-gray-200 min-w-[1024px]">
                        <div className="grid grid-cols-3 text-gray-400 text-sm md:text-base">
                            <h1 className='text-center'>NOMBRE</h1>
                            <h1 className='text-center'>DESCRIPCIÓN</h1>
                            <h1 className='text-center'>ACCIONES</h1>
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className="p-2 text-black min-w-[1024px]">
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <div key={category.id} className="grid grid-cols-3 gap-4 p-2 items-center">
                                        <h1 className="col-span-1 text-left">{category.name}</h1>
                                        <h1 className="col-span-1 text-left">{category.description}</h1>
                                        <div className="col-span-1 flex space-x-2 text-base items-left">
                                            <Button
                                                className="bg-green-500 rounded-md w-1/8 flex items-center justify-start py-2"
                                                onClick={() => openFormModal(category)}
                                            >
                                                <FaEdit className="text-white text-sm" />
                                            </Button>
                                            <Button
                                                className="bg-red-500 rounded-md w-1/8 flex items-center justify-center py-2"
                                                onClick={() => handleDeleteClick(category)}
                                            >
                                                <FaTrash className="text-white text-sm" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-400 p-2">No hay categorías creadas</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/* Modal para Crear/Editar Categoría */}
            {showFormModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ marginTop: 0 }}>
                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-1/3 transform transition-transform duration-300">
                        <h2 className="text-xl font-bold">{isEditing ? 'Editar Categoría' : 'Crear Categoría'}</h2>
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
                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowFormModal(false)}>Cancelar</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                                {isEditing ? 'Guardar Cambios' : 'Crear'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Confirmar Eliminación */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-1/3 transform transition-transform duration-300">
                        <h2 className="text-xl font-bold">Eliminar Categoría</h2>
                        <p>¿Estás seguro que deseas eliminar la categoría "{selectedCategory?.name}"?</p>
                        <div className="flex justify-end space-x-2">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CategoriesMenu;
