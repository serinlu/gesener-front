import React from 'react';
import { Button } from '@nextui-org/react';

const FileListModal = ({ isOpen, onClose, data, onSelect, title }) => {
    if (!isOpen) return null;

    const handleSelect = (item) => {
        onSelect(item); // Llama la función para manejar la selección del archivo
        onClose(); // Cierra el modal
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] h-[80%] flex flex-col">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="flex-1 overflow-y-auto border border-gray-300 rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <li
                                key={index}
                                className="p-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                                onClick={() => handleSelect(item)} // Usa la función que cierra el modal
                            >
                                <div className="flex-1 truncate">
                                    {item.name || 'Sin nombre'}
                                </div>
                                {item.url && (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 text-sm ml-4"
                                        onClick={(e) => e.stopPropagation()} // Evita que el clic en el enlace dispare onSelect
                                    >
                                        Ver archivo
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <Button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
                        Cerrar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FileListModal;
