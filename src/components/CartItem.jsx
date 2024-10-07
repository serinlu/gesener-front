// CartItem.tsx
import React, { useState } from 'react';

const CartItem = ({ thumbnail, price, name, quantity, addToCart, removeFromCart }) => {
    const [manualQuantity, setManualQuantity] = useState(quantity);

    const handleIncrement = () => {
        addToCart();
        setManualQuantity(manualQuantity + 1);
    };

    const handleDecrement = () => {
        if (manualQuantity > 1) {
            setManualQuantity(manualQuantity - 1);
        }
    };

    const handleManualChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value)); // Evitar que sea menor a 1
        setManualQuantity(value);
    };

    const handleRemove = () => {
        removeFromCart();
    };

    return (
        <li className="flex justify-between items-center p-4 border-b">
            <img src={thumbnail} alt={name} className="w-16 h-16 object-cover mr-4" />
            <div className="flex-1">
                <strong>{name}</strong>
                <div>${price.toFixed(2)}</div>
                <div className="flex items-center mt-2">
                    <button onClick={handleDecrement} className="bg-indigo-500 text-white px-2 py-1 rounded mr-2">-</button>
                    <input
                        type="number"
                        value={manualQuantity}
                        onChange={handleManualChange}
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
