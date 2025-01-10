import {UserInfoProps} from "../types/userInfor.type.ts";
import http from "../utils/http.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

const initialState: UserInfoProps = {
    username: '',
    email: '',
    phone: '',
    fullName: '',
};
export const updateAccount = createAsyncThunk(
    'user/updateAccount',
    async (userData: UserInfoProps, { rejectWithValue, dispatch}) => {
        try {
            const response = await http.put('/user/update-account', userData);
            console.log(response.data)
            dispatch(setUser(JSON.parse(response.data)));
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data as string || "Failed to create review");
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.fullName = action.payload.fullName;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.phone = action.payload.phone;
                state.fullName = action.payload.fullName;
            })
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;