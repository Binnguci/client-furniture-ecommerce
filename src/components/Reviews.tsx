import {useState} from "react";
import Pagination from "./Pagination.tsx";
import {ReviewItem} from "./ReviewItem.tsx";
import {Review} from "../types/review.type.ts";
import Rating from "react-rating-stars-component";


function Reviews({reviews}: { reviews: Review[] }) {
    const [_, setReviews] = useState(reviews);
    // const currentProductCategory = "furniture";
    // const filteredProducts = relatedProducts.filter(
    //     (product) => product.category === currentProductCategory
    // );

    // const descriptions = [
    //     "Rất không hài lòng",
    //     "Không hài lòng",
    //     "Tốt",
    //     "Hài lòng",
    //     "Rất hài lòng"
    // ];

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

    const [userComment, setUserComment] = useState("");
    const [userRating, setUserRating] = useState(0);


    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-3 gap-6 py-6">
                <div className="col-span-2">
                    <h3 className="text-xl font-bold mb-4">Thêm đánh giá của bạn</h3>
                    <form
                        className="flex flex-col gap-4 mb-6"
                        onSubmit={(e): void => {
                            e.preventDefault();
                            const newReview = {
                                id: reviews.length + 1,
                                username: "Thành viên ẩn danh",
                                rating: userRating,
                                comment: userComment,
                                date: new Date().toISOString().split("T")[0],
                                images: [],
                                isPurchased: false,
                                updatedAt: "",
                                likes: 0,
                            };
                            setReviews((prev: Review[]) => [newReview, ...prev]);
                            setUserRating(0);
                            setUserComment("");
                        }}
                    >
                        <div>
                            <label className="block mb-2 text-gray-700 font-medium">Xếp hạng</label>
                            <Rating
                                count={5}
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
                            className="w-1/6 px-4 py-2 bg-[#FFA726] text-black font-bold rounded hover:bg-black hover:text-[#FFA726] transition-colors duration-300">
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
                {/*<div className="col-span-1 bg-gray-100 rounded overflow-auto">
                    <div className={"flex bg-[#FFA726] py-1 px-2 justify-between items-center"}>
                        <h3 className="text-lg font-bold mb-4">Có thể bạn sẽ thích</h3>
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-4 border p-4 rounded shadow bg-white">
                                <div className="w-32 h-32 flex-shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover rounded"/>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-semibold text-lg">{product.name}</h4>
                                    <p className="text-sm text-gray-500">
                                        Giá: {product.price.toLocaleString()}₫
                                    </p>
                                    <button
                                        className="mt-2 px-4 py-2 bg-[#FFA726] text-black rounded hover:bg-black hover:text-[#FFA726] font-bold">
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>*/}
            </div>
        </div>
    );
}

export default Reviews;
