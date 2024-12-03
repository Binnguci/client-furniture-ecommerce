import {CartItem} from "../types/cartItem.type.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CartState {
    cartItems: CartItem[],
    totalPrice: number,
    totalItem: number
}

const initialState: CartState = {
    cartItems: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")!) : [],
    totalPrice: localStorage.getItem("totalPrice") ? Number(localStorage.getItem("totalPrice")) : 0,
    totalItem: localStorage.getItem("totalItem") ? Number(localStorage.getItem("totalItem")) : 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const cartItem = action.payload;
            console.log(cartItem)
            const isExist = state.cartItems.find(item => item.product.id === cartItem.product.id && item.selectedOption.name === cartItem.selectedOption.name && item.selectedSize.name === cartItem.selectedSize.name);
            if (!isExist) {
                state.cartItems.push(cartItem);
                state.totalItem = state.cartItems.length;
            } else {
                const targetCartItem = state.cartItems.find(item => item.product.id === cartItem.product.id && item.selectedOption.name === cartItem.selectedOption.name && item.selectedSize.name === cartItem.selectedSize.name);
                targetCartItem!.quantity += cartItem.quantity;
                state.totalItem = state.cartItems.length;
            }
            state.totalPrice = state.cartItems.reduce((total, item) => total + item.quantity * cartItem.product.originalPrice, 0);
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
            localStorage.setItem("totalPrice", state.totalPrice.toString());
            localStorage.setItem("totalItem", state.totalItem.toString());
        },
    }
})
export const {addToCart} = cartSlice.actions;
export const cartProducer = cartSlice.reducer;