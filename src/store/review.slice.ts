import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ReviewRequestType } from "../types/reviewRequest.type.ts";
import http from "../utils/http.ts";
import { Review } from "../types/review.type.ts";

export type ReviewState = {
    loading: boolean;
    success: boolean;
    error: string | null;
    reviews: Review[];
    currentReview: Review | null;
};

const initialState: ReviewState = {
    loading: false,
    success: false,
    error: null,
    reviews: [],
    currentReview: null,
};


export const getReview = createAsyncThunk<
    Review[],
    { id: number },
    { rejectValue: string }
>(
    "review/getReview",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await http.get(`/review/${id}`);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data as string || "Failed to fetch reviews");
        }
    }
);


export const createReview = createAsyncThunk<
    Review,
    ReviewRequestType,
    { rejectValue: string }
>(
    "review/createReview",
    async (reviewData, { rejectWithValue }) => {
        try {
            const response = await http.post("/review", reviewData);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data as string || "Failed to create review");
        }
    }
);


const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        resetReviewState(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.reviews = [];
            state.currentReview = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReview.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(getReview.fulfilled, (state, action: PayloadAction<Review[]>) => {
                state.loading = false;
                state.success = true;
                state.reviews = action.payload;
            })
            .addCase(getReview.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || "Failed to fetch reviews";
            });

        builder
            .addCase(createReview.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(createReview.fulfilled, (state, action: PayloadAction<Review>) => {
                state.loading = false;
                state.success = true;
                state.currentReview = action.payload;
            })
            .addCase(createReview.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || "Failed to create review";
            });
    },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
