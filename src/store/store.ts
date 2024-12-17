import {configureStore} from "@reduxjs/toolkit";
import wishlistReducer from './wishlist.slice.ts';
import cartReducer from './cart.slice.ts';
import authReducer from './auth.slice.ts';
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer:{
        wishList: wishlistReducer,
        auth: authReducer,
        cart: cartReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
