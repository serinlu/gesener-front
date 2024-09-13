import { Accordion, AccordionItem } from "@nextui-org/react";


const Item = ({ imagen, modelo, marca }) => {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-[50%]">
                <img src={imagen} alt="" className="w-96 h-96 object-cover" />
            </div>
            <div className="w-[50%] space-y-4">
                {/* Modelo */}
                <section>
                    <h3>Modelo</h3>
                    <p>{modelo}</p>
                </section>
                {/* Marca */}
                <section>
                    <h3 className="text-blue-500 text-xl">Marca</h3>
                    <p className="text-gray-500 text-md">{marca}</p>
                </section>
            </div>
        </div>
    )
}

const Equipo = () => {
    return (
        <Accordion >
            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
                <Item imagen={"https://www.gesener.pe/wp-content/uploads/2022/04/unnamed-300x240-1.jpeg"} modelo={"Camara"} marca={"Canon"} />
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                <Item imagen={"https://www.gesener.pe/wp-content/uploads/2024/04/dronedji.png"} modelo={"M210V2XT2"} marca={"Drone"} />
            </AccordionItem>
        </Accordion>
    )
}

export default Equipo