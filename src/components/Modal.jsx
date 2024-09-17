import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { FaCross, FaSearch } from "react-icons/fa";

const ModalComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState('md');
    const [showBackdrop, setShowBackdrop] = React.useState(false);

    const handleOpen = (size) => {
        setSize(size);
        setShowBackdrop(true);
        setTimeout(() => onOpen(), 100);
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => setShowBackdrop(false), 300);
    };

    return (
        <div className="relative">
            {/* Navbar */}
            <Button
                key={size}
                onPress={() => handleOpen(size)}
                className="text-lg hover:text-indigo-500 duration-300 bg-white p-2 flex justify-center items-center"
                style={{ outline: 'none', boxShadow: 'none' }}
            >
                <FaSearch />
            </Button>

            {showBackdrop && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                        } flex justify-center items-center`}
                >
                    {/* Modal */}
                    <Modal
                        size={size}
                        isOpen={isOpen}
                        onClose={handleClose}
                        className="bg-white w-[50%] h-[30%] z-10 shadow-md rounded-2xl transition-transform duration-300 transform scale-100"
                    >
                        <ModalContent className="relative p-4">
                            {/* Botón de cerrar en la esquina superior derecha */}
                            <Button
                                aria-label="Close"
                                variant="light"
                                color="danger"
                                className="absolute top-2 right-2 z-20"
                                onPress={handleClose}
                                auto
                                icon={<FaCross />}
                            />
                            <div>
                                <ModalHeader className="flex justify-between items-center text-start">
                                    <span>Buscar</span>
                                    {/* El botón de cerrar ya está alineado a la derecha */}
                                </ModalHeader>
                                <ModalBody>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input type="text" label="Email" />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={handleClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={handleClose}>
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </div>
                        </ModalContent>
                    </Modal>
                </div>
            )}
        </div>
    );
}

export default ModalComponent;
