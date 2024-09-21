import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const ProductCards = () => {
    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                <small className="text-default-500">12 Tracks</small>
                <h4 className="font-bold text-large">Frontend Radio</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="Frontend Radio" className="w-96 h-96 object-cover rounded-lg"
                />
            </CardBody>
        </Card>
    );
}

export default ProductCards;
