import {configureStore} from "@reduxjs/toolkit";
import wishlistReducer from './wishlist.slice.ts';
import productWishlistReducer from './product.wishlist.slice.ts';

export const store = configureStore({
    reducer:{
        wishList: wishlistReducer,
        productWishlist: productWishlistReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;