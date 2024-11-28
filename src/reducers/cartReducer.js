export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || [];

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    REMOVE_ITEM_UNIT_FROM_CART: 'REMOVE_ITEM_UNIT_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
    SET_ITEM_QUANTITY: 'SET_ITEM_QUANTITY',
};

// update localStorage with state for cart
export const updateLocalStorage = (state) => {
    window.localStorage.setItem('cart', JSON.stringify(state));
};

const UPDATE_STATE_BY_ACTION = {
    [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
        const { _id } = action.payload;
        const productInCartIndex = state.findIndex((item) => item._id === _id);

        if (productInCartIndex >= 0) {
            const newState = [
                ...state.slice(0, productInCartIndex),
                {
                    ...state[productInCartIndex],
                    quantity: state[productInCartIndex].quantity + 1,
                },
                ...state.slice(productInCartIndex + 1),
            ];

            updateLocalStorage(newState);
            return newState;
        }

        const newState = [
            ...state,
            {
                ...action.payload, // product
                quantity: 1,
            },
        ];

        updateLocalStorage(newState);
        return newState;
    },
    [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
        const { _id } = action.payload;
        const newState = state.filter((item) => item._id !== _id);
        updateLocalStorage(newState);
        return newState;
    },
    [CART_ACTION_TYPES.CLEAR_CART]: () => {
        updateLocalStorage([]);
        return [];
    },
    [CART_ACTION_TYPES.REMOVE_ITEM_UNIT_FROM_CART]: (state, action) => {
        const { _id } = action.payload;
        const productInCartIndex = state.findIndex((item) => item._id === _id);

        if (productInCartIndex >= 0) {
            const product = state[productInCartIndex];

            if (product.quantity > 1) {
                const newState = [
                    ...state.slice(0, productInCartIndex),
                    { ...product, quantity: product.quantity - 1 },
                    ...state.slice(productInCartIndex + 1),
                ];
                updateLocalStorage(newState);
                return newState;
            } else {
                const newState = state.filter((item) => item._id !== _id);
                updateLocalStorage(newState);
                return newState;
            }
        }

        return state;
    },
    [CART_ACTION_TYPES.SET_ITEM_QUANTITY]: (state, action) => {
        const { _id, quantity } = action.payload;
        const productInCartIndex = state.findIndex((item) => item._id === _id);

        if (productInCartIndex >= 0 && quantity > 0) {
            const newState = [
                ...state.slice(0, productInCartIndex),
                { ...state[productInCartIndex], quantity },
                ...state.slice(productInCartIndex + 1),
            ];
            updateLocalStorage(newState);
            return newState;
        }

        const newState = state.filter((item) => item._id !== _id);
        updateLocalStorage(newState);
        return newState;
    },
};

export const cartReducer = (state, action) => {
    const { type: actionType } = action;
    const updateState = UPDATE_STATE_BY_ACTION[actionType];
    return updateState ? updateState(state, action) : state;
};
