import React, { useEffect, useState } from 'react'
import { getSuccessById } from '../../services/SuccessService'
import { Link, useParams } from 'react-router-dom'
import { FaNewspaper, FaUser } from 'react-icons/fa'
import { FaClockRotateLeft } from 'react-icons/fa6'

const ViewSuccessCase = () => {
    const { id } = useParams()
    const [success, setSuccess] = useState({})

    useEffect(() => {
        const fetchSuccess = async () => {
            const successItem = await getSuccessById(id)
            setSuccess(successItem)
        }
        fetchSuccess()
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
                    <h1 className='text-4xl font-bold'>{success.title}</h1>
                </div>
                <div className='flex w-full justify-center mx-auto space-x-4'>
                    <h1 className='flex items-center'><FaUser className='mr-1' /> Equipo de Gesener</h1>
                    <h1 className='flex items-center'><FaNewspaper className='mr-1' />
                        {formatDateTime(success.created)}
                    </h1>
                    <h1 className='flex items-center'><FaClockRotateLeft className='mr-1' />
                        {formatDateTime(success.lastModified)}
                    </h1>
                </div>
                <div className='mx-auto my-12'>
                    {success.image && (
                        <div className='w-full max-w-[80%] h-[500px] overflow-hidden mx-auto rounded-lg shadow-md'>
                            <img
                                src={success.image}
                                alt={success.title}
                                className='w-full h-full object-cover'
                                style={{ objectPosition: 'center' }}
                            />
                        </div>
                    )}
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: success.description }}
                    className='w-full mx-auto text-justify text-lg leading-relaxed my-8'
                />
            </div>
        </div>
    )
}

export default ViewSuccessCase
