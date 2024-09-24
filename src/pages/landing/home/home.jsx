import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import logo from '../../../uploads/home-page.png';
import NuestraEmpresa from '../../../components/home/nuestra-empresa';
import NuestrosClientes from '../../../components/home/nuestros-clientes';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Home = () => {
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

    return (
        <div className='w-full mx-auto'>
            <motion.div
                ref={homeRef}
                className="relative h-screen w-[90%] mx-auto grid grid-cols-2 items-center overflow-hidden"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={homeInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.2 }}
                transition={{ duration: 1.5 }}
            >
                <motion.div
                    className="relative z-10 text-left px-10"
                    initial={{ opacity: 0, x: -50 }}
                    animate={homeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.7, delay: 1 }}
                >
                    <h1 className="text-5xl font-bold mb-8">Innovación y eficiencia energética para un futuro sostenible</h1>
                    <p className="text-lg">En Gestión Energética estamos comprometidos con el uso eficiente de la energía y el cuidado del medio ambiente mediante el aprovechamiento responsable de las energías renovables.</p>
                </motion.div>
                <motion.div
                    className="relative h-full w-full flex justify-center items-center mx-auto"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={homeInView ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                >
                    <img
                        src={logo}
                        alt="Portada"
                        className="w-full h-auto object-cover"
                    />
                </motion.div>
            </motion.div>

            <div className='w-[90%] flex flex-col gap-y-12 mx-auto py-10'>
                <NuestraEmpresa />

                <NuestrosClientes />

                <motion.section
                    ref={successRef}  // Agregar ref a "Casos de éxito"
                    variants={fadeInUp}
                    initial="hidden"
                    animate={successInView ? "visible" : "hidden"}
                    transition={{ duration: 0.7, delay: 0.7 }}
                >
                    <h2 className='text-4xl font-bold pb-6'>Casos de éxito</h2>
                    {/* Agregar contenido relevante aquí */}
                </motion.section>

                <motion.section
                    ref={newsRef}  // Agregar ref a "Noticias"
                    variants={fadeInUp}
                    initial="hidden"
                    animate={newsInView ? "visible" : "hidden"}
                    transition={{ duration: 0.7, delay: 0.9 }}
                >
                    <h2 className='text-4xl font-bold pb-6'>Noticias</h2>
                    {/* Agregar contenido relevante aquí */}
                </motion.section>
            </div>
        </div>
    );
};

export default Home;
