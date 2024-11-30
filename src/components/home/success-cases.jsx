import React, { useEffect, useState } from 'react';
import { getSuccess } from '@/services/SuccessService';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const SuccessCasesSlider = () => {
    const [success, setSuccess] = useState([]);

    useEffect(() => {
        fetchSuccess();
    }, []);

    const fetchSuccess = async () => {
        try {
            const data = await getSuccess();
            setSuccess(data.slice(0, 3)); // Solo tomar los primeros 3 elementos
        } catch (error) {
            console.error("Error fetching success cases:", error);
        }
    };

    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

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
                    <h2 className="text-2xl sm:text-4xl font-bold">Casos de Éxito</h2>
                    <Link to='/success-cases'>
                        <h1 className='text-lg'>Ver todos</h1>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {success.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform"
                        >
                            <Link to={`/success-cases/${item._id}`}>
                                <img
                                    src={item.image} // Asegúrate de que el backend envíe una URL válida para la imagen.
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                            </Link>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default SuccessCasesSlider;
