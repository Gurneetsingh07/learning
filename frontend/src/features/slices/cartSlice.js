import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: { cartItems: [] } };
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, actions) => {
            let alreadyinCart = state.value.cartItems.find(item => item._id === actions.payload.cartItems._id)
            if (alreadyinCart !== undefined) {
                alreadyinCart.itemsCount++
            } else {
                state.value.cartItems.push(actions.payload.cartItems);
            }
        },
        removeCartItem: (state, actions) => {
            let itemInCart = state.value.cartItems.find(item => item._id === actions.payload._id);
            if (itemInCart) {
                if (itemInCart.itemsCount > 1) {
                    itemInCart.itemsCount--;
                } else {
                    state.value.cartItems = state.value.cartItems.filter(item => item._id !== actions.payload._id);
                }
            }
        }
    }
});

export const { setCartItems, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;