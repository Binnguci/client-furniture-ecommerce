import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from "../utils/http.ts";

interface ProductWishlistState {
    items: Array<{ id: number; name: string; price: string; image: string }>;
    loading: boolean;
    error: string | null;
}

const initialState: ProductWishlistState = {
    items: [],
    loading: false,
    error: null,
};

export const showProductInWishlist = createAsyncThunk(
    'productWishlist/fetchProducts',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await http.get('/product/wishlist', { params: { email } });
            console.log('Fetched Wishlist Products:', response.data.result);
            return response.data.result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Unexpected error');
        }
    }
);

const productWishlistSlice = createSlice({
    name: 'productWishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(showProductInWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(showProductInWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(showProductInWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default productWishlistSlice.reducer;
