import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "../types/user.type.ts";

const initialState = {
    user: {
        id: null,
        username: null,
        fullName: null,
        email: null,
        phone: null,
    } as User,
    accessToken: null as string | null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        clearAccessToken: (state) => {
            state.accessToken = null;
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
