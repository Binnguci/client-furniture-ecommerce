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

export const addProductIntoCart = createAsyncThunk<Cart, { productID: number, quantity: number }, {
    rejectValue: string
}>(
    "cart/addProductIntoCart",
    async ({productID, quantity}, {rejectWithValue, dispatch}) => {
        try {
            const response = await http.post(`${API_BASE_URL}/add-product-into-cart`, {productID, quantity});
            dispatch(fetchCart());
            return response.data.result;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data as string || "Failed to add product into cart");
        }
    }
);

export const removeProductFromCart = createAsyncThunk<Cart, { productID: number }, { rejectValue: string }>(
    "cart/removeProductFromCart",
    async ({productID}, {rejectWithValue, dispatch}) => {
        try {
            const response = await http.delete(`${API_BASE_URL}/delete-product-from-cart/${productID}`);
            dispatch(fetchCart());
            return response.data.result;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data as string || "Failed to remove product from cart");
        }
    }
);

export const increaseProductQuantity = createAsyncThunk<Cart, { productID: number }, { rejectValue: string }>(
    "cart/increaseProductQuantity",
    async ({productID}, {rejectWithValue, dispatch}) => {
        try {
            const response = await http.put(`${API_BASE_URL}/increase-quantity`, {productID});
            dispatch(fetchCart())
            return response.data.result;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data as string || "Failed to update product quantity");
        }
    }
);

export const decreaseProductQuantity = createAsyncThunk<Cart, { productID: number, }, { rejectValue: string }>(
    "cart/decreaseProductQuantity",
    async ({productID}, {rejectWithValue, dispatch}) => {
        try {
            const response = await http.put(`${API_BASE_URL}/decrease-quantity`, {productID});
            dispatch(fetchCart())
            return response.data.result;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data as string || "Failed to update product quantity");
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
            .addCase(addProductIntoCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addProductIntoCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cart = action.payload;
            })
            .addCase(addProductIntoCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(removeProductFromCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cart = action.payload;
            })
            .addCase(removeProductFromCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(increaseProductQuantity.pending, (state) => {
                state.status = "loading";
            })
            .addCase(increaseProductQuantity.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cart = action.payload;
            })
            .addCase(increaseProductQuantity.rejected , (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(decreaseProductQuantity.pending, (state) => {
                state.status = "loading";
            })
            .addCase(decreaseProductQuantity.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cart = action.payload;
            })
            .addCase(decreaseProductQuantity.rejected , (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default cartSlice.reducer;

