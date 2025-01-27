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
            linkedin: "https://linkedin.com",
        },
        {
            img: "https://png.pngtree.com/png-clipart/20240608/original/pngtree-a-building-engineer-inspects-work-on-tablet-png-image_15286092.png",
            name: "Sergio Inga",
            position: "Administrador",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?",
            linkedin: "https://linkedin.com",
        },
        {
            img: "https://static.vecteezy.com/system/resources/thumbnails/049/514/157/small/smiling-indian-engineer-man-with-thumb-up-isolated-on-transparent-background-png.png",
            name: "Daniel Almanza",
            position: "Supervisor",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?",
            linkedin: "https://linkedin.com",
        },
        {
            img: "https://static.vecteezy.com/system/resources/thumbnails/022/529/160/small_2x/worker-man-with-clipboard-man-in-hard-hat-png.png",
            name: "Michael Linares",
            position: "Conserje",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?",
            linkedin: "https://linkedin.com",
        },
        {
            img: "https://www.pngarts.com/files/3/Engineer-PNG-Free-Download.png",
            name: "Diego Vasquez",
            position: "Ingeniero Figma",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?",
            linkedin: "https://linkedin.com",
        },
    ];

    const paragraphs = [
        {
            number: '01',
            title: 'Servicio Confiable',
            content: 'Nuestros servicios son desarrollados por profesionales altamente capacitados. Además, contamos con certificados que avalan la calidad de nuestro trabajo.',
        },
        {
            number: '02',
            title: 'Experiencia',
            content: 'Somos una empresa peruana con más de 5 años de experiencia en el rubro. Contamos con personal en constante capacitación y desarrollo.',
        },
        {
            number: '03',
            title: 'Nuestras Alianzas',
            content: 'Trabajamos con proveedores reconocidos que nos permiten ofrecerte equipos de alta calidad.',
        }
    ]

    const about = [
        {
            title: 'Propósito',
            content: 'Transformar la energía en valor, optimizando recursos energéticos para un futuro eficiente y sostenible en tu organización.',
        },
        {
            title: "Misión",
            content: "Brindar soluciones energéticas que generen valor y promuevan la sostenibilidad, fomentando confianza y reciprocidad para un futuro respetuoso.",
        },
        {
            title: "Visión",
            content: "Liderar la gestión inteligente de la energía, inspirando compromiso colectivo para maximizar eficiencia y sostenibilidad, y dejar un legado positivo.",
        },
    ]

    const counters = [
        {
            title: "Proyectos completados",
            value: 87,
            icon: faLaptopCode,
        },
        {
            title: "Clientes satisfechos",
            value: 132,
            icon: faHeart,
        },
        {
            title: "Servicios realizados",
            value: 156,
            icon: faWrench,
        },
        {
            title: "Certificados",
            value: 28,
            icon: faMedal,
        },
    ]

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
                    {about.map((item, index) => (
                        <div key={index} className="flex-1">
                            <h1 className="text-gray-300 text-6xl font-bold">
                                0{index + 1}
                            </h1>
                            <h3 className="text-blue-600 text-2xl font-bold pb-3">
                                {item.title}
                            </h3>
                            <p className="text-lg text-gray-700 pb-6 text-justify">
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="text-center py-16">
                    <h2 className="text-4xl text-blue-600 font-bold">
                        ¿Por qué elegirnos?
                    </h2>
                </div>

                <div className="lg:flex justify-between mx-auto lg:space-x-12 text-center space-y-4 lg:space-y-0">
                    {/* Servicio Confiable */}
                    {paragraphs.map((item, index) => (
                        <div key={index} className="flex-1">
                            <h1 className="text-6xl text-blue-600 font-bold">
                                {item.number}
                            </h1>
                            <h3 className="text-2xl text-blue-600 font-bold pb-3">
                                {item.title}
                            </h3>
                            <p className="text-lg text-gray-700 pb-6 text-justify">
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>
                <div
                    ref={ref}
                    className="lg:flex justify-between mx-auto lg:space-x-8 text-center my-8 sm:grid sm:grid-cols-2 sm:gap-y-16 space-y-20 sm:space-y-0"
                >
                    {counters.map((item, index) => (
                        <div key={index} className="flex-1">
                            <h1 className="text-6xl text-blue-600 font-bold">
                                {startCount && <CountUp end={item.value} duration={3} />}
                            </h1>
                            <p className="text-lg my-3">{item.title}</p>
                            <FontAwesomeIcon icon={item.icon} className="h-16 w-16 text-blue-500" />
                        </div>
                    ))}
                </div>
                <div className="text-center py-16">
                    <h2 className="text-4xl text-blue-600 font-bold">
                        Nuestro equipo
                    </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
                    {employees.map((employee, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4">
                            <img
                                src={employee.img}
                                className="w-32 h-32 sm:w-48 sm:h-48 border-4 rounded-full object-cover mx-auto sm:mx-0"
                                alt={employee.name}
                            />
                            <div className="flex flex-col gap-y-2 text-center sm:text-left">
                                <span className="text-xl sm:text-2xl font-bold">
                                    {employee.name}
                                </span>
                                <span className="text-indigo-500 font-bold">
                                    {employee.position}
                                </span>
                                <span>{employee.description}</span>
                                <div className="flex justify-center sm:justify-start gap-x-2">
                                    <NavLink
                                        to={employee.linkedin}
                                        className="text-2xl hover:text-indigo-500"
                                        target="_blank"
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
