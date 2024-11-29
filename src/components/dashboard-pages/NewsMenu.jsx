import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { createNew, getNews, updateNew, deleteNew } from '@/services/NewService'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const NewsMenu = () => {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true) // Estado de carga
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedNew, setSelectedNew] = useState(null)
  const [form, setForm] = useState({
    title: '',
    content: '',
    image: '',
    video: ''
  })

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = () => {
    setIsLoading(true) // Inicia el estado de carga
    getNews()
      .then(data => {
        setNews(data)
      })
      .catch(error => console.error('error al obtener las noticias', error))
      .finally(() => setIsLoading(false)) // Finaliza el estado de carga
  }

  const openModal = (notice = null) => {
    if (notice) {
      setIsEditing(true)
      setSelectedNew(notice)
      setForm({
        title: notice.title,
        content: notice.content,
        image: notice.image || '',
        video: notice.video || ''
      })
    } else {
      setIsEditing(false)
      setSelectedNew(null)
      setForm({
        title: '',
        content: '',
        image: '',
        video: ''
      })
    }
    setShowModal(true)
  }

  const handleSave = async () => {
    if (isEditing) {
      if (!selectedNew) return
      handleEdit()
    } else {
      handleCreate()
    }
    setShowModal(false)
  }

  const handleCreateClick = () => {
    setForm({
      title: '',
      content: '',
      image: '',
      video: ''
    })
    setShowCreateModal(true)
  }

  const handleCreate = async () => {
    const newNotice = {
      title: form.title,
      content: form.content,
      image: form.image,
      video: form.video
    }

    try {
      const response = await createNew(newNotice)

      if (response) {
        fetchNews()
        setShowCreateModal(false)
      }
    } catch (error) {
      console.error('Error al crear la noticia:', error)
    }
  }

  const handleEditClick = (notice) => {
    setShowEditModal(true)
    setForm({
      title: notice.title,
      content: notice.content,
      image: notice.image,
      video: notice.video
    })
    setSelectedNew(notice)
  }

  const handleEdit = () => {
    if (!selectedNew) return
    const updatedNew = {
      _id: selectedNew._id,
      title: form.title,
      content: form.content,
      image: form.image,
      video: form.video
    }

    updateNew(selectedNew._id, updatedNew)
      .then((response) => {
        console.log('noticia actualizada', response)
        fetchNews()
        setShowEditModal(false)
      }).catch((error) => {
        console.error('Error al actualizar la noticia:', error)
      }).finally(() => setShowModal(false));

  }
  const handleDeleteClick = (notice) => {
    setSelectedNew(notice)
    setShowDeleteModal(true)
  }

  const handleDelete = () => {
    deleteNew(selectedNew._id)
      .then(() => {
        fetchNews()
        setShowDeleteModal(false)
        console.log('noticia eliminada', selectedNew)
      })
      .catch((error) => console.error(error))
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
          onPress={() => openModal()}
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
            <div className="text-center">Cargando noticias...</div>
          ) : news.length > 0 ? (
            news.map((notice) => (
              <div key={notice.id} className='grid grid-cols-4 items-center gap-4 p-2'>
                <h1 className='flex items-center'>{notice.title}</h1>
                <h1 className='flex items-center'>{formatDateTime(notice.created)}</h1>
                <h1>{formatDateTime(notice.lastModified)}</h1>
                <div className="col-span-1 flex justify-start items-center space-x-2 text-base">
                  <Button
                    className='bg-green-500 rounded-md flex items-center justify-center py-2 px-3'
                    onPress={() => openModal(notice)}
                  >
                    <FaEdit className="text-white text-sm" />
                  </Button>
                  <Button
                    className='bg-red-500 rounded-md flex items-center justify-center py-2 px-3'
                    onPress={() => handleDeleteClick(notice)}
                  >
                    <FaTrash className="text-white text-sm" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center'>No hay noticias</div>
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
                  value={form.content}
                  onChange={(value) => setForm({ ...form, content: value })}
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
              <p>¿Estás seguro de que deseas eliminar la noticia <strong>{selectedNew?.title}</strong>?</p>
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

export default NewsMenu
