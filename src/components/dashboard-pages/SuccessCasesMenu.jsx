import React from 'react'
import { Button } from '@nextui-org/react'
import { createSuccess, getSuccess, updateSuccess, deleteSuccess } from '../../services/SuccessService'
import { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'

const SuccessCasesMenu = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [success, setSuccess] = useState([])
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedSuccess, setSelectedSuccess] = useState(false)
    const [form, setForm] = useState({
        title: '',
        description: '',
        image: '',
        video: ''
    })

    useEffect(() => {
        fetchSuccess()
    }, [])

    const fetchSuccess = () => {
        getSuccess()
            .then(data => setSuccess(data))
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false))
    }

    const handleCreateClick = () => {
        setForm({
            title: '',
            description: '',
            image: '',
            video: ''
        })
        setShowCreateModal(true)
    }

    const handleCreate = async () => {
        const newSuccess = {
            title: form.title,
            description: form.description,
            image: form.image,
            video: form.video
        }

        try {
            const response = await createSuccess(newSuccess)

            if (response) {
                fetchSuccess()
                setShowCreateModal(false)
            }
        } catch {
            console.error('Error al crear el caso de éxito:', error)
        }
    }

    const handleEditClick = (successItem) => {
        setShowEditModal(true)
        setForm({
            title: successItem.title,
            description: successItem.description,
            image: successItem.image,
            video: successItem.video
        })
        setSelectedSuccess(successItem)
    }

    const handleEdit = () => {
        if (!selectedSuccess) return
        const updatedSuccess = {
            _id: selectedSuccess._id,
            title: form.title,
            description: form.description,
            image: form.image,
            video: form.video
        }

        updateSuccess(selectedSuccess._id, updatedSuccess)
            .then((response) => {
                console.log('Caso de éxito actualizado', response)
                fetchSuccess()
                setShowEditModal(false)
            }).catch((error) => {
                console.error('Error al actualizar el caso de éxito:', error)
            })
    }

    const handleDeleteClick = (successItem) => {
        setSelectedSuccess(successItem)
        setShowDeleteModal(true)
    }

    const handleDelete = () => {
        deleteSuccess(selectedSuccess._id)
            .then(() => {
                fetchSuccess()
                setShowDeleteModal(false)
            })
            .catch(error => {
                console.error('Error al eliminar el caso de éxito:', error);
            });
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString)
        const formattedDate = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')
        const formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        return `${formattedDate}, ${formattedTime}`
    }

    return (
        <div>
            <div className='mb-3 flex justify-end'>
                <Button
                    className='p-3 text-sm w-[5%] flex text-white font-bold rounded-xl bg-blue-600'
                    onPress={handleCreateClick}
                >
                    <FaPlus />
                </Button>
            </div>
            <div className='bg-white w-full p-4 rounded-lg h-auto space-y-2'>
                <div className='p-2 h-auto grid grid-cols-4 text-gray-400 border-b-1 border-gray-200'>
                    <h1>TITULO</h1>
                    <h1>FECHA DE CREACIÓN</h1>
                    <h1>ÚLTIMA MODIFICACIÓN</h1>
                    <h1>ACCIONES</h1>
                </div>
                <div className='p-2 text-black'>
                    {isLoading ? (
                        <div className="text-center">Cargando...</div>
                    ) : success.length > 0 ? (
                        success.map((successItem) => (
                            <div key={successItem.id} className='grid grid-cols-4 items-center gap-4 p-2'>
                                <h1 className='flex items-center'>{successItem.title}</h1>
                                <h1 className='flex items-center'>{formatDateTime(successItem.created)}</h1>
                                <h1>{formatDateTime(successItem.lastModified)}</h1>
                                <div className="col-span-1 flex justify-start items-center space-x-2 text-base">
                                    <Button
                                        className='bg-green-500 rounded-md flex items-center justify-center py-2 px-3'
                                        onPress={() => handleEditClick(successItem)}
                                    >
                                        <FaEdit className="text-white text-sm" />
                                    </Button>
                                    <Button
                                        className='bg-red-500 rounded-md flex items-center justify-center py-2 px-3'
                                        onPress={() => handleDeleteClick(successItem)}
                                    >
                                        <FaTrash className="text-white text-sm" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center'>No hay casos registrados</div>
                    )}
                </div>

                {showCreateModal && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' style={{ marginTop: 0 }}>
                        <div className='bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-[80vh] overflow-y-auto'>
                            <h1 className='text-xl font-bold'>Crear noticia</h1>
                            <div>
                                <label className="block mb-2">Título</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Contenido</label>
                                <ReactQuill
                                    theme="snow"
                                    value={form.description}
                                    onChange={(value) => setForm({ ...form, description: value })}
                                    placeholder="Contenido"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Imagen (URL)</label>
                                <input
                                    type="text"
                                    value={form.image}
                                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Video (URL)</label>
                                <input
                                    type="text"
                                    value={form.video}
                                    onChange={(e) => setForm({ ...form, video: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowCreateModal(false)}>Cancelar</Button>
                                <Button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreate}>Crear</Button>
                            </div>
                        </div>
                    </div>
                )}

                {showEditModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ marginTop: 0 }}>
                        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-[80vh] overflow-y-auto">
                            <h1 className='text-xl font-bold'>Editar noticia</h1>
                            <div>
                                <label className="block mb-2">Título</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Contenido</label>
                                <ReactQuill
                                    theme="snow"
                                    value={form.description}
                                    onChange={(value) => setForm({ ...form, description: value })}
                                    placeholder="Contenido"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Imagen (URL)</label>
                                <input
                                    type="text"
                                    value={form.image}
                                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Video (URL)</label>
                                <input
                                    type="text"
                                    value={form.video}
                                    onChange={(e) => setForm({ ...form, video: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={handleEdit}
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ marginTop: 0 }}>
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-1/3">
                            <h2 className="text-xl font-bold">Eliminar noticia</h2>
                            <p>¿Estás seguro de que deseas eliminar la noticia <strong>{selectedSuccess?.title}</strong>?</p>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                                <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default SuccessCasesMenu
