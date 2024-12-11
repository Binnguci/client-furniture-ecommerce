import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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
    async (_, { rejectWithValue }) => {
        try {
            const response = await http.get('/wishlist');
            return response.data.result.map((item: { id: number }): number => item.id);
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
    async ({ productID, isFavorite }, { rejectWithValue }) => {
        try {
            if (isFavorite) {
                await http.delete('/wishlist/delete-wishlist', { data: { productID } });
            } else {
                await http.post('/wishlist/add-to-wishlist', { productID });
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
            state.items = state.items.filter((id: number): boolean => id !== action.payload);
        },
        addItemToWishlist(state, action) {
            if (!state.items.includes(action.payload)) {
                state.items.push(action.payload);
            }
        },
    },
    extraReducers: (builder): void => {
        builder
            .addCase(fetchWishlist.pending, (state): void => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action): void => {
                console.log('Fetched Wishlist IDs:', action.payload);
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action): void => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(toggleWishlist.fulfilled, (state, action): void => {
                const productID = action.payload;
                if (state.items.includes(productID)) {
                    state.items = state.items.filter((id): boolean => id !== productID);
                } else {
                    state.items.push(productID);
                }
            });
    },
});

export const {removeItemFromWishlist, addItemToWishlist} = wishlistSlice.actions;

export default wishlistSlice.reducer;