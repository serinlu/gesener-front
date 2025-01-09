import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardFooter, Button } from "@nextui-org/react";
import { getImage } from '@/services/ImageService';

import casos from '@/uploads/casos-exito.jpg';
import eficiencia from '@/uploads/eficiencia-energetica.jpg';
import termografia from '@/uploads/termografia-infrarroja.jpg';
import energias from '@/uploads/renewable-energy.jpg';
import capacitacion from '@/uploads/training.jpg';
import alquiler from '@/uploads/equipment-rental.jpeg';
import { useNavigate } from 'react-router-dom';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};



const NuestraEmpresa = () => {
    const { ref: section1Ref, inView: section1InView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleRoute = (path) => {
        // Navegar a la ruta especificada
        navigate(path);
    };

    useEffect(() => {
        const fetchImages = async () => {
            const imgNames = [
                'casos-exito.jpg',
                'eficiencia-energetica.png',
                'termografia-infrarroja.jpg',
                'energias-renovables.jpg',
                'capacitacion.jpg',
                'alquiler.jpg',
            ];

            try {
                const imgs = await getImage(imgNames);
                setImages(imgs); // Guardar las imágenes obtenidas
                console.log(images[1])
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const pics = [
        {
            title: 'Casos de éxito',
            image: images[0]?.url,
            path: '/success-cases'
        },
        {
            title: 'Eficiencia energética',
            image: images[1]?.url,
            path: '/solutions/energy-efficiency'
        },
        {
            title: 'Termografía infrarroja',
            image: images[2]?.url,
            path: '/solutions/infrared-thermography'
        },
        {
            title: 'Energías renovables',
            image: images[3]?.url,
            path: '/solutions/renewable-energy'
        },
        {
            title: 'Capacitación',
            image: images[4]?.url,
            path: '/solutions/training'
        },
        {
            title: 'Alquiler de equipos',
            image: images[5]?.url,
            path: '/solutions/equipment-rental'
        },
    ];

    return (
        <div>
            <motion.section
                ref={section1Ref}
                className="w-full"
                variants={fadeInUp}
                initial="hidden"
                animate={section1InView ? "visible" : "hidden"}
                transition={{ duration: 0.7, delay: 0.3 }}
            >
                <h2 className="text-2xl sm:text-4xl font-bold pb-6">Nuestra empresa</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {pics.map((ca, index) => (
                        <Card
                            key={index}
                            radius="lg"
                            className="border-none h-60 rounded-lg"
                        >
                            <img
                                alt={ca.title}
                                src={pics[index] || ca.image} // Usar la imagen dinámica o la estática como fallback
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    e.target.src = ca.image; // Fallback a la imagen estática si hay un error
                                }}
                            />
                            <CardFooter className="justify-between bg-white/10 backdrop-blur-lg border-white/20 border-1 overflow-hidden py-3 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small mx-1 z-10">
                                <p className="text-base text-white pl-3">{ca.title}</p>
                                <Button
                                    className="text-sm text-white bg-black/20 p-2 group relative overflow-hidden transition-all duration-300 ease-in-out rounded-lg"
                                    variant="flat"
                                    color="default"
                                    radius="lg"
                                    size="sm"
                                    onClick={() => handleRoute(ca.path)}
                                >
                                    <span className="relative z-10 group-hover:scale-105 transition-transform duration-300 ease-in-out">
                                        Explorar
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default NuestraEmpresa;

