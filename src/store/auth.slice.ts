import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "../types/user.type.ts";
import {RootState} from "./store.ts";

const initialState = {
    user: {
        id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).id : null,
        username: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).username : null,
        fullName: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).fullName : null,
        email: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).email : null,
        phone: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).phone : null,
    } as User,
    accessToken: null as string | null,
    isLoggedIn: !!localStorage.getItem('accessToken'),
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.isLoggedIn = true;
        },
        clearAccessToken: (state) => {
            state.accessToken = null;
            state.isLoggedIn = false;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = {
                id: null,
                username: null,
                fullName: null,
                email: null,
                phone: null,
            };
        },
    },
});

export const { setAccessToken, clearAccessToken, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
