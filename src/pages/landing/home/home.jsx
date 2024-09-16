import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import './home.css';
import { Scrollbar } from 'swiper/modules';

const Home = () => {
    return (
        <div className='w-full'>
            <div className='w-full h-[80vh] bg-cover bg-center bg-no-repeat' style={{ backgroundImage: '' }}></div>
            <div className='w-[90%] flex flex-col gap-y-12 mx-auto py-10'>
                {/* Services */}
                <section className='flex justify-between gap-x-4'>
                    <div className='relative group bg-white w-64 h-96 flex justify-center items-center overflow-hidden'>
                        <h2 className='z-10'>Casos de Estudio</h2>
                        <div className='absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'></div>
                        <div className='absolute bottom-0 inset-x-0 flex justify-center items-center pb-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 ease-in-out'>
                            <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>Más detalles</button>
                        </div>
                    </div>

                    <div className='relative group bg-white w-64 h-96 flex justify-center items-center overflow-hidden'>
                        <h2 className='z-10'>Eficiencia Energética</h2>
                        <div className='absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'></div>
                        <div className='absolute bottom-0 inset-x-0 flex justify-center items-center pb-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 ease-in-out'>
                            <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>Más detalles</button>
                        </div>
                    </div>

                    <div className='relative group bg-white w-64 h-96 flex justify-center items-center overflow-hidden'>
                        <h2 className='z-10'>Termografía Infrarroja</h2>
                        <div className='absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'></div>
                        <div className='absolute bottom-0 inset-x-0 flex justify-center items-center pb-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 ease-in-out'>
                            <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>Más detalles</button>
                        </div>
                    </div>

                    <div className='relative group bg-white w-64 h-96 flex justify-center items-center overflow-hidden'>
                        <h2 className='z-10'>Energías Renovables</h2>
                        <div className='absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'></div>
                        <div className='absolute bottom-0 inset-x-0 flex justify-center items-center pb-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 ease-in-out'>
                            <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>Más detalles</button>
                        </div>
                    </div>

                    <div className='relative group bg-white w-64 h-96 flex justify-center items-center overflow-hidden'>
                        <h2 className='z-10'>Capacitación</h2>
                        <div className='absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'></div>
                        <div className='absolute bottom-0 inset-x-0 flex justify-center items-center pb-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 ease-in-out'>
                            <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>Más detalles</button>
                        </div>
                    </div>

                    <div className='relative group bg-white w-64 h-96 flex justify-center items-center overflow-hidden'>
                        <h2 className='z-10'>Alquiler de Equipos</h2>
                        <div className='absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'></div>
                        <div className='absolute bottom-0 inset-x-0 flex justify-center items-center pb-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 ease-in-out'>
                            <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>Más detalles</button>
                        </div>
                    </div>
                </section>


                {/* Clients */}
                <section>
                    <h2 className='text-2xl font-bold pb-4'>CLIENTES</h2>
                    <Swiper
                        scrollbar={{
                            hide: true,
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper h-[20rem]"
                    >
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                    </Swiper>
                </section>

                {/* Success Cases */}
                <section>
                    <h2 className='text-2xl font-bold pb-4'>CASOS DE ÉXITO</h2>
                </section>

                {/* News */}
                <section>
                    <h2 className='text-2xl font-bold pb-4'>NOTICIAS</h2>
                </section>
            </div>
        </div>
    );
}

export default Home