import React, { useEffect, useState } from 'react'
import { getSuccess } from '@/services/SuccessService'
import TitleSection from '@/components/TitleSection'
import { Link } from 'react-router-dom'

const SuccessCases = () => {
    const [successCases, setSuccessCases] = useState([])

    useEffect(() => {
        const fetchSuccessCases = async () => {
            try {
                const data = await getSuccess()
                setSuccessCases(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchSuccessCases()
    }, [])

    const formatDateTime = (dateString) => {
        const date = new Date(dateString)
        const formattedDate = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')
        const formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        return `${formattedDate}, ${formattedTime}`
    }

    return (
        <div className='font-sans pb-10'>
            <TitleSection />
            <div className='w-[80%] mx-auto mt-8'>
                {/* Grid para mostrar las cards en 4 columnas */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                    {/* Solo intentamos mapear si news es un array */}
                    {Array.isArray(successCases) && successCases.length > 0 ? (
                        successCases.map((successItem) => (
                            <div key={successItem._id} className='bg-white p-4 rounded-lg shadow-lg'>
                                <img src={successItem.image} alt={successItem.title} className='w-full h-48 object-cover rounded-t-lg' loading='lazy'/>
                                <div className='mt-4'>
                                    <Link to={`/success-cases/${successItem._id}`}>
                                        <h2 className='text-xl font-bold'>{successItem.title}</h2>
                                    </Link>
                                    <p className='text-base mt-2'>{formatDateTime(successItem.created)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay casos de éxito disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SuccessCases
