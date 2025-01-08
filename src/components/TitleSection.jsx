import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getImage } from '@/services/ImageService';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const titles = {
    '/solutions/energy-efficiency': 'Eficiencia energética',
    '/solutions/equipment-rental': 'Alquiler de equipos',
    '/solutions/infrared-thermography': 'Termografía infrarroja',
    '/solutions/renewable-energy': 'Energía renovable',
    '/solutions/training': 'Capacitaciones',
    '/us': 'Nosotros',
    '/news': 'Noticias',
    '/success-cases': 'Casos de éxito'
};

const TitleSection = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const title = titles[currentPath] || 'Página no encontrada'

    const [imgs, setImgs] = useState({});
    const [isLoaded, setIsLoaded] = useState(false); // controla la carga completa de las imágenes
    const [isVisible, setIsVisible] = useState(false); // controla cuándo iniciar la animación

    useEffect(() => {
        const fetchImages = async () => {
            const imgsNames = [
                'eficiencia-energetica.png',
                'alquiler.jpg',
                'termografia-infrarroja.jpg',
                'energias-renovables.jpg',
                'capacitacion.jpg',
                'nosotros.jpg',
                'news.jpeg',
                'casos-exito.jpg'
            ];

            try {
                const imageUrls = await Promise.all(imgsNames.map(getImage));

                const imagesMap = {
                    '/solutions/energy-efficiency': imageUrls[0].url,
                    '/solutions/equipment-rental': imageUrls[1].url,
                    '/solutions/infrared-thermography': imageUrls[2].url,
                    '/solutions/renewable-energy': imageUrls[3].url,
                    '/solutions/training': imageUrls[4].url,
                    '/us': imageUrls[5].url,
                    '/news': imageUrls[6].url,
                    '/success-cases': imageUrls[7].url,
                };

                setImgs(imagesMap);
                setIsLoaded(true); // se establece una vez cargadas todas las imágenes
            } catch (error) {
                console.error("Error al cargar las imágenes:", error);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const timer = setTimeout(() => setIsVisible(true), 500); // animación después de la carga
            return () => clearTimeout(timer);
        }
    }, [isLoaded]);

    return (
        <div>
            <Helmet>
                <title>{`${title} | Gesener`}</title>
                <meta
                    name="description"
                    content={`Explora más sobre ${title.toLowerCase()}. ${title}.`}
                />
            </Helmet>
            <div className="relative w-full object-cover h-[70vh]" style={{ aspectRatio: '16/9' }}>
                <motion.img
                    src={imgs[currentPath]}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0 }}
                />
                <motion.h1
                    className="absolute bottom-0 left-0 text-4xl p-10 md:p-14 w-full font-bold sm:text-6xl text-white"
                    initial={{ opacity: 0, translateY: 10 }}
                    animate={isVisible ? { opacity: 1, translateY: 0 } : {}}
                    transition={{ duration: 1 }}
                >
                    {title}
                </motion.h1>
            </div>
        </div>
    );
};

export default TitleSection;
