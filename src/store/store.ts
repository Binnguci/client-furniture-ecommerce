import {configureStore} from "@reduxjs/toolkit";
import wishlistReducer from './wishlist.slice.ts';
import productWishlistReducer from './product.wishlist.slice.ts';
import authReducer from './auth.slice.ts';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer:{
        wishList: wishlistReducer,
        productWishlist: productWishlistReducer,
        auth: authReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
