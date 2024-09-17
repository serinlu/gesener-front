import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import './home.css';
import { Scrollbar, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import logo from '../../../uploads/home-page.png';
import casos from '../../../uploads/casos-exito.jpg';
import eficiencia from '../../../uploads/eficiencia-energetica.jpg';
import termografia from '../../../uploads/termografia-infrarroja.jpg';
import energias from '../../../uploads/renewable-energy.jpg';
import capacitacion from '../../../uploads/training.jpg';
import alquiler from '../../../uploads/equipment-rental.jpeg';
import { Card, CardFooter, Button } from "@nextui-org/react";

import antamina from '../../../uploads/clientes/antamina.png';
import bbva from '../../../uploads/clientes/bbva.png';
import congreso from '../../../uploads/clientes/congreso.png';
import cye from '../../../uploads/clientes/cye.png';
import incn from '../../../uploads/clientes/incn.png';
import minrelex from '../../../uploads/clientes/minrelex.png';
import senamhi from '../../../uploads/clientes/senamhi.png';
import sodexo from '../../../uploads/clientes/sodexo.png';
import sutran from '../../../uploads/clientes/sutran.png';
import tecsup from '../../../uploads/clientes/tecsup.png';
import usil from '../../../uploads/clientes/usil.png';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Home = () => {
    const { ref: homeRef, inView: homeInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const { ref: section1Ref, inView: section1InView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const { ref: section2Ref, inView: section2InView } = useInView({
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
                <motion.section
                    ref={section1Ref}
                    className='w-full'
                    variants={fadeInUp}
                    initial="hidden"
                    animate={section1InView ? "visible" : "hidden"}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <h2 className='text-4xl font-bold pb-6'>Nuestra empresa</h2>
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4'>
                        <Card
                            radius="lg"
                            className="border-none h-60"
                        >
                            <img
                                alt="Casos de éxito"
                                src={casos}
                                className="object-cover w-full h-full"
                            />
                            <CardFooter className="justify-between bg-white/10 backdrop-blur-lg border-white/20 border-1 overflow-hidden py-3 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small mx-1 z-10">
                                <p className="text-base text-white pl-3">Casos de éxito</p>
                                <Button
                                    className="text-sm text-white bg-black/20 p-2 group relative overflow-hidden transition-all duration-300 ease-in-out"
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
                        <Card
                            radius="lg"
                            className="border-none h-60"
                        >
                            <img
                                alt="Eficiencia energética"
                                src={eficiencia}
                                className="object-cover w-full h-full"
                            />
                            <CardFooter className="justify-between bg-white/10 backdrop-blur-lg border-white/20 border-1 overflow-hidden py-3 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small mx-1 z-10">
                                <p className="text-base text-white pl-3">Eficiencia energética</p>
                                <Button
                                    className="text-sm text-white bg-black/20 p-2 group relative overflow-hidden transition-all duration-300 ease-in-out"
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
                        <Card
                            radius="lg"
                            className="border-none h-60"
                        >
                            <img
                                alt="Termografía infrarroja"
                                src={termografia}
                                className="object-cover w-full h-full"
                            />
                            <CardFooter className="justify-between bg-white/10 backdrop-blur-lg border-white/20 border-1 overflow-hidden py-3 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small mx-1 z-10">
                                <p className="text-base text-white pl-3">Termografía infrarroja</p>
                                <Button
                                    className="text-sm text-white bg-black/20 p-2 group relative overflow-hidden transition-all duration-300 ease-in-out"
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
                        <Card
                            radius="lg"
                            className="border-none h-60"
                        >
                            <img
                                alt="Energías renovables"
                                src={energias}
                                className="object-cover w-full h-full"
                            />
                            <CardFooter className="justify-between bg-white/10 backdrop-blur-lg border-white/20 border-1 overflow-hidden py-3 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small mx-1 z-10">
                                <p className="text-base text-white pl-3">Energías renovables</p>
                                <Button
                                    className="text-sm text-white bg-black/20 p-2 group relative overflow-hidden transition-all duration-300 ease-in-out"
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
                        <Card
                            radius="lg"
                            className="border-none h-60"
                        >
                            <img
                                alt="Capacitación"
                                src={capacitacion}
                                className="object-cover w-full h-full"
                            />
                            <CardFooter className="justify-between bg-white/10 backdrop-blur-lg border-white/20 border-1 overflow-hidden py-3 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small mx-1 z-10">
                                <p className="text-base text-white pl-3">Capacitación</p>
                                <Button
                                    className="text-sm text-white bg-black/20 p-2 group relative overflow-hidden transition-all duration-300 ease-in-out"
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
                        <Card
                            radius="lg"
                            className="border-none h-60"
                        >
                            <img
                                alt="Alquiler de equipos"
                                src={alquiler}
                                className="object-cover w-full h-full"
                            />
                            <CardFooter className="justify-between bg-white/10 backdrop-blur-lg border-white/20 border-1 overflow-hidden py-3 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small mx-1 z-10">
                                <p className="text-base text-white pl-3">Alquiler de equipos</p>
                                <Button
                                    className="text-sm text-white bg-black/20 p-2 group relative overflow-hidden transition-all duration-300 ease-in-out"
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
                    </div>
                </motion.section>

                <motion.section
                    ref={section2Ref}
                    className='w-full'
                    variants={fadeInUp}
                    initial="hidden"
                    animate={section2InView ? "visible" : "hidden"}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    <h2 className='text-4xl font-bold pb-6'>Nuestros clientes</h2>
                    <div className='h-[20rem]'>
                        <Swiper
                            scrollbar={{ hide: true }}
                            modules={[Scrollbar, Autoplay]}
                            className="mySwiper"
                            slidesPerView={3}
                            spaceBetween={10}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                            }}
                        >
                            <SwiperSlide className="flex justify-center items-center">
                                <div className='w-[40%]'>
                                    <img
                                        src={antamina}
                                        alt="Antamina"
                                        className="h-auto object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center items-center">
                                <div className='w-[40%]'>
                                    <img
                                        src={bbva}
                                        alt="BBVA"
                                        className="h-auto object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center items-center">
                                <div className='w-[40%]'>
                                    <img
                                        src={congreso}
                                        alt="Congreso"
                                        className="h-auto object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center items-center">
                                <div className='w-[40%]'>
                                    <img
                                        src={cye}
                                        alt="CYE"
                                        className="h-auto object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center items-center">
                                <div className='w-[40%]'>
                                    <img
                                        src={incn}
                                        alt="ICN"
                                        className="h-auto object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center items-center">
                                <div className='w-[40%]'>
                                    <img
                                        src={minrelex}
                                        alt="Minrelex"
                                        className="h-auto object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center items-center">
                                <div className='w-[40%]'>
                                    <img
                                        src={senamhi}
                                        alt="Senamhi"
                                        className="h-auto object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center items-center">
                                <div className='w-[40%]'>
                                    <img
                                        src={sodexo}
                                        alt="Sodexo"
                                        className="h-auto object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center items-center">
                                <div className='w-[40%]'>
                                    <img
                                        src={sutran}
                                        alt="Sutran"
                                        className="h-auto object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center items-center">
                                <div className='w-[40%]'>
                                    <img
                                        src={tecsup}
                                        alt="Tecsup"
                                        className="h-auto object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center items-center">
                                <div className='w-[40%]'>
                                    <img
                                        src={usil}
                                        alt="USIL"
                                        className="h-auto object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </motion.section>

                <motion.section
                    variants={fadeInUp}
                    initial="hidden"
                    animate={section2InView ? "visible" : "hidden"}
                    transition={{ duration: 0.7, delay: 0.7 }}
                >
                    <h2 className='text-4xl font-bold pb-6'>Casos de éxito</h2>
                    {/* Agregar contenido relevante aquí */}
                </motion.section>

                <motion.section
                    variants={fadeInUp}
                    initial="hidden"
                    animate={section2InView ? "visible" : "hidden"}
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
