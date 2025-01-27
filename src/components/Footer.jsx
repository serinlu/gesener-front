import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 w-full text-white py-8 px-8">
      <div className="flex flex-wrap justify-between md:w-full md:justify-between">

        {/* Lado Izquierdo */}
        <div className="w-full text-center mx-auto md:w-1/2 md:justify-left mb-6 md:mb-0 md:text-left text-wrap md:mx-0">
          {/* <div className='flex justify-center md:justify-start'>
            <img src={logoBlanco} alt="Company Logo" className="h-16 mb-10" />
          </div> */}
          <div className='w-[80%] md:w-full mx-auto'>
            <p className="mb-2 font-bold flex text-center justify-center mx-auto md:justify-start md:text-left">Transformando la energía de manera inteligente.</p>
            <p>Empresa líder que potencia la eficiencia mediante soluciones innovadoras y sostenibles a través de nuestros servicios energéticos..</p>
          </div>
        </div>

        {/* Lado Derecho */}
        <div className="w-full md:w-1/2 text-center md:text-right">
          <p className="mb-2 font-bold">Contáctenos:</p>
          <div className='space-y-1'>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' />Strauss 388, San Borja, Lima - Perú</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="mr-2" />ventas@gesener.pe</p>
            <p><FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />+51 919 445 232</p>
          </div>
        </div>
        <div className="flex space-x-6 my-6 justify-center mx-auto text-xl">
          <a href="https://www.tiktok.com/@gesener.pe" className="hover:text-gray-400" target='_blank'><FontAwesomeIcon icon={faTiktok}/></a>
          <a href="https://www.instagram.com/gesener.pe/" className="hover:text-gray-400" target='_blank'><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://twitter.com/Gesener_sac" className="hover:text-gray-400" target='_blank'><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="https://www.linkedin.com/company/gesener" className="hover:text-gray-400" target='_blank'><FontAwesomeIcon icon={faLinkedinIn} /></a>
          <a href="https://www.facebook.com/gesener/" className="hover:text-gray-400" target='_blank'><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="https://www.youtube.com/channel/UCaKqPXAnyW260B2vHtBGxgw" className="hover:text-gray-400" target='_blank'><FontAwesomeIcon icon={faYoutube} /></a>
        </div>

        {/* Centro - Copyright */}
        <div className="w-full text-center my-4">
          <p className="text-sm text-gray-400">&copy; 2024 Gesener. Todos los derechos reservados.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
