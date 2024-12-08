import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from "../utils/http.ts";

interface WishlistState {
    items: number[];
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
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await http.get('/product/wishlist', { params: { email } });
            console.log('API Response:', response.data.result);
            return response.data.result.map((item: { id: number }) => item.id);
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
    { email: string; productID: number; isFavorite: boolean },
    { rejectValue: string }
>(
    'wishlist/toggleWishlist',
    async ({ email, productID, isFavorite }, { rejectWithValue }) => {
        try {
            const requestBody = { email, productID };
            if (isFavorite) {
                await http.delete('/product/delete-wishlist', { data: requestBody });
            } else {
                await http.post('/product/add-to-wishlist', requestBody);
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
    reducers: {
        removeItemFromWishlist(state, action) {
            state.items = state.items.filter((id) => id !== action.payload);
        },
        addItemToWishlist(state, action) {
            if (!state.items.includes(action.payload)) {
                state.items.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                console.log('Fetched Wishlist IDs:', action.payload);
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(toggleWishlist.fulfilled, (state, action) => {
                const productID = action.payload;
                if (state.items.includes(productID)) {
                    state.items = state.items.filter((id) => id !== productID);
                } else {
                    state.items.push(productID);
                }
            });
    },
});

export const { removeItemFromWishlist, addItemToWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;