import React, { useState } from "react";
import TitleSection from "@/components/TitleSection";

import arcoElectrico from "@/uploads/arco-electrico.jpg";
import calidadEnergia from "@/uploads/calidad-energia.jpg";
import eficienciaEnergetica from "@/uploads/eficiencia-energetica.jpg";
import seguridadElectrica from "@/uploads/seguridad-electrica.jpg";
import sistemasEolicos from "@/uploads/sistemas-eolicos.jpg";
import sistemasFotovoltaicos from "@/uploads/sistemas-fotovoltaicos.jpg";
import sistemasPuestaTierra from "@/uploads/sistemas-puesta-tierra.jpg";
import termografiaInfrarroja from "@/uploads/termografia-infrarroja.jpg";

import fuerteHoyos from "@/uploads/fuerte-hoyos.jpg";
import siderPeru from "@/uploads/sider-peru.jpg";
import sistemasElectricosTecsup from "@/uploads/sistemas-electricos-tecsup.png";
import sunatFotovoltaico from "@/uploads/sunat-eficiencia.png";
import tecsupFotovoltaico from "@/uploads/tecsup-fotovoltaico.jpeg";

import energiaFuturo from "@/uploads/energia-futuro.png";
import infrarrojaIA from "@/uploads/infrarroja-ia.png";
import sostenibilidad from "@/uploads/sostenibilidad.png";

import ContactForm from "@/components/ContactForm";

const Training = () => {
  const mainCards = [
    { img: sistemasFotovoltaicos, title: 'Sistemas Fotovoltaicos', description: 'Aprende a resolver problemas y conviértete en un experto en energía fotovoltaica. Capacítate en Gesener y maximiza la eficiencia de sistemas fotovoltaicos.' },
    { img: sistemasEolicos, title: 'Sistemas Eolicos', description: 'Explora nuestro curso de energía eólica, abordando aerogeneradores, sostenibilidad, eficiencia energética, impacto ambiental y tendencias del sector. Conviértete en experto en energía renovable.' },
    { img: calidadEnergia, title: 'Calidad de Energía', description: 'Nuestros cursos se centran en la identificación de problemas potenciales en sistemas eléctricos y soluciones prácticas para mejorar la calidad de energía.' },
    { img: arcoElectrico, title: 'Arco Eléctrico', description: 'Aprenderás sobre arcos eléctricos y cómo estos pueden surgir por fallos en el cableado o conectores sueltos. Exploramos las herramientas necesarias para garantizar la seguridad en sus sistemas.' },
    { img: seguridadElectrica, title: 'Seguridad Eléctrica', description: 'En nuestros cursos de seguridad eléctrica  aprenderás conocimientos especializados y prácticos sobre la gestión segura de sistemas eléctricos.' },
    { img: sistemasPuestaTierra, title: 'Sistemas Puesta a Tierra', description: 'Durante nuestras capacitaciones, aprenderás sobre los diferentes tipos de sistemas, componentes clave, diseño y la aplicación práctica de técnicas para asegurar una instalación segura y eficiente.' },
    { img: eficienciaEnergetica, title: 'Eficiencia Energética', description: 'Te guiaremos en el diseño e implementación de estrategias que maximicen la eficiencia energética, brindando soluciones prácticas y efectivas para un uso responsable de la energía en tu empresa.' },
    { img: termografiaInfrarroja, title: 'Termografía Infrarroja', description: 'Este curso ofrece fundamentos de termografía infrarroja, explicando sus aplicaciones en el campo industrial. Asimismo, aprenderás acerca de las nuevas tecnologías involucradad y los factores influyentes en la medición.' },
  ]

  const cursosCards = [
    { img: sunatFotovoltaico, title: 'SISTEMAS FOTOVOLTAICOS Y EFICIENCIA ENERGÉTICA SUNAT', description: 'Año: 2024.' },
    { img: tecsupFotovoltaico, title: 'ENERGÍA SOLAR FOTOVOLTÁICA PRESENCIAL TECSUP', description: 'Año: 2022' },
    { img: siderPeru, title: 'ANÁLISIS DE ARMÓNICOS DE POTENCIA EN SIDER PERÚ', description: 'Año: 2021' },
    { img: fuerteHoyos, title: 'LUMINARIAS Y REFLECTORES SOLARES CUARTEL FUERTE DE HOYOS', description: 'Año: 2021.' },
    { img: sistemasElectricosTecsup, title: 'TERMOGRAFÍA APLICADA A SISTEMAS ELÉCTRICOS EN TECSUP', description: 'Año: 2021' },
  ]

  const proximosCursosCards = [
    { img: infrarrojaIA, title: 'Potenciando la Termografía Infrarroja con Inteligencia Artificial', description: 'Explora la exelencia sobre las aplicaciones prácticas de la IA en termografía.' },
    { img: sostenibilidad, title: 'Impulsa tu Ahorro y Sostenibilidad Optimizando tu Consumo Energético', description: 'Domina los sistemas fotovoltaicos. Diseño, instalación y mantenimiento eficiente para tu éxito energético.' },
    { img: energiaFuturo, title: 'Domina la Energía del Futuro con Sistemas Fotovoltaicos', description: 'Revoluciona tu gestión energética: aprende a optimizar el consumo con tecnologías avanzadas en nuestro curso online.' },
  ]

  return (
    <div className="font-sans pb-10">
      <TitleSection />
      <div className="w-[70%] mx-auto py-10">
        <div className='flex space-x-14'>
          <div className='w-full'>
            <p className="text-lg pb-8 text-justify">
              En Gestión Energética promovemos la formación  que le permitirá obtener la información necesaria para gestionar eficientemente la energía. Cursos y seminarios para empresas privadas, organismos gubernamentales, universidades e Institutos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {mainCards.map((mainCard, index) => (
                <div key={index} className="rounded-md items-center">
                  <div>
                    <img
                      src={mainCard.img}
                      alt={mainCard.title}
                      className="w-full h-48 object-cover rounded"
                    />
                    <div className="p-3">
                      <h1 className="font-bold pb-2 text-base">{mainCard.title}</h1>
                      <h1 className="pb-2 text-justify">{mainCard.description}</h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-2xl font-bold py-8">Cursos</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {cursosCards.map((cursosCard, index) => (
                  <div key={index} className="rounded-md items-center">
                    <div>
                      <img
                        src={cursosCard.img}
                        alt={cursosCard.title}
                        className="w-full h-48 object-cover rounded"
                      />
                      <div className="p-3">
                        <h1 className="font-bold pb-2 text-base">{cursosCard.title}</h1>
                        <h1 className="pb-2 text-justify">{cursosCard.description}</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold py-8">Próximos Cursos</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {proximosCursosCards.map((proximosCursosCard, index) => (
                  <div key={index} className="rounded-md items-center">
                    <div>
                      <img
                        src={proximosCursosCard.img}
                        alt={proximosCursosCard.title}
                        className="w-full h-48 object-cover rounded"
                      />
                      <div className="p-3">
                        <h1 className="font-bold pb-2 text-base">{proximosCursosCard.title}</h1>
                        <h1 className="pb-2 text-justify">{proximosCursosCard.description}</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
