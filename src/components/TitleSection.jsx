import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

// Importar imágenes locales
import nosotros from "@/uploads/nosotros.webp";
import eficiencia from "@/uploads/eficiencia-energetica.webp";
import arrendamiento from "@/uploads/alquiler.webp";
import termografia from "@/uploads/infrared-thermography.webp";
import energias from "@/uploads/energias-renovables.webp";
import capacitacion from "@/uploads/capacitacion.webp";
import noticias from "@/uploads/noticias.webp";
import casosexito from "@/uploads/casos-exito-opt.webp";

// Mapear las rutas a sus respectivas imágenes
const imageMap = {
    "/solutions/energy-efficiency": eficiencia,
    "/solutions/leasing": arrendamiento,
    "/solutions/infrared-thermography": termografia,
    "/solutions/renewable-energy": energias,
    "/solutions/training": capacitacion,
    "/us": nosotros,
    "/news": noticias,
    "/success-cases": casosexito,
};

const titles = {
    "/solutions/energy-efficiency": "Eficiencia energética",
    "/solutions/leasing": "Arrendamiento",
    "/solutions/infrared-thermography": "Termografía infrarroja",
    "/solutions/renewable-energy": "Energía renovable",
    "/solutions/training": "Capacitaciones",
    "/us": "Nosotros",
    "/news": "Noticias",
    "/success-cases": "Casos de éxito",
};

const TitleSection = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const title = titles[currentPath] || "Página no encontrada";

    const [isVisible, setIsVisible] = useState(false); // Controla cuándo iniciar la animación

    // Controlar la animación después de cargar el componente
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500); // Retraso para la animación
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <Helmet>
                <title>{`${title} | Gesener`}</title>
                <meta
                    name="description"
                    content={`Explora más sobre ${title.toLowerCase()}. ${title}.`}
                />
            </Helmet>
            <div className="relative w-full h-screen object-cover">
                {/* Contenedor de oscurecimiento */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-0"></div>

                {/* Imagen */}
                <img
                    src={imageMap[currentPath] || casosexito}
                    className="w-full h-full object-cover -z-0"
                />

                {/* Texto */}
                <motion.h1
                    className="absolute bottom-0 left-0 text-4xl p-10 md:p-14 w-full font-bold sm:text-6xl text-white z-0 mb-16"
                    initial={{ opacity: 0, translateY: 10 }}
                    animate={isVisible ? { opacity: 1, translateY: 0 } : {}}
                    transition={{ duration: 1 }}
                >
                    {title}
                </motion.h1>
            </div>
        </div>
    );
};

export default TitleSection;