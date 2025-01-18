import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import NuestraEmpresa from '@/components/home/nuestra-empresa';
import NuestrosClientes from '@/components/home/nuestros-clientes';
import { getImage } from '@/services/ImageService';
import { Helmet } from 'react-helmet-async';
import SuccessCasesSlider from '../../../components/home/success-cases';
import NewsSlider from '../../../components/home/news';
import portada from '@/uploads/portada.webp'
import portadaVid from '@/uploads/videos/portada.webm'
import { Button } from '@nextui-org/react';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Home = () => {
    const [logoImage, setLogoImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const mainImage = async () => {
            const image = await getImage('home.png');
            console.log(image);
            if (image) {
                setLogoImage(image)
            }
        }
        mainImage()
    }, [])

    const { ref: homeRef, inView: homeInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { ref: successRef, inView: successInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { ref: newsRef, inView: newsInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const handleUs = () => {
        navigate('/us');
    }

    return (
        <div className='w-full mx-auto'>
            <div className="relative w-full h-screen">
                {/* Video */}
                <video
                    src={portadaVid}
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover"
                ></video>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
                {/* Content */}
                <div className="absolute left-8 right-8 bottom-20 z-20 sm:flex space-y-4 items-center justify-between sm:left-12 sm:right-12">
                    <h1 className="text-white text-xl sm:text-2xl md:text-4xl font-bold sm:w-1/2 md:max-w-3xl leading-tight">
                        Optimizamos recursos energéticos para un futuro eficiente y sostenible en tu organización
                    </h1>
                    <Button
                        className="px-4 py-2 text-sm sm:text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 flex items-center justify-center"
                        onClick={handleUs}
                    >
                        Descubre más
                    </Button>
                </div>
            </div>


            <div className='w-[90%] flex flex-col gap-y-12 mx-auto py-10'>
                <NuestraEmpresa />
                <NuestrosClientes />
                <SuccessCasesSlider />
                <NewsSlider />
            </div>
        </div>
    );
};

export default Home;
