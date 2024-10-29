import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

const CartPageItem = ({ imageUrl, price, name, quantity, addToCart, removeFromCart, removeItemUnitFromCart, setItemQuantity, _id }) => {
    const [manualQuantity, setManualQuantity] = useState(quantity);

    // Sincronizar el estado local con el estado global (cuando cambia el carrito global)
    useEffect(() => {
        setManualQuantity(quantity);
    }, [quantity]);

    const handleIncrement = () => {
        const newQuantity = manualQuantity + 1;
        setManualQuantity(newQuantity);
        setItemQuantity(_id, newQuantity); // Actualiza la cantidad en el contexto
    };

    const handleDecrement = () => {
        if (manualQuantity > 1) {
            const newQuantity = manualQuantity - 1;
            setManualQuantity(newQuantity);
            setItemQuantity(_id, newQuantity); // Actualiza la cantidad en el contexto
        }
    };

    const handleManualChange = (e) => {
        let value = e.target.value;

        // Si el valor está vacío, establece el valor temporalmente en una cadena vacía para que el usuario pueda editar
        if (value === '') {
            setManualQuantity('');
        } else {
            // Asegurarse de que el valor mínimo sea 1
            value = Math.max(1, parseInt(value, 10));
            setManualQuantity(value); // Actualiza el estado local
            setItemQuantity(_id, value); // Actualiza la cantidad en el contexto
        }
    };

    const handleBlur = () => {
        if(manualQuantity === '' || isNaN(manualQuantity)) {
            setManualQuantity(1)
            setItemQuantity(_id, 1);
        }
    }

    const handleRemove = () => {
        removeFromCart(); // Eliminar del contexto global
    };

    return (
        <li className="grid grid-cols-6 items-center p-4 border-b">
            <img src={imageUrl} alt={name} className="w-16 h-16 object-cover mr-4" />
            <strong>{name}</strong>
            <div>${price.toFixed(2)}</div>
            <div className="flex items-center mt-2">
                <Button onClick={handleDecrement} className="bg-gray-500 text-white px-2 py-1 rounded mr-1">-</Button>
                <input
                    type="number"
                    value={manualQuantity}
                    onChange={handleManualChange}
                    onBlur={handleBlur}
                    className="border rounded py-1 w-12 text-center"
                />
                <Button onClick={handleIncrement} className="bg-gray-500 text-white px-2 py-1 rounded ml-1">+</Button>
            </div>
            <div className='flex items-center'>${(price * manualQuantity).toFixed(2)}</div>
            <Button onClick={handleRemove} className="bg-red-600 text-white px-2 py-2 rounded-md w-[30%] mx-auto">
                <FaTrash className='mx-auto'/>
            </Button>
        </li>
    );
};

export default CartPageItem;
