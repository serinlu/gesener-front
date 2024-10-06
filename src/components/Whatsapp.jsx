import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { useSpring, animated } from "react-spring";

const Whatsapp = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Animaciones para el botón y el chat
    const buttonAnimation = useSpring({
        opacity: isOpen ? 1 : 1,
        config: { tension: 300, friction: 20 },
    });

    const chatAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(-10px)" : "translateY(-10px)",
        config: { tension: 300, friction: 30 },
    });

    const iconAnimation = useSpring({
        opacity: isOpen ? 1 : 1,
        transform: isOpen ? "scale(1.2)" : "scale(1)",
        config: { tension: 300, friction: 20 },
    });

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleChatOpen = () => {
        window.open("https://api.whatsapp.com/send?phone=51919445232", "_blank");
    };

    return (
        <>
            {/* Botón de WhatsApp */}
            <animated.div
                style={buttonAnimation}
                className={`fixed bottom-8 right-8 z-10 p-2 rounded-full cursor-pointer transition-transform duration-300 w-16 h-16 items-center justify-center flex
                ${isOpen ? 'bg-green-500 text-white' : 'bg-green-500 text-white'}`}
                onClick={handleButtonClick}
                // Make sure button only clickable when chat is open
                aria-disabled={!isOpen ? "true" : undefined}
                role="button"
                tabIndex={0}
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
                    className={`fixed bottom-24 right-8 bg-white text-white rounded shadow-lg transition-transform duration-300 z-10`}
                >
                    <div className="w-[22rem] bg-green-500 flex text-base">
                        <FontAwesomeIcon icon={faWhatsapp} className="text-white text-4xl p-4" />
                        <h1 className="font-bold py-4 px-2">Bienvenido a GESTIÓN ENERGÉTICA, en que te puedo ayudar?</h1>
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
