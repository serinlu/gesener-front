import React, { useState } from "react";
import { useInView } from 'react-intersection-observer';
import RelatedTopics from '@/components/RelatedTopics';
import TitleSection from "@/components/TitleSection";
import Equipo from "@/components/energy-efficiency/Equipo";

const EquipmentRental = () => {
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
            Prestamos el servicio especializado de alquiler de equipos de medición de parámetros eléctricos y energía con certificado de calibración, contamos con una variedad de equipos que se detallan a continuación:
            </p>
            <div className="flex justify-between w-[100%] mx-auto space-x-8">
              <div className="flex-1">
                <h1 className="font-bold text-2xl pb-8">Brindamos:</h1>
                <div className=''>
                  <ul className="list-inside space-y-2 text-base">
                    <Equipo/>
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

export default EquipmentRental;
