import React, { useState } from "react";
import { useInView } from 'react-intersection-observer';
import TitleSection from "../../../components/TitleSection";
import logo from "../../../uploads/renewable-energy.jpg";
import sistemasFotovoltaicos from "../../../uploads/sistemas-fotovoltaicos.jpg";
import sistemasEolicos from "../../../uploads/sistemas-eolicos.jpg";
import calidadEnergia from "../../../uploads/calidad-energia.jpg";
import arcoElectrico from "../../../uploads/arco-electrico.jpg";
import seguridadElectrica from "../../../uploads/seguridad-electrica.jpg";
import sistemasPuestaTierra from "../../../uploads/sistemas-puesta-tierra.jpg";
import eficienciaEnergetica from "../../../uploads/eficiencia-energetica.jpg";
import termografiaInfrarroja from "../../../uploads/termografia-infrarroja.jpg";

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
    <div className="font-sans pb-10">
      <TitleSection />
      <div className="w-[70%] mx-auto py-10">
        <div className='flex space-x-14'>
          <div className='w-full'>
            <p className="text-lg pb-8 text-justify">
              En Gestión Energética promovemos la formación  que le permitirá obtener la información necesaria para gestionar eficientemente la energía. Cursos y seminarios para empresas privadas, organismos gubernamentales, universidades e Institutos.
            </p>
            <div className="flex w-full space-x-8 py-3">
              <div className="w-1/2 rounded flex-1 bg-white">
                <div>
                  <img src={sistemasFotovoltaicos} alt="Logo" className="w-full h-48 object-cover rounded" />
                </div>
                <div className="p-3">
                  <h1 className="font-bold pb-2 text-base">Sistemas Fotovoltaicos</h1>
                  <h1 className="pb-2 text-justify">Aprende a resolver problemas y conviértete en un experto en energía fotovoltaica. Capacítate en Gesener y maximiza la eficiencia de sistemas fotovoltaicos.</h1>
                </div>
              </div>
              <div className="w-1/2 rounded flex-1 bg-white">
                <div>
                  <img src={sistemasEolicos} alt="Logo" className="w-full h-48 object-cover rounded" />
                </div>
                <div className="p-3">
                  <h1 className="font-bold pb-2 text-base">Sistemas Eólicos</h1>
                  <h1 className="pb-2 text-justify">Explora nuestro curso de energía eólica, abordando aerogeneradores, sostenibilidad, eficiencia energética, impacto ambiental y tendencias del sector. Conviértete en experto en energía renovable.</h1>
                </div>
              </div>
            </div>
            <div className="flex w-full space-x-8 py-3">
              <div className="w-1/2 rounded flex-1 bg-white">
                <div>
                  <img src={calidadEnergia} alt="Logo" className="w-full h-48 object-cover rounded" />
                </div>
                <div className="p-3">
                  <h1 className="font-bold pb-2 text-base">Calidad de Energía</h1>
                  <h1 className="pb-2 text-justify">Nuestros cursos se centran en la identificación de problemas potenciales en sistemas eléctricos y soluciones prácticas para mejorar la calidad de energía.</h1>
                </div>
              </div>
              <div className="w-1/2 rounded flex-1 bg-white">
                <div>
                  <img src={arcoElectrico} alt="Logo" className="w-full h-48 object-cover rounded" />
                </div>
                <div className="p-3">
                  <h1 className="font-bold pb-2 text-base">Arco Eléctrico</h1>
                  <h1 className="pb-2 text-justify">Aprenderás sobre arcos eléctricos y cómo estos pueden surgir por fallos en el cableado o conectores sueltos. Exploramos las herramientas necesarias para garantizar la seguridad en sus sistemas.</h1>
                </div>
              </div>
            </div>
            <div className="flex w-full space-x-8 py-3">
              <div className="w-1/2 rounded flex-1 bg-white">
                <div>
                  <img src={seguridadElectrica} alt="Logo" className="w-full h-48 object-cover rounded" />
                </div>
                <div className="p-3">
                  <h1 className="font-bold pb-2 text-base">Seguridad Eléctrica</h1>
                  <h1 className="pb-2 text-justify">En nuestros cursos de seguridad eléctrica  aprenderás conocimientos especializados y prácticos sobre la gestión segura de sistemas eléctricos.</h1>
                </div>
              </div>
              <div className="w-1/2 rounded flex-1 bg-white">
                <div>
                  <img src={sistemasPuestaTierra} alt="Logo" className="w-full h-48 object-cover rounded" />
                </div>
                <div className="p-3">
                  <h1 className="font-bold pb-2 text-base">Sistemas Puesta a Tierra</h1>
                  <h1 className="pb-2 text-justify">Durante nuestras capacitaciones, aprenderás sobre los diferentes tipos de sistemas, componentes clave, diseño y la aplicación práctica de técnicas para asegurar una instalación segura y eficiente.</h1>
                </div>
              </div>
            </div>
            <div className="flex w-full space-x-8 py-3">
              <div className="w-1/2 rounded flex-1 bg-white">
                <div>
                  <img src={eficienciaEnergetica} alt="Logo" className="w-full h-48 object-cover rounded" />
                </div>
                <div className="p-3">
                  <h1 className="font-bold pb-2 text-base">Eficiencia Energética</h1>
                  <h1 className="pb-2 text-justify">Te guiaremos en el diseño e implementación de estrategias que maximicen la eficiencia energética, brindando soluciones prácticas y efectivas para un uso responsable de la energía en tu empresa.</h1>
                </div>
              </div>
              <div className="w-1/2 rounded flex-1 bg-white">
                <div>
                  <img src={termografiaInfrarroja} alt="Logo" className="w-full h-48 object-cover rounded" />
                </div>
                <div className="p-3">
                  <h1 className="font-bold pb-2 text-base">Termografía Infrarroja</h1>
                  <h1 className="pb-2 text-justify">Este curso ofrece fundamentos de termografía infrarroja, explicando sus aplicaciones en el campo industrial. Asimismo, aprenderás acerca de las nuevas tecnologías involucradad y los factores influyentes en la medición.</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
