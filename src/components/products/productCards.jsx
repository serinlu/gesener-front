import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const ProductCards = ({ name, categories, price }) => {
    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{name}</h4>
                <p className="text-tiny uppercase font-bold">
                    {categories.map((category) => category.name).join(', ')} {/* Muestra los nombres de las categorías */}
                </p>
                <small className="text-default-500">${price}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt={name}
                    className="object-cover rounded-xl"
                    src="https://via.placeholder.com/270" // Puedes reemplazar con una URL dinámica si tienes la imagen en tu base de datos
                    width={270}
                    height={270}
                />
            </CardBody>
        </Card>
    );
};

export default ProductCards;
