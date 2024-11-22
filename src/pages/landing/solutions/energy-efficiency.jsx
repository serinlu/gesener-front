import React, { useState } from "react";
import { useInView } from 'react-intersection-observer';
import RelatedTopics from '../../../components/RelatedTopics';
import TitleSection from "../../../components/TitleSection";

const EnergyEfficiency = () => {
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
        <div className='md:flex md:space-x-14'>
          <div className='md:w-2/3'>
            <p className="text-lg pb-8 text-justify">
              Los servicios de Gestión Energética permiten que puedas reducir y mejorar tu consumo energético y ahorrar de forma significativa manteniendo el nivel óptimo de tus instalaciones y mejorando los estándares de producción industrial. Además, nuestras soluciones reducen las emisiones de gases de efecto invernadero al producir un bajo impacto ambiental para ayudar a que su empresa sea más sostenible.
            </p>
            <div className="flex justify-between w-[100%] mx-auto space-x-8">
              <div className="flex-1">
                <h1 className="font-bold text-2xl pb-8">Brindamos:</h1>
                <div className=''>
                  <ul className="list-disc list-inside space-y-2 text-base">
                    <li>Auditoría Integral de Gestión de Energía</li>
                    <li>Estudios de calidad de la energía</li>
                    <li>Monitoreo energético en tiempo real</li>
                    <li>Proporcionar seguridad de suministro en la operación</li>
                    <li>Ejecución de proyectos para clientes del sector público y privado</li>
                    <li>Evaluación y mejoramiento de su tarifa eléctrica</li>
                    <li>Reducción y optimización de su consumo energético</li>
                    <li>Implementación y mantenimiento especializado</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <RelatedTopics />
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiency;
