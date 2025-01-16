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
            <div className="relative w-full h-auto">
                <video
                    src={portadaVid}
                    autoPlay
                    loop
                    muted
                    className="w-full h-auto"
                ></video>
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent z-0">
                    <div className='w-[80%] mx-auto gap-x-4 justify-center space-y-4'>
                        <h1 className='text-white text-center text-4xl font-bold pt-4'>
                            Optimizamos recursos energéticos para un futuro eficiente y sostenible en tu organización
                        </h1>
                        <div className='flex mx-auto justify-center'>
                            <Button className='px-4 text-xl text-white bg-blue-500 rounded-xl font-bold pointer-events-auto' onClick={handleUs}>
                                Descubre más
                            </Button>
                        </div>
                    </div>
                </div>
            </div>






            {/* <motion.div
                ref={homeRef}
                className="lg:relative h-auto w-[90%] mx-auto grid lg:grid-cols-2 grid-cols-1 items-center overflow-hidden gap-y-10 lg:gap-y-0 my-16"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={homeInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.2 }}
                transition={{ duration: 1.5 }}
            >
                <motion.div
                    className="relative z-10 text-left px-6 lg:px-10"
                    initial={{ opacity: 0, x: -50 }}
                    animate={homeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.7, delay: 1 }}
                >
                    <p className="text-4xl lg:text-5xl font-bold lg:leading-tight">
                        Soluciones en energía eléctrica a su medida
                    </p>

                    <h1 className='text-xl my-4'>
                        Soluciones para condominios, edificios y departamentos
                    </h1>
                </motion.div>
                <motion.div
                    className="relative w-full flex justify-center items-center mx-auto lg:max-w-[80%] lg:my-32"
                    style={{ aspectRatio: "16/9" }}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={homeInView ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                >
                    <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
                        <img
                            src={portada}
                            alt="Portada"
                            className="absolute top-0 left-0 w-full h-full object-contain scale-100 lg:scale-125" 
                        />
                    </div>
                </motion.div>
            </motion.div> */}


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
