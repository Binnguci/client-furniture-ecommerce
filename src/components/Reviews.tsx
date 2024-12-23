import {useEffect, useState} from "react";
import Pagination from "./Pagination.tsx";
import {ReviewItem} from "./ReviewItem.tsx";
import {Review} from "../types/review.type.ts";
import Rating from "react-rating-stars-component";
import {useAppDispatch} from "../store/store.ts";
import {createReview} from "../store/review.slice.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import http from "../utils/http.ts";
import {AxiosError} from "axios";


function Reviews({reviews, productID}: { reviews: Review[], productID: number}) {
    const [_, setReviews] = useState(reviews);
    const dispatch = useAppDispatch();
    const reviewsPerPage = 3;
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const currentReviews = reviews.slice(
        (currentPage - 1) * reviewsPerPage,
        currentPage * reviewsPerPage
    );

    const getReview = createAsyncThunk<
        Review,
        { id: number },
        { rejectValue: string }
    >(
        "review/getReview",
        async ({ id }, { rejectWithValue}) => {
            try {
                const response = await http.get(`/review/${id}`);
                console.log(response.data);
                return response.data;
            } catch (error) {
                const err = error as AxiosError;
                return rejectWithValue(err.response?.data as string || "Failed to fetch review");
            }
        }
    );

    const [userComment, setUserComment] = useState("");
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {

    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const reviewData = {
            comment: userComment,
            rating: userRating,
            productID: productID,
        };
        dispatch(createReview(reviewData))
        dispatch(getReview({id: productID}));
    };

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-3 gap-6 py-6">
                <div className="col-span-2">
                    <h3 className="text-xl font-bold mb-4">Thêm đánh giá của bạn</h3>
                    <form className="flex flex-col gap-4 mb-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-2 text-gray-700 font-medium">Xếp hạng</label>
                            <Rating
                                count={5}w
                                value={userRating}
                                onChange={setUserRating}
                                size={24}
                                activeColor="#FFA726"
                            />
                        </div>
                        <div>
                            <textarea
                                className="w-full border rounded p-2"
                                rows={3}
                                placeholder="Viết bình luận của bạn tại đây..."
                                value={userComment}
                                onChange={(e) => setUserComment(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-1/6 px-4 py-2 bg-[#FFA726] text-black font-bold rounded hover:bg-black hover:text-[#FFA726] transition-colors duration-300"
                        >
                            Gửi đánh giá
                        </button>
                    </form>


                    {currentReviews.map((review) => (
                        <ReviewItem key={review.id} {...review} setReviews={setReviews}/>
                    ))}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Reviews;
