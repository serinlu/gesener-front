import React, { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import RelatedTopics from '@/components/RelatedTopics';
import TitleSection from "@/components/TitleSection";
import Equipo from "@/components/energy-efficiency/Equipo";
import { getAllLeasings } from '@/services/LeasingService';
import { getBrands } from "@/services/BrandService";

const EquipmentRental = () => {
  const [startCount, setStartCount] = useState(false);
  const [leasings, setLeasings] = useState([]);
  const [brands, setBrands] = useState([]);
  const [expandedLeasing, setExpandedLeasing] = useState(null);
  const [leasingForm, setLeasingForm] = useState({
    name: '',
    model: '',
    brand: '',
    description: '',
    manual: '',
    sheet: '',
    image: ''
  })

  useEffect(() => {
    fetchLeasings()
    fetchBrands()
  }, [])

  const fetchLeasings = () => {
    getAllLeasings()
      .then((data) => setLeasings(data))
      .catch((error) => console.error(error))
  }

  const fetchBrands = () => {
    getBrands()
      .then(data => setBrands(data))
      .catch((error) => console.error('Error al obtener las marcas:', error))
  }
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

  const toggleExpand = (id) => {
    setExpandedLeasing((prev) => (prev === id ? null : id));
  };

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
                <div className="space-y-4">
                  {leasings.length > 0 ? (
                    leasings.map((leasing) => (
                      <div
                        key={leasing._id}
                        className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div
                          className="flex justify-between items-center"
                          onClick={() => toggleExpand(leasing._id)}
                        >
                          <h2 className="text-xl font-bold">{leasing.name}</h2>
                          <span className="text-gray-500">
                            {expandedLeasing === leasing._id ? '▲' : '▼'}
                          </span>
                        </div>

                        {expandedLeasing === leasing._id && (
                          <div key={leasing._id} className="mt-4 flex items-start space-x-4">
                            {/* Contenedor para el texto */}
                            <div className="flex-1">
                              <p>
                                <strong>Modelo:</strong> {leasing.model}
                              </p>
                              <p>
                                <strong>Marca:</strong> {leasing.brand?.name}
                              </p>
                              <div className="mt-2">
                                <strong>Descripción:</strong>
                                <div
                                  className="text-justify text-gray-700"
                                  dangerouslySetInnerHTML={{ __html: leasing.description }}
                                />
                              </div>
                              <div className="mt-2 space-y-1">
                                <p>
                                  <strong>Manual:</strong>{' '}
                                  <a
                                    href={leasing.manual}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                  >
                                    Ver manual
                                  </a>
                                </p>
                                <p>
                                  <strong>Ficha técnica:</strong>{' '}
                                  <a
                                    href={leasing.sheet}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                  >
                                    Ver ficha técnica
                                  </a>
                                </p>
                              </div>
                            </div>

                            {/* Contenedor para la imagen */}
                            <div className="w-40 h-40 flex-shrink-0">
                              <img
                                src={leasing.image}
                                alt={leasing.name}
                                className="w-full h-full object-cover rounded-lg border"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center">No hay arrendamientos disponibles</div>
                  )}
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
