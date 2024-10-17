import { useReducer, createContext, useState } from 'react'
import { cartReducer, cartInitialState } from '../reducers/cartReducer.js'

export const CartContext = createContext()

function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addToCart = product => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: product
        })
    }

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const removeItemUnitFromCart = product => {
        dispatch({
            type: 'REMOVE_ITEM_UNIT_FROM_CART',
            payload: product
        })
    }

    const setItemQuantity = (_id, quantity) => {
        dispatch({
            type: 'SET_ITEM_QUANTITY',
            payload: { _id, quantity }
        });
    };

    const clearCart = () => dispatch({ type: 'CLEAR_CART' })

    // const toggleCart = () => setIsCartOpen(prev => !prev)

    return { state, addToCart, removeFromCart, removeItemUnitFromCart, setItemQuantity, clearCart }
}

// la dependencia de usar React Context
// es MÍNIMA
export function CartProvider({ children }) {
    const { state, addToCart, removeFromCart, removeItemUnitFromCart, setItemQuantity, clearCart } = useCartReducer()

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            removeItemUnitFromCart,
            setItemQuantity,
            clearCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}