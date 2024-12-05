import {useState} from "react";
import RatingSummary from "./ReactSumary.tsx";
import product2 from "../assets/img/product-2.png";
import product3 from "../assets/img/product-3.png";
import Pagination from "./Pagination.tsx";
import {ReviewItem} from "./ReviewItem.tsx";
import {Review} from "../types/review.type.ts";
import Rating from "react-rating-stars-component";

function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: 1,
            name: "Nguyễn Văn Hiếu",
            rating: 5,
            comment: "Ghế đẹp, chất lượng tốt, giao hàng nhanh.",
            date: "2024-12-01",
            images: [product2, product3],
            isPurchased: true,
            likes: 10,
        },
        {
            id: 2,
            name: "Trần Thị B",
            rating: 4,
            comment: "Giao hàng nhanh, chất lượng ổn định.",
            date: "2024-11-30",
            images: [],
            isPurchased: true,
            likes: 10,
        },
        {
            id: 3,
            name: "Trần Thị B",
            rating: 4,
            comment: "Giao hàng nhanh, chất lượng ổn định.",
            date: "2024-11-30",
            images: [],
            isPurchased: true,
            likes: 10,
        },
        {
            id: 4,
            name: "Trần Thị B",
            rating: 4,
            comment: "Giao hàng nhanh, chất lượng ổn định.",
            date: "2024-11-30",
            images: [],
            isPurchased: true,
            likes: 10,
        },
    ]);

    const relatedProducts = [
        {
            id: 1,
            name: "Sản phẩm 1",
            category: "furniture",
            price: 500000,
            image: product2,
        },
        {
            id: 2,
            name: "Sản phẩm 2",
            category: "furniture",
            price: 700000,
            image: product3,
        },
        {
            id: 3,
            name: "Sản phẩm 3",
            category: "furniture",
            price: 300000,
            image: product2,
        },
    ];

    const currentProductCategory = "furniture";
    const filteredProducts = relatedProducts.filter(
        (product) => product.category === currentProductCategory
    );


    const descriptions = [
        "Rất không hài lòng",
        "Không hài lòng",
        "Tốt",
        "Hài lòng",
        "Rất hài lòng"
    ];

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
            <div className="border-b pb-6">
                <h2 className="text-2xl font-bold mb-4">Khách hàng đánh giá</h2>
                <RatingSummary/>
            </div>
            <div className="grid grid-cols-3 gap-6 py-6">
                <div className="col-span-2">
                    <h3 className="text-xl font-bold mb-4">Thêm đánh giá của bạn</h3>
                    <form
                        className="flex flex-col gap-4 mb-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const newReview = {
                                id: reviews.length + 1,
                                name: "Người dùng mới",
                                rating: userRating,
                                comment: userComment,
                                date: new Date().toISOString().split("T")[0],
                                images: [],
                                isPurchased: false,
                                likes: 0,
                            };
                            setReviews((prev) => [newReview, ...prev]);
                            setUserRating(0);
                            setUserComment("");
                        }}
                    >
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
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#FFA726] text-black font-bold rounded hover:bg-black hover:text-[#FFA726] transition-colors duration-300"
                        >
                            Gửi đánh giá
                        </button>
                    </form>

                    <h3 className="text-xl font-bold mb-4">Lọc theo</h3>
                    <div className="flex gap-4 mb-6">
                        <button className="px-4 py-2 border rounded">Mới nhất</button>
                        <button className="px-4 py-2 border rounded">Có hình ảnh</button>
                        <button className="px-4 py-2 border rounded">Đã mua hàng</button>
                        {[5, 4, 3, 2, 1].map((star) => (
                            <button key={star} className="px-4 py-2 border rounded">
                                {star} sao
                            </button>
                        ))}
                    </div>
                    {currentReviews.map((review) => (
                        <ReviewItem
                            key={review.id}
                            {...review}
                            id={review.id}
                            name={review.name}
                            rating={review.rating}
                            comment={review.comment}
                            images={review.images}
                            isPurchased={review.isPurchased}
                            likes={review.likes}
                            description={descriptions[review.rating - 1]}
                            setReviews={setReviews}
                        />
                    ))}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}/>
                    )}
                </div>
                <div className="col-span-1 bg-gray-100 rounded">
                    <div className={"flex bg-[#FFA726] py-1 px-2  justify-between items-center"}>
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
                                    <button className="mt-2 px-4 py-2 bg-[#FFA726] text-black rounded hover:bg-black hover:text-[#FFA726] font-bold">
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reviews;