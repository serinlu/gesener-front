import React, { useEffect, useState } from 'react'
import TitleSection from '../../components/TitleSection'
import { getNews } from '../../services/NewService'
import { Link } from 'react-router-dom'

const NewsPage = () => {
    const [news, setNews] = useState([])

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await getNews()  // Se asume que getNews retorna un array
                setNews(data)
            } catch (error) {
                console.error("Error al cargar las noticias:", error)
            }
        }
        fetchImages()
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
                    {Array.isArray(news) && news.length > 0 ? (
                        news.map((newsItem) => (
                            <div key={newsItem._id} className='bg-white p-4 rounded-lg shadow-lg'>
                                <img src={newsItem.image} alt={newsItem.title} className='w-full h-48 object-cover rounded-t-lg' />
                                <div className='mt-4'>
                                    <Link to={`/news/${newsItem._id}`}>
                                        <h2 className='text-xl font-bold'>{newsItem.title}</h2>
                                    </Link>
                                    <p className='text-base mt-2'>{formatDateTime(newsItem.created)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay noticias disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewsPage
