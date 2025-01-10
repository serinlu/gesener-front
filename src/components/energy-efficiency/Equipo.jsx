import { Accordion, AccordionItem } from "@nextui-org/react";
import { getLeasings } from "@/services/LeasingService";
import { getBrands } from "@/services/BrandService";
import { useEffect, useState } from "react";

const Equipo = () => {
    const [leasings, setLeasings] = useState([])
    const [brands, setBrands] = useState([])
    const [leasingForm, setLeasingForm] = useState({
        name: '',
        model: '',
        brand: '',
        description: '',
        manual: '',
        sheet: '',
        image: '',
    })
    useEffect(() => {
        const fetchLeasings = () => {
            getLeasings()
            .then((data) => setLeasings(data))
            .catch((error) => console.error('Error al obtener los equipos:', error));
        }
        const fetchBrands = () => {
            
        }
        fetchLeasings();
        console.log(leasings)
    }, [])

    return (
        <div>
            {leasings.length > 0 ? (
                leasings.map((leasing) => (
                    <div key={leasing._id} className="border-b border-gray-200 py-4">
                        <td className="p-2">
                            <li>{leasing.name}</li>
                        </td>
                    </div>
                ))
            ) : (
                <div>No hay arrendamientos disponibles.</div>
            )}
        </div>
    )
}

export default Equipo