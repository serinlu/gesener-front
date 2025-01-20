import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NuestraEmpresa from '@/components/home/nuestra-empresa';
import NuestrosClientes from '@/components/home/nuestros-clientes';
import { Helmet } from 'react-helmet-async';
import SuccessCasesSlider from '../../../components/home/success-cases';
import NewsSlider from '../../../components/home/news';
import portadaVid from '@/uploads/videos/portada.webm';
import { Button } from '@nextui-org/react';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Home = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false); // Estado para rastrear la carga del video
    const navigate = useNavigate();

    const handleUs = () => {
        navigate('/us');
    };

    return (
        <div className="w-full mx-auto">
            <div className="relative w-full h-screen z-0">
                {/* Video */}
                <video
                    src={portadaVid}
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                    onLoadedData={() => setIsVideoLoaded(true)} // Marca el video como cargado
                ></video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>

                {/* Content */}
                <div className="absolute left-8 right-8 bottom-20 z-20 space-y-4 items-center justify-between sm:left-12 sm:right-12">
                    {/* Texto */}
                    <motion.h1
                        initial="hidden"
                        animate={isVideoLoaded ? "visible" : "hidden"}
                        variants={fadeInUp}
                        transition={{ duration: 0.8 }}
                        className="text-white text-xl sm:text-2xl md:text-4xl font-bold sm:w-1/2 md:max-w-3xl leading-tight"
                    >
                        Optimizamos recursos energéticos para un futuro eficiente y sostenible en tu organización
                    </motion.h1>

                    {/* Botón */}
                    <motion.div
                        initial="hidden"
                        animate={isVideoLoaded ? "visible" : "hidden"}
                        variants={fadeInUp}
                        transition={{ duration: 0.8, delay: 1 }} // Retraso de 1 segundo
                    >
                        <Button
                            className="px-4 py-2 text-sm sm:text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 flex items-center justify-center"
                            onClick={handleUs}
                        >
                            Descubre más
                        </Button>
                    </motion.div>
                </div>
            </div>

            <div className="w-[90%] flex flex-col gap-y-12 mx-auto py-10">
                <NuestraEmpresa />
                <NuestrosClientes />
                <SuccessCasesSlider />
                <NewsSlider />
            </div>
        </div>
    );
};

export default Home;
