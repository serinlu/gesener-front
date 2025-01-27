import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardFooter, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

import casos from '@/uploads/casos-exito-opt.webp';
import eficiencia from '@/uploads/eficiencia-energetica.webp';
import termografia from '@/uploads/termografia-infrarroja.webp';
import energias from '@/uploads/energias-renovables.webp';
import capacitacion from '@/uploads/capacitacion.webp';
import arrendamiento from '@/uploads/alquiler.webp';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const NuestraEmpresa = () => {
    const { ref: section1Ref, inView: section1InView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const navigate = useNavigate();

    const handleRoute = (path) => {
        // Navegar a la ruta especificada
        navigate(path);
    };

    const pics = [
        {
            title: 'Casos de éxito',
            image: casos,
            path: '/success-cases'
        },
        {
            title: 'Eficiencia energética',
            image: eficiencia,
            path: '/solutions/energy-efficiency'
        },
        {
            title: 'Termografía infrarroja',
            image: termografia,
            path: '/solutions/infrared-thermography'
        },
        {
            title: 'Energías renovables',
            image: energias,
            path: '/solutions/renewable-energy'
        },
        {
            title: 'Capacitación',
            image: capacitacion,
            path: '/solutions/training'
        },
        {
            title: 'Arrendamiento',
            image: arrendamiento,
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
                                src={ca.image} // Usar la imagen dinámica o la estática como fallback
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    e.target.src = ca.image; // Fallback a la imagen estática si hay un error
                                }}
                            />
                            <CardFooter className="justify-between bg-white/10 backdrop-blur-lg border-white/20 border-1 overflow-hidden py-3 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small mx-1 z-10">
                                <p className="text-base text-white pl-3">{ca.title}</p>
                                <Button
                                    className="text-sm text-white bg-black/20 items-center group relative overflow-hidden transition-all duration-300 ease-in-out rounded-lg"
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

