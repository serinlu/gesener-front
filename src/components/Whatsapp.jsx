import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { useSpring, animated } from "react-spring";

const Whatsapp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // Controla la visibilidad del botón

    // Animaciones para el botón y el chat
    const buttonAnimation = useSpring({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.9)",
        pointerEvents: isVisible ? "auto" : "none", // Desactiva clics cuando no es visible
        config: { tension: 300, friction: 20 },
    });

    const chatAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0px)" : "translateY(10px)",
        config: { tension: 300, friction: 30 },
    });

    const iconAnimation = useSpring({
        opacity: 1,
        transform: isOpen ? "scale(1.2)" : "scale(1)",
        config: { tension: 300, friction: 20 },
    });

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleChatOpen = () => {
        window.open("https://api.whatsapp.com/send?phone=51919445232", "_blank");
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const threshold = 200; // Cambia este valor para ajustar el punto de aparición
            setIsVisible(scrollY > threshold);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Cierra el modal si el botón desaparece
    useEffect(() => {
        if (!isVisible) {
            setIsOpen(false);
        }
    }, [isVisible]);

    return (
        <>
            {/* Botón de WhatsApp */}
            <animated.div
                style={buttonAnimation}
                className={`fixed bottom-8 right-8 z-20 p-2 rounded-full cursor-pointer transition-transform duration-300 w-16 h-16 items-center justify-center flex
                ${isOpen ? 'bg-green-500 text-white' : 'bg-green-500 text-white'}`}
                onClick={handleButtonClick}
                role="button"
                tabIndex={isVisible ? 0 : -1} // Hace el botón enfocable solo si es visible
            >
                <animated.div style={iconAnimation}>
                    {isOpen ? (
                        <FaTimes className="text-3xl" />
                    ) : (
                        <FaWhatsapp className="text-3xl" />
                    )}
                </animated.div>
            </animated.div>

            {/* Chat que aparece al hacer clic en el botón */}
            {isOpen ? (
                <animated.div
                    style={chatAnimation}
                    className={`fixed bottom-24 right-8 bg-white text-white rounded shadow-lg transition-transform duration-300 z-20`}
                >
                    <div className="w-[22rem] bg-green-500 flex text-base">
                        <FontAwesomeIcon icon={faWhatsapp} className="text-white text-4xl p-4" />
                        <h1 className="font-bold py-4 px-2">Bienvenido a GESENER, ¿en qué te puedo ayudar?</h1>
                    </div>
                    <div className="text-center py-4 px-4">
                        <button
                            onClick={handleChatOpen}
                            className="w-full py-5 bg-gray-100 text-green-500 rounded hover:bg-gray-200 border-l-green-500 border-l-2"
                        >
                            <div className="flex">
                                <div className="w-3/4">
                                    <h1 className="text-left text-base py-2 pl-5">Gesener</h1>
                                </div>
                                <div className="w-1/4">
                                    <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 text-2xl p-2" />
                                </div>
                            </div>
                        </button>
                    </div>
                </animated.div>
            ) : null}
        </>
    );
};

export default Whatsapp;
