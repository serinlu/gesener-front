import TitleSection from "@/components/TitleSection";
import {
    faHeart,
    faLaptopCode,
    faMedal,
    faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CountUp from "react-countup";
import { FaLinkedin } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { NavLink } from "react-router-dom";

const Contact = () => {
    const [startCount, setStartCount] = useState(false);

    // Configurar el observer para detectar cuando el componente está visible
    const { ref, inView } = useInView({
        triggerOnce: true, // Solo ejecutar una vez cuando sea visible
        threshold: 0.3, // Iniciar cuando el 30% del elemento sea visible
        onChange: (inView) => {
            if (inView) {
                setStartCount(true);
            }
        },
    });

    const employees = [
        {
            img: "https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-cheerful-engineer-man-png-image_10130812.png",
            name: "Luis Sánchez",
            position: "Gerente General",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?",
            linkedin: "link",
        },
        {
            img: "https://png.pngtree.com/png-clipart/20240608/original/pngtree-a-building-engineer-inspects-work-on-tablet-png-image_15286092.png",
            name: "Sergio Inga",
            position: "Administrador",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?",
            linkedin: "link",
        },
        {
            img: "https://static.vecteezy.com/system/resources/thumbnails/049/514/157/small/smiling-indian-engineer-man-with-thumb-up-isolated-on-transparent-background-png.png",
            name: "Daniel Almanza",
            position: "Supervisor",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?",
            linkedin: "link",
        },
        {
            img: "https://static.vecteezy.com/system/resources/thumbnails/022/529/160/small_2x/worker-man-with-clipboard-man-in-hard-hat-png.png",
            name: "Michael Linares",
            position: "Conserje",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?",
            linkedin: "link",
        },
        {
            img: "https://www.pngarts.com/files/3/Engineer-PNG-Free-Download.png",
            name: "Diego Vasquez",
            position: "Ingeniero Figma",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?",
            linkedin: "link",
        },
    ];

    return (
        <div>
            <TitleSection />
            <div className="w-[80%] mx-auto pb-10 font-sans">
                <div className="mx-auto py-16">
                    <p className="text-justify text-xl">
                        Somos una empresa comprometida con la transformación
                        digital en el sector energético para una mejor
                        eficiencia en nuestros clientes, por ello brindamos
                        servicios cumplan con las más altas expectativas.
                        Nuestro equipo de trabajo se encuentra altamente
                        capacitado para brindar servicios de excelente calidad.
                    </p>
                </div>

                {/* Secciones de Misión, Visión y Valores */}
                <div className="lg:flex justify-between mx-auto lg:space-x-8 space-y-8 lg:space-y-0 pb-8">
                    <div className="flex-1">
                        <h1 className="text-blue-600 text-3xl pb-3">Visión</h1>
                        <p className="text-xl text-justify">
                            Posicionarnos como referente en el mercado de la
                            eficiencia energética y la transformación del modelo
                            energético de la sociedad hacia una mejor
                            sostenibilidad.
                        </p>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-blue-600 text-3xl pb-3">Misión</h1>
                        <p className="text-xl text-justify">
                            La implementación de la innovación y la tecnología
                            para ofrecer al mercado eléctrico soluciones
                            integrales.
                        </p>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-blue-600 text-3xl pb-3">Valores</h1>
                        <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2 pl-5 text-left text-base list-disc sm:text-xl">
                            <li>Ética</li>
                            <li>Calidad</li>
                            <li>Compromiso</li>
                            <li>Responsabilidad</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center py-16">
                    <h2 className="text-4xl text-blue-600 font-bold">
                        ¿Por qué elegirnos?
                    </h2>
                </div>

                <div className="lg:flex justify-between mx-auto lg:space-x-12 text-center space-y-4 lg:space-y-0">
                    {/* Servicio Confiable */}
                    <div className="flex-1">
                        <h1 className="text-gray-300 text-6xl font-bold pb-3">
                            01
                        </h1>
                        <h3 className="text-blue-600 text-2xl font-bold pb-3">
                            Servicio Confiable
                        </h3>
                        <p className="text-lg text-gray-700 pb-6 text-justify">
                            Nuestros servicios son desarrollados por
                            profesionales altamente capacitados. Además,
                            contamos con certificados que avalan la calidad de
                            nuestro trabajo.
                        </p>
                    </div>

                    {/* Experiencia */}
                    <div className="flex-1">
                        <h1 className="text-gray-300 text-6xl font-bold pb-3">
                            02
                        </h1>
                        <h3 className="text-blue-600 text-2xl font-bold pb-3">
                            Experiencia
                        </h3>
                        <p className="text-lg text-gray-700 pb-6 text-justify">
                            Somos una empresa peruana con más de 5 años de
                            experiencia en el rubro. Contamos con personal en
                            constante capacitación y desarrollo.
                        </p>
                    </div>

                    {/* Nuestras Alianzas */}
                    <div className="flex-1">
                        <h1 className="text-gray-300 text-6xl font-bold pb-3">
                            03
                        </h1>
                        <h3 className="text-blue-600 text-2xl font-bold pb-3">
                            Nuestras Alianzas
                        </h3>
                        <p className="text-lg text-gray-700 pb-6 text-justify">
                            Trabajamos con proveedores reconocidos que nos
                            permiten ofrecerte equipos de alta calidad.
                        </p>
                    </div>
                </div>
                <div
                    ref={ref}
                    className="lg:flex justify-between mx-auto lg:space-x-8 text-center my-8 sm:grid sm:grid-cols-2 sm:gap-y-16 space-y-20 sm:space-y-0"
                >
                    <div className="flex-1 border-b-1">
                        <h1 className="text-6xl text-blue-600 font-bold">
                            {startCount && <CountUp end={87} duration={3} />}
                        </h1>
                        <p className="text-lg my-3">Proyectos Completados</p>
                        <FontAwesomeIcon
                            icon={faLaptopCode}
                            className="text-blue-600 text-6xl mt-4"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-6xl text-blue-600 font-bold">
                            {startCount && <CountUp end={132} duration={3} />}
                        </h1>
                        <p className="text-lg my-3">Clientes Felices</p>
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="text-blue-600 text-6xl mt-4"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-6xl text-blue-600 font-bold">
                            {startCount && (
                                <CountUp end={156} duration={3} separator="," />
                            )}
                            K
                        </h1>
                        <p className="text-lg my-3">Servicios realizados</p>
                        <FontAwesomeIcon
                            icon={faWrench}
                            className="text-blue-600 text-6xl mt-4"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-6xl text-blue-600 font-bold">
                            {startCount && <CountUp end={28} duration={3} />}
                        </h1>
                        <p className="text-lg my-3">Certificados</p>
                        <FontAwesomeIcon
                            icon={faMedal}
                            className="text-blue-600 text-6xl mt-4"
                        />
                    </div>
                </div>
                <div className="text-center py-16">
                    <h2 className="text-4xl text-blue-600 font-bold">
                        Nuestro personal
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-12">
                    {employees.map((employee, index) => (
                        <div key={index} className="flex gap-x-4">
                            <img
                                src={employee.img}
                                className="w-48 h-48 border-4 rounded-full object-cover"
                                alt=""
                            />
                            <div className="flex flex-col gap-y-2">
                                <span className="text-2xl font-bold">
                                    {employee.name}
                                </span>
                                <span className="text-indigo-500 font-bold">
                                    {employee.position}
                                </span>
                                <span>{employee.description}</span>
                                <div className="flex gap-x-2">
                                    <NavLink
                                        to={employee.linkedin}
                                        className="text-2xl hover:text-indigo-500"
                                    >
                                        <FaLinkedin />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contact;
