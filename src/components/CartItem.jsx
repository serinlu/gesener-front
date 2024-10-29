// CartItem.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({ imageUrl, price, name, quantity, addToCart, removeFromCart, removeItemUnitFromCart, setItemQuantity, _id }) => {
    const [manualQuantity, setManualQuantity] = useState(quantity);

    useEffect(() => {
        setManualQuantity(quantity);
    }, { quantity });

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
        if (manualQuantity === '' || isNaN(manualQuantity)) {
            setManualQuantity(1)
            setItemQuantity(_id, 1);
        }
    }

    const handleRemove = () => {
        removeFromCart();
    };

    return (
        <li className="flex justify-between items-center p-4 border-b">
            <div>
                <img src={imageUrl} alt={name} className="w-16 h-16 object-cover mr-4" />
            </div>
            <div className="flex-1">
                <Link to='/products'>
                    <strong>{name}</strong>
                </Link>
                <div>${price.toFixed(2)}</div>
                <div className="flex items-center mt-2">
                    <button onClick={handleDecrement} className="bg-indigo-500 text-white px-2 py-1 rounded mr-2">-</button>
                    <input
                        type="number"
                        value={manualQuantity}
                        onChange={handleManualChange}
                        onBlur={handleBlur}
                        className="border rounded w-16 text-center"
                    />
                    <button onClick={handleIncrement} className="bg-indigo-500 text-white px-2 py-1 rounded ml-2">+</button>
                </div>
            </div>
            <button onClick={handleRemove} className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
            </button>
        </li>
    );
};

export default CartItem;
