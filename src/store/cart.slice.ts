import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {Cart} from "../types/cart.type";
import http from "../utils/http.ts";

interface CartState {
    cart: Cart | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: CartState = {
    cart: null,
    status: "idle",
    error: null,
};

const API_BASE_URL = "user/cart";

export const fetchCart = createAsyncThunk<Cart, void, { rejectValue: string }>(
    "cart/fetchCart",
    async (_, {rejectWithValue}) => {
        try {
            const response = await http.get(`${API_BASE_URL}/get-cart`);
            console.log("fetch cart", response.data.result)
            return response.data.result;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data as string || "Failed to fetch cart");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
    },
});

export default cartSlice.reducer;

