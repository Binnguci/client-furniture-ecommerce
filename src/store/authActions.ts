import {AppDispatch} from './store';
import {clearAccessToken, clearUser, setAccessToken, setUser} from "./auth.slice.ts";
import {resetWishlist} from "./wishlist.slice.ts";
import {resetCart} from "./cart.slice.ts";

export const loadAuthFromStorage = () => (dispatch: AppDispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    if (accessToken) {
        dispatch(setAccessToken(accessToken));
    }
    if (user) {
        dispatch(setUser(JSON.parse(user)));
    }
};

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(clearAccessToken());
    dispatch(clearUser());
    dispatch(resetWishlist());
    dispatch(resetCart());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('quantityCart')
};