import React, { useEffect, useState } from 'react'
import { getLeasings, createLeasing, updateLeasing, deleteLeasing } from '@/services/LeasingService'
import { getBrands, getPaginatedBrands } from '@/services/BrandService'
import { getImages, listAllImages } from '@/services/ImageService'
import { Button } from '@nextui-org/react'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { listManuals, listAllManuals } from '@/services/ManualService'
import { listSheets, listAllSheets } from '@/services/SheetService'
import Pagination from '@/components/dashboard-pages/Pagination'
import FileListModal from '@/components/dashboard-pages/FileModal'

const LeasingsMenu = () => {
    const [leasings, setLeasings] = useState([])
    const [brands, setBrands] = useState([])
    const [images, setImages] = useState([])
    const [manuals, setManuals] = useState([])
    const [sheets, setSheets] = useState([])
    const pageSize = 12;
    const [form, setForm] = useState({
        name: '',
        model: '',
        brand: '',
        description: '',
        manual: '',
        sheet: '',
        image: '',
    })
    const [errors, setErrors] = useState({
        name: null,
        model: null,
        brand: null,
        description: null,
        manual: null,
        sheet: null,
        image: null,
    })
    const [selectedLeasing, setSelectedLeasing] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [showImagesListModal, setShowImagesListModal] = useState(false)
    const [showManualsListModal, setShowManualsListModal] = useState(false)
    const [showSheetsListModal, setShowSheetsListModal] = useState(false)

    //estados de las paginas
    const [page, setPage] = useState(1); // Página actual
    const [brandsPage, setBrandsPage] = useState(1)
    const [imagesPage, setImagesPage] = useState(1)
    const [manualsPage, setManualsPage] = useState(1)
    const [sheetsPage, setSheetsPage] = useState(1)

    //estados para el total de paginas
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [totalBrandsPages, setTotalBrandsPages] = useState(1);
    const [totalImagesPages, setTotalImagesPages] = useState(1);
    const [totalManualsPages, setTotalManualsPages] = useState(1);
    const [totalSheetsPages, setTotalSheetsPages] = useState(1);

    const [loading, setLoading] = useState(true)
    const [showManualsModal, setShowManualsModal] = useState(false);
    const [showSheetsModal, setShowSheetsModal] = useState(false);
    const [selectedManual, setSelectedManual] = useState(null);
    const [selectedSheet, setSelectedSheet] = useState(null);

    useEffect(() => {
        fetchLeasings(page)
    }, [page])

    useEffect(() => {
        fetchBrands()
        fetchImages()
        fetchManuals()
        fetchSheets()
    }, [])

    const fetchLeasings = (page) => {
        setLoading(true)
        getLeasings(page)
            .then((data) => {
                console.log(data)
                setLeasings(data.leasings)
                setTotalPages(data.totalPages)
                setLoading(false)
                console.log(leasings)
            })
            .catch((error) => {
                console.error('Error al obtener los equipos:', error)
                return
            });
    }

    const fetchBrands = () => {
        getBrands()
            .then(data => setBrands(data))
            .catch((error) => console.error('Error al obtener las marcas:', error))
    }

    const fetchImages = () => {
        listAllImages()
            .then(data => setImages(data.data))
            .catch((error) => console.error('Error al obtener las imágenes:', error))
    };

    const fetchManuals = () => {
        listAllManuals()
            .then((data) => setManuals(data))
            .catch((error) => console.error('Error al obtener los manuales:', error));
    }

    const fetchSheets = () => {
        listAllSheets()
            .then((data) => setSheets(data))
            .catch((error) => console.error('Error al obtener las fichas:', error));
    }

    const handleDeleteClick = (leasing) => {
        setSelectedLeasing(leasing)
        setShowDeleteModal(true)
    }

    const openFormModal = (leasing = null) => {
        if (leasing) {
            setIsEditing(true)
            setSelectedLeasing(leasing)
            setForm({
                name: leasing.name,
                model: leasing.model,
                brand: leasing.brand || '',
                description: leasing.description || '',
                manual: leasing.manual || '',
                sheet: leasing.sheet || '',
                image: leasing.image || '',
            })
        } else {
            setIsEditing(false)
            setSelectedLeasing(null)
            setForm({
                name: '',
                model: '',
                brand: '',
                description: '',
                manual: '',
                sheet: '',
                image: '',
            })
        }
        setOpenModal(true)
    }

    const handleSave = async () => {
        if (isEditing) {
            if (!selectedLeasing) return
            handleUpdate()
        } else {
            handleCreate()
        }
        setOpenModal(false)
        fetchLeasings()
    }

    const handleCreate = async () => {
        //validar si algun campo es vacio
        if (!form.name || !form.model || !form.description) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: !form.name || null,
                model: !form.model || null,
                description: !form.description || null,
            }))
            return
        }
        const newLeasing = {
            name: form.name,
            model: form.model,
            brand: form.brand || null,
            description: form.description,
            manual: form.manual,
            sheet: form.sheet,
            image: form.image || '',
        }

        try {
            const response = await createLeasing(newLeasing)
            if (response) {
                fetchLeasings()
                setOpenModal(false)
            }
        } catch (error) {
            console.error('Error al crear el leasing:', error)
        }
    }

    const handleUpdate = async () => {
        if (!selectedLeasing) return

        const updatedLeasing = {
            _id: selectedLeasing._id,
            name: form.name,
            model: form.model,
            brand: form.brand || null,
            description: form.description,
            manual: form.manual,
            sheet: form.sheet,
            image: form.image || '',
        }

        setErrors(null)

        updateLeasing(selectedLeasing._id, updatedLeasing)
            .then((response) => {
                console.log('arrendamiento actualizado', response)
                fetchLeasings()
            })
            .catch((error) => console.error('Error al actualizar el arrendamiento:', error))
    }

    const handleDelete = async () => {
        deleteLeasing(selectedLeasing._id)
            .then(() => {
                fetchLeasings()
                setShowDeleteModal(false)
            })
            .catch((error) => console.error('Error al eliminar el arrendamiento:', error))
    }

    const handleImageSelect = (imageUrl) => {
        setForm((prevForm) => ({ ...prevForm, image: imageUrl }))
        setShowImagesListModal(false)
    }

    const handleSelectManual = (manual) => {
        setSelectedManual(manual);
        setForm((prevForm) => ({
            ...prevForm,
            manual: manual.url || ''  // Asegúrate de guardar el enlace (url) del manual
        }));
        setShowManualsModal(false);
    };

    const handleSelectSheet = (sheet) => {
        setSelectedSheet(sheet);
        setForm((prevForm) => ({
            ...prevForm,
            sheet: sheet.url || ''  // Asegúrate de guardar el enlace (url) de la ficha
        }));
        setShowSheetsModal(false);
    };

    const handleCancel = () => {
        setShowDeleteModal(false)
        setShowImagesListModal(false)
        setShowManualsModal(false)
        setShowSheetsModal(false)
        setSelectedManual(null)
        setSelectedSheet(null)
        setOpenModal(false)
        setErrors(null)
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
                    <h1>IMAGEN</h1>
                    <h1>NOMBRE</h1>
                    <h1>MARCA</h1>
                    <h1>ACCIONES</h1>
                </div>
                <div className="p-2 text-black">
                    {leasings.length > 0 ? (
                        leasings.map((leasing) => (
                            <div key={leasing._id} className="grid grid-cols-4 items-center gap-4 p-2">
                                <div>
                                    <img src={leasing.image || '/placeholder.png'} alt={leasing.name} className="w-20 h-20" />
                                </div>
                                <h1 className="col-span-1 text-left">{leasing.name || "Sin nombre"}</h1>
                                <h1 className="col-span-1 text-left">{leasing.brand?.name || "Sin marca"}</h1>
                                <div className="col-span-1 flex space-x-2 items-center">
                                    <Button className="bg-yellow-500 rounded-md w-1/8 flex items-center justify-start py-2 hover:bg-yellow-600" onClick={() => openFormModal(leasing)}><FaEdit /></Button>
                                    <Button className="bg-red-500 rounded-md w-1/8 flex items-center justify-start py-2 hover:bg-red-600" onClick={() => handleDeleteClick(leasing)}><FaTrash /></Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">No hay arrendamientos disponibles</div>
                    )}
                </div>
            </div>
            <div className="w-full m-auto">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </div>
            {openModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ marginTop: 0 }}>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[90%] flex flex-col z-10">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">{isEditing ? 'Editar' : 'Crear'} Arrendamiento</h1>
                            <Button className="text-2xl" onPress={() => setOpenModal(false)}>✕</Button>
                        </div>
                        <div className="overflow-y-auto space-y-4 flex-grow">
                            <div>
                                <label className='block mb-1'>Nombre<span className="pl-1 text-red-400 font-bold">*</span></label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => {
                                        setForm({ ...form, name: e.target.value });
                                        setErrors({ ...errors, name: '' }); // Limpiar el error mientras el usuario escribe
                                    }}
                                    className={`w-full p-2 border rounded ${errors?.name ? 'border-red-500' : ''}`}
                                />
                            </div>
                            <div>
                                <label className='block mb-1'>Modelo<span className="pl-1 text-red-400 font-bold">*</span></label>
                                <input
                                    type="text"
                                    value={form.model}
                                    onChange={(e) => {
                                        setForm({ ...form, model: e.target.value });
                                        setErrors({ ...errors, model: '' }); // Limpiar el error mientras el usuario escribe
                                    }}
                                    className={`w-full p-2 border rounded ${errors?.model ? 'border-red-500' : ''}`}
                                />
                            </div>
                            <div>
                                <label className='block mb-1'>Marca<span className="pl-1 text-red-400 font-bold">*</span></label>
                                <select
                                    type="text"
                                    value={form.brand?._id}
                                    onChange={(e) => {
                                        const selectedBrand = brands.find((brand) => brand._id === e.target.value);
                                        setForm((prevForm) => ({
                                            ...prevForm,
                                            brand: selectedBrand || {},
                                        }));
                                        setErrors((prevErrors) => ({
                                            ...prevErrors,
                                            brand: '', // Limpiar error al seleccionar
                                        }));
                                    }}
                                    className={`w-full p-2 border rounded ${errors?.brand ? 'border-red-500' : ''}`}
                                >
                                    <option value="">Seleccionar marca</option>
                                    {brands.map((brand) => (
                                        <option key={brand._id} value={brand._id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                                {errors?.brand && <p className="text-xs text-red-400">{errors.brand}</p>}
                            </div>
                            <div>
                                <label className='block mb-1'>Descripción<span className="pl-1 text-red-400 font-bold">*</span></label>
                                <ReactQuill
                                    theme="snow"
                                    value={form.description}
                                    onChange={(value) => setForm({ ...form, description: value })}
                                    placeholder="Descripción"
                                />
                            </div>
                            <div className="space-y-4">
                                {/* Botón para seleccionar manual */}
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setShowManualsModal(true)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                                    >
                                        Seleccionar Manual
                                    </button>
                                    {selectedManual && (
                                        <span className="text-gray-700 text-sm truncate">
                                            {selectedManual.name || 'Sin nombre'}
                                        </span>
                                    )}
                                </div>

                                {/* Modal para manuales */}
                                <FileListModal
                                    isOpen={showManualsModal}
                                    onClose={() => setShowManualsModal(false)}
                                    data={manuals}
                                    onSelect={handleSelectManual}
                                    title="Seleccionar Manual"
                                />

                                {/* Botón para seleccionar ficha técnica */}
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setShowSheetsModal(true)}
                                        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                                    >
                                        Seleccionar Ficha Técnica
                                    </button>
                                    {selectedSheet && (
                                        <span className="text-gray-700 text-sm truncate">
                                            {selectedSheet.name || 'Sin nombre'}
                                        </span>
                                    )}
                                </div>

                                {/* Modal para fichas técnicas */}
                                <FileListModal
                                    isOpen={showSheetsModal}
                                    onClose={() => setShowSheetsModal(false)}
                                    data={sheets}
                                    onSelect={handleSelectSheet}
                                    title="Seleccionar Ficha Técnica"
                                />
                            </div>
                            <div>
                                <div className='flex items-center pb-2 space-x-3'>
                                    <label className="block">Imagen</label>
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
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                            <Button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => handleCancel()}>Cancelar</Button>
                            <Button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>{isEditing ? 'Guardar cambios' : 'Crear'}</Button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ marginTop: 0 }}>
                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-1/3">
                        <h2 className="text-xl font-bold">Eliminar arrendamiento</h2>
                        <p>¿Estás seguro de que deseas eliminar el arrendamiento <strong>{selectedLeasing?.name}</strong>?</p>
                        <div className="flex justify-end space-x-2">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                            <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete}>Eliminar</button>
                        </div>
                    </div>
                </div>
            )}

            {showImagesListModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ marginTop: 0 }}>
                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-[50%] h-[80%]">
                        <h2 className="text-xl font-bold">Imágenes del Producto</h2>
                        <div className="grid grid-cols-3 gap-4 overflow-y-auto h-[85%]">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={image?.name}
                                    className="w-full h-full object-cover border-2 cursor-pointer"
                                    onClick={() => handleImageSelect(image.url)} // Asegúrate de pasar 'image.url' aquí
                                />
                            ))}
                            <div className="w-full m-auto">
                                <Pagination
                                    currentPage={imagesPage}
                                    totalPages={totalImagesPages}
                                    onPageChange={(newPage) => setImagesPage(newPage)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowImagesListModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LeasingsMenu
