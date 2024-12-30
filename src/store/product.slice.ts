import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import http from "../utils/http.ts";
import {AxiosError} from "axios";
import { Product } from '../types/product.type.ts';

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await http.get('/product');
            return response.data.result;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data as string || "Failed to fetch products");
        }
    }
);

export const searchProducts = createAsyncThunk<Product[], string, { rejectValue: string }>(
    'products/searchProducts',
    async (queryString, { rejectWithValue }) => {
        try {
            const response = await http.get(`/product/search?${queryString}`);
            return response.data.result;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data as string || 'Failed to search products');
        }
    }
);




const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProducts: (state) => {
            state.products = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to load products';
            });
        builder
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to search products';
            });

    },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;