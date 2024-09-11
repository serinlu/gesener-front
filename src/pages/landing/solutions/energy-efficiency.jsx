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
        <div className='flex space-x-14'>
          <div className='w-2/3'>
            <p className="text-lg pb-8 text-justify">
              Los principales beneficios de implementar un sistema fotovoltaico en su negocio son el de producir su propia energía eléctrica con fuentes renovables, Ahorra considerablemente en la factura de energía eléctrica y reducir su huella de carbono. Para ello ofrecemos desde el diseño, instalación, operación y mantenimiento de sistemas fotovoltaicos a pequeña y gran escala, garantizando el óptimo funcionamiento y potenciando el crecimiento sustentable de su negocio.
            </p>
            <div className="flex justify-between w-[100%] mx-auto space-x-8">
              <div className="flex-1">
                <h1 className="font-bold text-2xl pb-8">Brindamos:</h1>
                <div className=''>
                  <ul className="list-disc list-inside space-y-2 text-base">
                    <li>Kits: Solares fotovoltaicos</li>
                    <li>Kits: Bombeo de agua solar</li>
                    <li>Paneles solares</li>
                    <li>Soportes de paneles solares</li>
                    <li>Baterías solares</li>
                    <li>Inversores solares</li>
                    <li>Controladores de baterías</li>
                    <li>Cargador de baterías</li>
                    <li>Cargador auto – eléctrico</li>
                    <li>Iluminación</li>
                    <li>Accesorios</li>
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
