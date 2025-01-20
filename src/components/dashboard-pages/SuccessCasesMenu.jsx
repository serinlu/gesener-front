import React from 'react'
import { Button } from '@nextui-org/react'
import { createSuccess, getSuccess, updateSuccess, deleteSuccess } from '@/services/SuccessService'
import { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { getImages } from '@/services/ImageService'
import Pagination from '@/components/dashboard-pages/Pagination'

const SuccessCasesMenu = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [success, setSuccess] = useState([])
    const [images, setImages] = useState([])
    const [showImagesListModal, setShowImagesListModal] = useState(false)
    const [imagesPage, setImagesPage] = useState(1)
    const [totalImagesPage, setTotalImagesPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
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

    useEffect(() => {
        fetchImages(imagesPage)
    }, [imagesPage])

    const fetchImages = (page) => {
        getImages(page)
            .then(data => {
                setImages(data.data)
                setTotalImagesPage(data.totalImagesPage)
                console.log(images)
            })
            .catch(error => console.error(error))
    }

    const fetchSuccess = () => {
        getSuccess()
            .then(data => setSuccess(data))
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false))
    }

    const openFormModal = (success = null) => {
        if (success) {
            setIsEditing(true)
            setSelectedSuccess(success)
            setForm({
                title: success.title,
                description: success.description,
                image: success.image || '',
                video: success.video || ''
            })
        } else {
            setIsEditing(false)
            setSelectedSuccess(null)
            setForm({
                title: '',
                description: '',
                image: '',
                video: ''
            })
        }
        setShowModal(true)
    }

    const handleSave = async () => {
        if (isEditing) {
            if (!selectedSuccess) return
            handleEdit()
        } else {
            handleCreate()
        }
        setShowModal(false)
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
                setShowModal(false)
            }
        } catch {
            console.error('Error al crear el caso de éxito:', error)
        }
    }

    const handleImageSelect = (imageUrl) => {
        setForm((prevForm) => ({
            ...prevForm,
            image: imageUrl,
        }))
        setShowImagesListModal(false);
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
                setShowModal(false)
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
                    onPress={() => openFormModal()}
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
                                        onPress={() => openFormModal(successItem)}
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

                {showModal && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' style={{ marginTop: 0 }}>
                        <div className='bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-[80vh] overflow-y-auto space-y-4'>
                            <h1 className='text-xl font-bold'>{isEditing ? 'Editar noticia' : 'Crear noticia'}</h1>
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
                                <div className='flex items-center pb-2 space-x-3'>
                                    <label className="block">Imagen de la portada</label>
                                    <Button className='bg-blue-600 rounded-lg text-white p-2' onPress={() => setShowImagesListModal(true)}>Seleccionar</Button>
                                </div>

                                {/* Vista previa de la imagen seleccionada */}
                                {form.image ? (
                                    <div className="flex flex-col items-center mt-2">
                                        <img src={form.image} alt="Vista previa de imagen" className="w-full h-40 object-cover border rounded" />
                                        <button
                                            className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
                                            onClick={() => setForm({ ...form, image: '' })}
                                        >
                                            Quitar Imagen
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">No se ha seleccionado ninguna imagen</p>
                                )}
                            </div>
                            {showImagesListModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ marginTop: 0 }}>
                                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-[50%] h-[90%]">
                                        <h2 className="text-xl font-bold">Imágenes del Producto</h2>
                                        <div className="grid grid-cols-3 gap-4 overflow-y-auto h-[80%]">
                                            {isLoading ? (
                                                <div className="flex items-center justify-center col-span-3">
                                                    {/* <Spinner color="blue" /> */}
                                                    <p>Cargando imágenes...</p>
                                                </div>
                                            ) : (
                                                images.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image.url}
                                                        alt={image?.name}
                                                        className="w-full h-full object-cover border-2 cursor-pointer"
                                                        onClick={() => handleImageSelect(image.url)} // Asegúrate de pasar 'image.url' aquí
                                                    />
                                                ))
                                            )}
                                        </div>
                                        <Pagination currentPage={imagesPage} totalPages={totalImagesPage} onPageChange={(newPage) => setImagesPage(newPage)} />
                                        <div className="flex justify-end space-x-2">
                                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowImagesListModal(false)}>Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                <Button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>Cancelar</Button>
                                <Button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>{isEditing ? 'Guardar cambios' : 'Crear'}</Button>
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
