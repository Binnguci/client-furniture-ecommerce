import {createSlice} from "@reduxjs/toolkit";
import {CartItem} from "../types/cartItem.type.ts";

type Address = {
    district: string;
    province: string;
    ward: string;
    addressLine: string;
}

type Payment = {
    method: string;
}
type FormCheckout = {
    fullName: string;
    email: string;
    phone: string;
    note: string;
    address: Address;
}
export type CheckoutState = {
    cart: CartItem[];
    formCheckout: FormCheckout;
    payment: Payment,
}
const initialState: CheckoutState = {
    cart: [],
    formCheckout: {
        fullName: '',
        email: '',
        phone: '',
        note: '',
        address: {
            district: '',
            province: '',
            ward: '',
            addressLine: '',
        }
    },
    payment: {
        method: '',
    },
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setFormCheckout: (state, action) => {
            state.formCheckout = action.payload;
        },
        setPayment: (state, action) => {
            state.payment = action.payload;
        },
        setOrder: (state, action) => {
            state.cart = action.payload.cart;
        },
    }
})

export const {setFormCheckout, setPayment, setOrder} = checkoutSlice.actions;
export default checkoutSlice.reducer;