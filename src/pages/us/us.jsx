import { faHeart, faLaptopCode, faMedal, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from 'react-intersection-observer';

const Contact = () => {
    const [startCount, setStartCount] = useState(false);

    // Configurar el observer para detectar cuando el componente está visible
    const { ref, inView } = useInView({
        triggerOnce: true, // Solo ejecutar una vez cuando sea visible
        threshold: 0.3,    // Iniciar cuando el 30% del elemento sea visible
        onChange: (inView) => {
            if (inView) {
                setStartCount(true);
            }
        },
    });
    return (
        <div className="py-10 font-sans">
            <div className="w-[70%] mx-auto pb-8">
                <h1 className="text-4xl text-center text-blue-600 font-bold pb-12">
                    NOSOTROS
                </h1>
                <p className="text-lg pb-8 text-justify">
                    Somos una empresa comprometida con la transformación digital en el sector energético para una mejor eficiencia en nuestros clientes, por ello brindamos servicios cumplan con las más altas expectativas. Nuestro equipo de trabajo se encuentra altamente capacitado para brindar servicios de excelente calidad.
                </p>
            </div>

            {/* Secciones de Misión, Visión y Valores */}
            <div className="flex justify-between w-[70%] mx-auto space-x-8">
                <div className="flex-1">
                    <h1 className="text-blue-600 text-3xl pb-3">Visión</h1>
                    <p className="text-left text-base">
                        Posicionarnos como referente en el mercado de la Eficiencia Energética y la transformación del modelo Energético de la Sociedad hacia una mejor sostenibilidad.
                    </p>
                </div>
                <div className="flex-1">
                    <h1 className="text-blue-600 text-3xl pb-3">Misión</h1>
                    <p className="text-left text-base">
                        La implementación de la innovación y la tecnología para ofrecer al mercado eléctrico soluciones integrales.
                    </p>
                </div>
                <div className="flex-1">
                    <h1 className="text-blue-600 text-3xl pb-3">Valores</h1>
                    <ul className="list-disc pl-5 text-left text-base">
                        <li>Ética</li>
                        <li>Calidad</li>
                        <li>Compromiso</li>
                        <li>Responsabilidad</li>
                    </ul>
                </div>
            </div>
            <div className="text-center pt-24 pb-16">
                <h2 className="text-4xl text-blue-600 font-bold">
                    ¿Por qué elegirnos?
                </h2>
            </div>

            <div className="flex justify-between w-[70%] mx-auto space-x-8 text-center">
                {/* Servicio Confiable */}
                <div className="flex-1">
                    <h1 className="text-gray-300 text-6xl font-bold pb-3">01</h1>
                    <h3 className="text-blue-600 text-2xl font-bold pb-3">
                        Servicio Confiable
                    </h3>
                    <p className="text-lg text-gray-700 pb-6 text-left">
                        Nuestros servicios son desarrollados por profesionales altamente
                        capacitados. Además, contamos con certificados que avalan la calidad
                        de nuestro trabajo.
                    </p>
                </div>

                {/* Experiencia */}
                <div className="flex-1">
                    <h1 className="text-gray-300 text-6xl font-bold pb-3">02</h1>
                    <h3 className="text-blue-600 text-2xl font-bold pb-3">
                        Experiencia
                    </h3>
                    <p className="text-lg text-gray-700 pb-6 text-left">
                        Somos una empresa peruana con más de 5 años de experiencia en el
                        rubro. Contamos con personal en constante capacitación y desarrollo.
                    </p>
                </div>

                {/* Nuestras Alianzas */}
                <div className="flex-1">
                    <h1 className="text-gray-300 text-6xl font-bold pb-3">03</h1>
                    <h3 className="text-blue-600 text-2xl font-bold pb-3">
                        Nuestras Alianzas
                    </h3>
                    <p className="text-lg text-gray-700 pb-6 text-left">
                        Trabajamos con proveedores reconocidos que nos permiten ofrecerte
                        equipos de alta calidad.
                    </p>
                </div>
            </div>
            <div ref={ref} className="flex justify-between w-[70%] mx-auto space-x-8 text-center my-8">
                <div className="flex-1">
                    <h1 className="text-6xl text-blue-600 font-bold">
                        {startCount && <CountUp end={87} duration={3} />}
                    </h1>
                    <p className="text-lg my-3">Proyectos Completados</p>
                    <FontAwesomeIcon icon={faLaptopCode} className="text-blue-600 text-6xl mt-4" />
                </div>
                <div className="flex-1">
                    <h1 className="text-6xl text-blue-600 font-bold">
                        {startCount && <CountUp end={132} duration={3} />}
                    </h1>
                    <p className="text-lg my-3">Clientes Felices</p>
                    <FontAwesomeIcon icon={faHeart} className="text-blue-600 text-6xl mt-4" />
                </div>
                <div className="flex-1">
                    <h1 className="text-6xl text-blue-600 font-bold">
                        {startCount && <CountUp end={156} duration={3} separator="," />}K
                    </h1>
                    <p className="text-lg my-3">Servicios realizados</p>
                    <FontAwesomeIcon icon={faWrench} className="text-blue-600 text-6xl mt-4" />
                </div>
                <div className="flex-1">
                    <h1 className="text-6xl text-blue-600 font-bold">
                        {startCount && <CountUp end={28} duration={3} />}
                    </h1>
                    <p className="text-lg my-3">Certificados</p>
                    <FontAwesomeIcon icon={faMedal} className="text-blue-600 text-6xl mt-4" />
                </div>
            </div>
        </div>
    );
};

export default Contact;
