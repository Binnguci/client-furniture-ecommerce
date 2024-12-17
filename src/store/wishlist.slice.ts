import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import http from "../utils/http.ts";
import {Product} from "../types/product.type.ts";

interface WishlistState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: WishlistState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (_, {rejectWithValue}) => {
        try {
            const response = await http.get('/wishlist');
            return response.data.result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Unexpected error');
        }
    }
);


export const toggleWishlist = createAsyncThunk<
    number,
    { productID: number; isFavorite: boolean },
    { rejectValue: string }
>(
    'wishlist/toggleWishlist',
    async ({productID, isFavorite}, {rejectWithValue, dispatch}) => {
        try {
            if (isFavorite) {
                await http.delete('/wishlist/delete-wishlist', {data: {productID}});
                dispatch(fetchWishlist());
            } else {
                await http.post('/wishlist/add-to-wishlist', {productID});
                dispatch(fetchWishlist());
            }
            return productID;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Unexpected error');
        }
    }
);


const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder): void => {
        builder
            .addCase(fetchWishlist.pending, (state): void => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action): void => {
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action): void => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export default wishlistSlice.reducer;