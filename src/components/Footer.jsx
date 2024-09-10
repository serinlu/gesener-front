import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import logoBlanco from "../uploads/logoBlanco.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between items-start">
        
        {/* Lado Izquierdo */}
        <div className="w-full md:w-2/5 mb-6 md:mb-0">
          <img src={logoBlanco} alt="Company Logo" className="h-16 mb-10" />
          <p className="mb-2 font-bold">Transformando la energía de manera inteligente.</p>
          <p>Empresa líder que potencia la eficiencia mediante soluciones innovadoras y sostenibles a través de nuestros servicios energéticos..</p>
          
          {/* Redes Sociales */}
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com/gesener/" className="hover:text-gray-400"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="https://www.instagram.com/gesener.pe/" className="hover:text-gray-400"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://twitter.com/Gesener_sac" className="hover:text-gray-400"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://www.linkedin.com/company/gesener" className="hover:text-gray-400"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="https://www.youtube.com/channel/UCaKqPXAnyW260B2vHtBGxgw" className="hover:text-gray-400"><FontAwesomeIcon icon={faYoutube} /></a>
          </div>
        </div>
        
        {/* Lado Derecho */}
        <div className="w-full md:w-2/5 text-right">
          <p className="mb-2 font-bold">Contáctenos:</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2'/>Strauss 388 of 401, San Borja, Lima - Perú</p>
          <p><FontAwesomeIcon icon={faEnvelope} className="mr-2" />ventas@gesener.pe</p>
          <p><FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />+51 919 445 232</p>
        </div>
        
        {/* Centro - Copyright */}
        <div className="w-full text-center mt-8">
          <p className="text-sm text-gray-400">&copy; 2024 Gesener. Todos los derechos reservados.</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
