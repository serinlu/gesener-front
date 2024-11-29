import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

const CartPageItem = ({ imageUrl, countInStock, maxItems, price, name, quantity, addToCart, removeFromCart, removeItemUnitFromCart, setItemQuantity, _id }) => {
    const [manualQuantity, setManualQuantity] = useState(quantity);
    const [errors, setErrors] = useState({
        maxItems: null,
    });
    // Sincronizar el estado local con el estado global (cuando cambia el carrito global)
    useEffect(() => {
        setManualQuantity(quantity);
    }, [quantity]);

    const handleIncrement = () => {
        if (manualQuantity + 1 <= countInStock) {
            if (manualQuantity + 1 > maxItems) {
                setErrors({ ...errors, maxItems: `La cantidad máxima permitida es ${maxItems}` });
                return;
            } else {
                const newQuantity = manualQuantity + 1;
                setManualQuantity(newQuantity);
                setItemQuantity(_id, newQuantity); // Actualiza la cantidad en el contexto
                setErrors({ ...errors, maxItems: null }); // Limpia el error si existe
            }
        } else {
            setErrors({ ...errors, maxItems: `No hay stock suficiente para incrementar la cantidad` });
            return
        }
    };

    const handleDecrement = () => {
        if (manualQuantity > 1) {
            const newQuantity = manualQuantity - 1;
            setManualQuantity(newQuantity);
            setItemQuantity(_id, newQuantity); // Actualiza la cantidad en el contexto
            setErrors({ ...errors, maxItems: null });
        }
    };

    const handleManualChange = (e) => {
        let value = e.target.value;

        if (value === '') {
            setManualQuantity(''); // Permitir al usuario editar
            setErrors({ ...errors, maxItems: null }); // Limpia errores temporales
        } else {
            value = Math.max(1, parseInt(value, 10)); // Asegurar el valor mínimo

            if (value > maxItems) {
                setErrors({ ...errors, maxItems: `La cantidad máxima permitida es ${maxItems}` });
            } else {
                setManualQuantity(value); // Actualiza el estado local
                setItemQuantity(_id, value); // Actualiza la cantidad en el contexto
                setErrors({ ...errors, maxItems: null }); // Limpia errores si el valor es válido
            }
        }
    };

    const handleBlur = () => {
        if (manualQuantity === '' || isNaN(manualQuantity)) {
            setManualQuantity(1);
            setItemQuantity(_id, 1);
            setErrors({ ...errors, maxItems: null }); // Limpia errores temporales
        } else if (manualQuantity > maxItems) {
            setManualQuantity(maxItems);
            setItemQuantity(_id, maxItems);
            setErrors({ ...errors, maxItems: `La cantidad máxima permitida es ${maxItems}` });
        }
    };

    const handleRemove = () => {
        removeFromCart(); // Eliminar del contexto global
    };

    return (
        <ul className="list-none">
            <li className='border-b'>
                <div className='grid grid-cols-6 items-center p-4'>
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
                        <FaTrash className='mx-auto' />
                    </Button>
                </div>
                {errors.maxItems && (
                    <p className="text-red-500 text-sm mb-4">{errors.maxItems}</p>
                )}
            </li>
        </ul>
    );
};

export default CartPageItem;
