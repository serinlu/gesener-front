import React, { useEffect, useState } from 'react'
import { getNewById } from '../../services/NewService'
import { Link, useParams } from 'react-router-dom'
import { FaNewspaper, FaClockRotateLeft, FaUser } from 'react-icons/fa6'

const New = () => {
    const { id } = useParams()
    const [notice, setNotice] = useState({})

    useEffect(() => {
        const fetchNew = async () => {
            const newItem = await getNewById(id)
            setNotice(newItem)
            console.log(notice)
        }
        fetchNew()
    }, [id])

    const formatDateTime = (dateString) => {
        const date = new Date(dateString)
        const formattedDate = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')
        const formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        return `${formattedDate}, ${formattedTime}`
    }

    return (
        <div className='w-full bg-white py-8'>
            <div className='w-[80%] mx-auto'>
                <div className='text-center mb-6'>
                    <Link to='/news'>
                        <h1 className='text-xl text-blue-600 font-bold my-6 hover:underline'>NOTICIAS</h1>
                    </Link>
                    <h1 className='text-4xl font-bold'>{notice.title}</h1>
                </div>
                <div className='md:flex w-full justify-center mx-auto md:space-x-4 md:py-6 pb-4 text-xl md:text-base space-y-2 md:space-y-0'>
                    <h1 className='flex items-center justify-center'><FaUser className='mr-1' /> Equipo de Gesener</h1>
                    <h1 className='flex items-center justify-center'><FaNewspaper className='mr-1' />
                        {formatDateTime(notice.created)}
                    </h1>
                    <h1 className='flex items-center justify-center'><FaClockRotateLeft className='mr-1' />
                        {formatDateTime(notice.lastModified)}
                    </h1>
                </div>
                <div className="flex justify-center">
                    <img
                        src={notice.image}
                        alt={notice.title}
                        className="w-auto max-w-full h-auto max-h-[500px] rounded-lg shadow-md"
                    />
                </div>

                <div
                    dangerouslySetInnerHTML={{ __html: notice.content }}
                    className='w-full mx-auto text-justify text-lg leading-relaxed my-8'
                />
            </div>
        </div>
    )
}

export default New
