import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';

const RelatedTopics = () => {
    const [subject, setSubject] = useState('');

    useEffect(() => {
        const pathname = window.location.pathname;

        if (pathname.includes('/energy-efficiency')) {
            setSubject('Información sobre eficiencia energética');
        } else if (pathname.includes('/equipment-rental')) {
            setSubject('Información sobre el alquiler de equipos');
        } else if (pathname.includes('/infrared-thermography')) {
            setSubject('Información sobre termografía infrarroja');
        } else if (pathname.includes('/renewable-energy')) {
            setSubject('Información sobre energía renovable');
        }
        else {
            setSubject('Consulta general');
        }
    }, []);

    const mailHandler = () => {
        window.location.href = `mailto:ventas@gesener.pe?subject=${encodeURIComponent(subject)}`;
    };

    return (
        <div className='text-lg w-1/3'>
            <h1 className='font-bold'>Temas relacionados</h1>
            <div></div>
            <hr className="border-t border-gray-400 my-6" />
            <h1 className='font-bold'>Empecemos a trabajar</h1>
            <h1 className='pb-2'>Da el siguiente paso</h1>
            <button
                className='bg-indigo-700 px-5 py-2 text-base text-white font-semibold rounded-lg'
                onClick={mailHandler}
            >
                <FontAwesomeIcon icon={faComment} size="lg" /> Hablar con un especialista
            </button>
            <hr className="border-t border-gray-400 my-6" />

            {/* Video de YouTube */}
            <div className="w-full h-full">
                <iframe
                    width="100%"
                    height="188"
                    src="https://www.youtube.com/embed/Q8Bu2e5ahFA"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}

export default RelatedTopics;
