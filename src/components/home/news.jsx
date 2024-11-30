import React, { useEffect, useState } from 'react'
import { getNews } from '../../services/NewService';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FaNewspaper } from 'react-icons/fa';
import { FaClockRotateLeft } from 'react-icons/fa6';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const NewsSlider = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try {
            const data = await getNews()
            setNews(data.slice(0, 3))
        } catch (error) {
            console.error("Error al cargar las noticias:", error)
        }
    }

    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const formatDateTime = (dateString) => {
        const date = new Date(dateString)
        const formattedDate = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')
        const formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        return `${formattedDate}, ${formattedTime}`
    }

    return (
        <div className="w-full py-8">
            <motion.section
                ref={sectionRef}
                className="max-w-6x mx-auto"
                variants={fadeInUp}
                initial="hidden"
                animate={sectionInView ? "visible" : "hidden"}
                transition={{ duration: 0.7, delay: 0.5 }}
            >
                <div className='flex py-4 items-center justify-between'>
                    <h2 className="text-2xl sm:text-4xl font-bold">Noticias</h2>
                    <Link to='/news'>
                        <h1 className='text-lg'>Ver todas</h1>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform"
                        >
                            <Link to={`/news/${item._id}`}>
                                <img
                                    src={item.image} // Asegúrate de que el backend envíe una URL válida para la imagen.
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                            </Link>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            </div>
                            <div className='flex w-full mx-auto space-x-4 justify-center my-4'>
                                <h1 className='flex items-center'>
                                    <FaNewspaper className='mr-1' />
                                    {formatDateTime(item.created)}
                                </h1>
                                <h1 className='flex items-center'>
                                    <FaClockRotateLeft className='mr-1' />
                                    {formatDateTime(item.lastModified)}
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section >
        </div >
    )
}

export default NewsSlider
