import Pagination from "@/components/dashboard-pages/Pagination";
import { deleteImage, getImages, uploadImages } from "@/services/ImageService";
import { Button } from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FaEye, FaPlus, FaTrash } from "react-icons/fa";
import Spinner from "@/components/Spinner";

const ImagesMenu = () => {
  const [showUploadImageModal, setShowUploadImageModal] = useState(false);
  const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);
  const [showViewImageModal, setShowViewImageModal] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [page, setPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [createLoading, setCreateLoading] = useState(false);

  // Función para formatear el tamaño
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const fetchImages = (page) => {
    setLoading(true);
    getImages(page)
      .then((data) => {
        setImages(data.data); // Aseguramos que estamos usando 'data' para las imágenes
        setTotalPages(data.totalPages); // Aseguramos que usamos 'totalPages' del backend
        setLoading(false);
        console.log(images)
      })
      .catch((error) => {
        console.error("Error al obtener imágenes:", error);
        setLoading(false);
      });
  };

  const handleCreateClick = () => {
    setShowUploadImageModal(true);
    setFiles([]);
  };

  const handleCreate = async () => {
    if (!files.length) {
      console.error("No se han seleccionado archivos");
      return;
    }

    try {
      setCreateLoading(true);
      const response = await uploadImages(files); // Usar el servicio de múltiples imágenes
      if (response) {
        fetchImages(page);
        setShowUploadImageModal(false);
        enqueueSnackbar("Imágenes subidas correctamente", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          transitionDuration: 200,
        });
      }
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
      enqueueSnackbar("Error al subir las imágenes", {
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
    if (selectedImage) {
      try {
        await deleteImage(selectedImage.name);
        fetchImages(page);
        setShowDeleteImageModal(false);
      } catch (error) {
        console.error("Error al eliminar la imagen:", error);
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
        <div className="p-2 h-auto grid grid-cols-4 text-gray-400 border-b-1 border-gray-200">
          <h1>PREVISUALIZACIÓN</h1>
          <h1>NOMBRE</h1>
          <h1>TAMAÑO</h1>
          <h1>ACCIONES</h1>
        </div>
        <div className="p-2 text-black space-y-2">
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner color="blue" />
            </div>
          ) : images.length > 0 ? (
            images.map((image) => (
              <div key={image._id} className="grid grid-cols-4 items-center">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-20 h-20 object-cover"
                />
                <h1>{image.name}</h1>
                <h1>{formatSize(image.size)}</h1>
                <div className="col-span-1 flex space-x-2 text-base items-left">
                  <Button
                    className="bg-yellow-500 rounded-md w-1/8 flex items-center justify-start py-2 hover:bg-yellow-600"
                    onPress={() => {
                      setSelectedImage(image);
                      setShowViewImageModal(true);
                    }}
                  >
                    <FaEye />
                  </Button>
                  <Button
                    className="bg-red-500 rounded-md w-1/8 flex items-center justify-start py-2 hover:bg-red-600"
                    onPress={() => {
                      setSelectedImage(image);
                      setShowDeleteImageModal(true);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <h1>No hay imágenes</h1>
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
        {showViewImageModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
            style={{ marginTop: 0 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg w-[30%] space-y-3">
                <h1 className="font-bold text-base">{selectedImage?.name}</h1>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="w-full h-full object-cover"
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowViewImageModal(false)}
                  >
                    CERRAR
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showUploadImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10" style={{ marginTop: 0 }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg w-[30%]">
                <h1 className="text-center mb-4">Cargar imágenes</h1>
                <input
                  type="file"
                  accept="image/*"
                  multiple // Permitir múltiples imágenes
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                  className="w-full p-2 rounded-md border border-gray-300"
                />
                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    className="border border-red-500 px-4 py-2 rounded-lg"
                    onClick={() => setShowUploadImageModal(false)}
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
        {showDeleteImageModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
            style={{ marginTop: 0 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg w-[30%]">
                <h1 className="text-center mb-4">Eliminar Imagen</h1>
                <h1>Estás seguro de eliminar esta imagen?</h1>
                <h1 className="font-bold">{selectedImage?.name}</h1>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowDeleteImageModal(false)}
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

export default ImagesMenu;
