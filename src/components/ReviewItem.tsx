import Rating from "react-rating-stars-component"
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import {ReviewProps} from "../types/review.type.ts";


export function ReviewItem({
                        id,
                        name,
                        rating,
                        comment,
                        images,
                        isPurchased,
                        description,
                        likes,
                        setReviews,
                    }: ReviewProps) {
    const handleLikeClick = (id: number) => {
        setReviews((prevReviews) =>
            prevReviews.map((review) =>
                review.id === id
                    ? { ...review, likes: review.likes + 1 }
                    : review
            )
        );
    };

    const handleReplyClick = (id: number) => {
        console.log(`Trả lời bình luận của review ID: ${id}`);
    };

    return (
        <div key={id} className="border-b pb-4 mb-4">
            <div className="flex gap-4">
                <div
                    className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-white"
                >
                    {name[0]}
                </div>
                <div>
                    <span className="font-semibold">{name}</span>
                    <span className="text-gray-500 ml-2">
                        {isPurchased && "Đã mua hàng"}
                    </span>
                    <div className="flex flex-row items-center">
                        <Rating
                            count={5}
                            value={rating}
                            size={24}
                            activeColor="#FFA726"
                            edit={false}
                        />
                        <div className="text-black ml-2">{description}</div>
                    </div>
                    <p className="text-black">{comment}</p>
                    <div className="flex gap-2 mt-2">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Review ${id} image ${index + 1}`}
                                className="w-16 h-16 object-cover rounded border"
                            />
                        ))}
                    </div>
                    <div className="flex flex-row items-center gap-4 mt-2">
                        <button
                            className="flex items-center gap-1 text-gray-500 hover:text-black"
                            onClick={() => handleLikeClick(id)}
                        >
                            <ThumbUpIcon fontSize="small"/>
                            <span>{likes}</span>
                        </button>
                        <button
                            className="flex items-center gap-1 text-gray-500 hover:text-black"
                            onClick={() => handleReplyClick(id)}
                        >
                            <ReplyIcon fontSize="small" />
                            <span>Trả lời</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
