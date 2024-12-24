import {configureStore} from "@reduxjs/toolkit";
import wishlistReducer from './wishlist.slice.ts';
import cartReducer from './cart.slice.ts';
import authReducer from './auth.slice.ts';
import reviewReducer from './review.slice.ts';
import productReducer from './product.slice.ts';
import userReducer from './user.slice.ts';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer:{
        wishList: wishlistReducer,
        auth: authReducer,
        cart: cartReducer,
        review: reviewReducer,
        product: productReducer,
        user: userReducer,

    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
