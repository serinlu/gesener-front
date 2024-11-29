import React from 'react'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardFooter, Button } from "@nextui-org/react";

import casos from '@/uploads/casos-exito.jpg';
import eficiencia from '@/uploads/eficiencia-energetica.jpg';
import termografia from '@/uploads/termografia-infrarroja.jpg';
import energias from '@/uploads/renewable-energy.jpg';
import capacitacion from '@/uploads/training.jpg';
import alquiler from '@/uploads/equipment-rental.jpeg';

const cards = [
    {
        title: 'Casos de éxito',
        image: casos,
    },
    {
        title: 'Eficiencia energética',
        image: eficiencia,
    },
    {
        title: 'Termografía infrarroja',
        image: termografia,
    },
    {
        title: 'Energías renovables',
        image: energias,
    },
    {
        title: 'Capacitación',
        image: capacitacion,
    },
    {
        title: 'Alquiler de equipos',
        image: alquiler,
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const NuestraEmpresa = () => {
    const { ref: section1Ref, inView: section1InView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div>
            <motion.section
                ref={section1Ref}
                className='w-full'
                variants={fadeInUp}
                initial="hidden"
                animate={section1InView ? "visible" : "hidden"}
                transition={{ duration: 0.7, delay: 0.3 }}
            >
                <h2 className='text-2xl sm:text-4xl font-bold pb-6'>Nuestra empresa</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            radius="lg"
                            className="border-none h-60 rounded-lg"
                        >
                            <img
                                alt={card.title}
                                src={card.image}
                                className="object-cover w-full h-full"
                            />
                            <CardFooter className="justify-between bg-white/10 backdrop-blur-lg border-white/20 border-1 overflow-hidden py-3 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small mx-1 z-10">
                                <p className="text-base text-white pl-3">{card.title}</p>
                                <Button
                                    className="text-sm text-white bg-black/20 p-2 group relative overflow-hidden transition-all duration-300 ease-in-out rounded-lg"
                                    variant="flat"
                                    color="default"
                                    radius="lg"
                                    size="sm"
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
    )
}

export default NuestraEmpresa
