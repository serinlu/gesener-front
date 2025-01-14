import React, { useEffect, useState } from 'react'
import { listSheets, uploadSheet, deleteSheet } from '@/services/SheetService';
import { enqueueSnackbar } from 'notistack';
import Spinner from '@/components/Spinner';
import Pagination from '@/components/dashboard-pages/Pagination';
import { Button } from '@nextui-org/react';
import { FaEye, FaPlus, FaTrash } from 'react-icons/fa';

const ManualsMenu = () => {
    const [showUploadFileModal, setShowUploadFileModal] = useState(false);
    const [showDeleteFileModal, setShowDeleteFileModal] = useState(false);
    const [showViewFileModal, setShowViewFileModal] = useState(false);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [page, setPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [createLoading, setCreateLoading] = useState(false);

    const formatSize = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    useEffect(() => {
        fetchSheets(page)
    }, [page])

    const fetchSheets = (page) => {
        setLoading(true);
        listSheets(page)
            .then((data) => {
                setFiles(data.data); // Aseguramos que estamos usando 'data' para las imágenes
                setTotalPages(data.totalPages); // Aseguramos que usamos 'totalPages' del backend
                setLoading(false);
                console.log(files)
            })
            .catch((error) => {
                console.error("Error al obtener los archivos:", error);
                setLoading(false);
            });
    }

    const handleCreateClick = () => {
        setShowUploadFileModal(true);
        setFile(null);
    };

    const handleCreate = async () => {
        if (!file) {
            console.error("No se ha seleccionado ningún archivo");
            return;
        }

        try {
            setCreateLoading(true);
            const response = await uploadSheet(file); // Aquí pasamos solo el archivo
            if (response) {
                fetchSheets(page); // Volver a cargar las imágenes en la misma página
                setShowUploadFileModal(false);
                enqueueSnackbar("Archivo subido correctamente", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right",
                    },
                    transitionDuration: 200,
                });
            }
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            enqueueSnackbar("Error al subir el archivo", {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
                transitionDuration: 200,
            });
        } finally {
            setCreateLoading(false);
        }
    };

    const handleDelete = async () => {
        if (selectedFile) {
            try {
                await deleteManual(selectedFile.name);
                fetchSheets(page);
                setShowDeleteFileModal(false);
            } catch (error) {
                console.error("Error al eliminar el archivo:", error);
            }
        }
    };

    return (
        <div>
            <div className="mb-3 flex justify-end">
                <Button
                    className="p-3 text-sm w-[5%] flex text-white font-bold rounded-xl bg-blue-600"
                    onPress={handleCreateClick}
                >
                    <FaPlus />
                </Button>
            </div>
            <div className="bg-white w-full p-4 rounded-lg h-auto space-y-2">
                <div className="p-2 h-auto grid grid-cols-3 text-gray-400 border-b-1 border-gray-200">
                    <h1>NOMBRE</h1>
                    <h1>TAMAÑO</h1>
                    <h1>ACCIONES</h1>
                </div>
                <div className="p-2 text-black space-y-2">
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <Spinner color="blue" />
                        </div>
                    ) : files.length > 0 ? (
                        files.map((file) => (
                            <div key={file._id} className="grid grid-cols-3 items-center">
                                <h1>{file.name}</h1>
                                <h1>{formatSize(file.size)}</h1>
                                <div className="col-span-1 flex space-x-2 text-base items-left">
                                    <Button
                                        className="bg-yellow-500 rounded-md w-1/8 flex items-center justify-start py-2 hover:bg-yellow-600"
                                        onPress={() => {
                                            window.open(file.url, '_blank'); // Abre en una nueva pestaña
                                        }}
                                    >
                                        <FaEye />
                                    </Button>
                                    <Button
                                        className="bg-red-500 rounded-md w-1/8 flex items-center justify-start py-2 hover:bg-red-600"
                                        onPress={() => {
                                            setSelectedFile(file);
                                            setShowDeleteFileModal(true);
                                        }}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>No hay archivos</h1>
                    )}
                </div>
                {/* Paginación */}
                <div className="w-full m-auto">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </div>
                {showUploadFileModal && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
                        style={{ marginTop: 0 }}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="bg-white p-4 rounded-lg w-[30%]">
                                <h1 className="text-center mb-4">Cargar archivo</h1>
                                <input
                                    type="file"
                                    accept="file/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="w-full p-2 rounded-md border border-gray-300"
                                />
                                <div className="flex justify-end mt-4 space-x-2">
                                    <Button
                                        className="border border-red-500 px-4 py-2 rounded-lg"
                                        onClick={() => setShowUploadFileModal(false)}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        color="success"
                                        variant="bordered"
                                        className="border bg-blue-100 rounded-lg border-blue-500 hover:bg-blue-200 transition-colors font-normal"
                                        onClick={handleCreate}
                                        isDisabled={createLoading}
                                    >
                                        {createLoading ? <Spinner color="blue" /> : "Cargar"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showDeleteFileModal && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
                        style={{ marginTop: 0 }}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="bg-white p-4 rounded-lg w-[30%]">
                                <h1 className="text-center mb-4">Eliminar Archivo</h1>
                                <h1>Estás seguro de eliminar este archivo?</h1>
                                <h1 className="font-bold">{selectedFile?.name}</h1>
                                <div className="flex justify-end mt-4 space-x-2">
                                    <Button
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                        onClick={() => setShowDeleteFileModal(false)}
                                    >
                                        CANCELAR
                                    </Button>
                                    <Button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={handleDelete}
                                    >
                                        ELIMINAR
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManualsMenu
