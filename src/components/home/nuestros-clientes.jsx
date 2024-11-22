import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import '../../pages/landing/home/home.css';
import { Scrollbar, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import antamina from '../../uploads/clientes/antamina.png';
import bbva from '../../uploads/clientes/bbva.png';
import congreso from '../../uploads/clientes/congreso.png';
import cye from '../../uploads/clientes/cye.png';
import incn from '../../uploads/clientes/incn.png';
import minrelex from '../../uploads/clientes/minrelex.png';
import senamhi from '../../uploads/clientes/senamhi.png';
import sodexo from '../../uploads/clientes/sodexo.png';
import sutran from '../../uploads/clientes/sutran.png';
import tecsup from '../../uploads/clientes/tecsup.png';
import usil from '../../uploads/clientes/usil.png';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const NuestrosClientes = () => {
    const { ref: section2Ref, inView: section2InView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div>
            <motion.section
                ref={section2Ref}
                className='w-full'
                variants={fadeInUp}
                initial="hidden"
                animate={section2InView ? "visible" : "hidden"}
                transition={{ duration: 0.7, delay: 0.5 }}
            >
                <h2 className='text-2xl sm:text-4xl font-bold pb-6'>Nuestros clientes</h2>
                <div className='h-[20rem]'>
                    <Swiper
                        scrollbar={{ hide: true }}
                        modules={[Scrollbar, Autoplay]}
                        className="mySwiper"
                        slidesPerView={1}
                        spaceBetween={10}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1536: {
                                slidesPerView: 5,
                                spaceBetween: 50,
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
        </div>
    )
}

export default NuestrosClientes
