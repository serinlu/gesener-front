import { useReducer, createContext, useState } from 'react'
import { cartReducer, cartInitialState } from '../reducers/cartReducer.js'

export const CartContext = createContext()

function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)
    const [isCartOpen, setIsCartOpen] = useState(false)

    const addToCart = product => {
        const productInCartIndex = state.findIndex(item => item._id === product._id)
        if (productInCartIndex === -1) {
            setIsCartOpen(true)
        }
        dispatch({
            type: 'ADD_TO_CART',
            payload: product
        })
    }

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({ type: 'CLEAR_CART' })

    const toggleCart = () => setIsCartOpen(prev => !prev)

    return { state, addToCart, removeFromCart, clearCart, isCartOpen, toggleCart }
}

// la dependencia de usar React Context
// es MÍNIMA
export function CartProvider({ children }) {
    const { state, addToCart, removeFromCart, clearCart, isCartOpen, toggleCart } = useCartReducer()

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart,
            isCartOpen,
            toggleCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}