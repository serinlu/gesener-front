import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({ imageUrl, countInStock, maxItems, price, name, quantity, addToCart, removeFromCart, removeItemUnitFromCart, setItemQuantity, _id }) => {
    const [manualQuantity, setManualQuantity] = useState(quantity);
    const [errors, setErrors] = useState({
        maxItems: null,
    });

    useEffect(() => {
        setManualQuantity(quantity);
    }, [quantity]);

    const handleIncrement = () => {
        if(manualQuantity + 1 <= countInStock) {
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
            setErrors({...errors, maxItems: `No hay stock suficiente para incrementar la cantidad` });
            return
        }
    };

    const handleDecrement = () => {
        if (manualQuantity > 1) {
            const newQuantity = manualQuantity - 1;
            setManualQuantity(newQuantity);
            setItemQuantity(_id, newQuantity); // Actualiza la cantidad en el contexto
            setErrors({ ...errors, maxItems: null }); // Limpia el error si existe
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
        removeFromCart();
    };

    return (
        <li className="flex flex-col p-4 border-b">
            <div className="flex justify-between items-center">
                <div>
                    <img src={imageUrl} alt={name} className="w-16 h-16 object-cover mr-4" />
                </div>
                <div className="flex-1">
                    <Link to="/products">
                        <strong>{name}</strong>
                    </Link>
                    <div>${price.toFixed(2)}</div>
                    <div className="flex items-center mt-2">
                        <button
                            onClick={handleDecrement}
                            className="bg-indigo-500 text-white px-2 py-1 rounded mr-2"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={manualQuantity}
                            onChange={handleManualChange}
                            onBlur={handleBlur}
                            className="border rounded w-16 text-center"
                        />
                        <button
                            onClick={handleIncrement}
                            className="bg-indigo-500 text-white px-2 py-1 rounded ml-2"
                        >
                            +
                        </button>
                    </div>
                </div>
                <button
                    onClick={handleRemove}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                >
                    Eliminar
                </button>
            </div>
            {errors.maxItems && (
                <p className="text-red-500 text-sm mt-2">{errors.maxItems}</p>
            )}
        </li>
    );
};

export default CartItem;
