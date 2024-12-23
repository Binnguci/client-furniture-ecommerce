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

export const searchProducts = createAsyncThunk<Product[], Record<string, unknown>, { rejectValue: string }>(
    'products/searchProducts',
    async (searchParams, { rejectWithValue }) => {
        try {
            const cleanParams = Object.fromEntries(
                Object.entries(searchParams).filter(([_, value]) => value !== undefined && value !== null)
            );

            const response = await http.get('/product/search', {
                params: cleanParams,
                paramsSerializer: (params) => {
                    return new URLSearchParams(params).toString();
                }
            });

            return response.data.result;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data as string || "Failed to search products");
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
    reducers: {},
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

export default productSlice.reducer;