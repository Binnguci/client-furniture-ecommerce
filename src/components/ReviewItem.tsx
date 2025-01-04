import Rating from "react-rating-stars-component"
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import {ReviewProps} from "../types/review.type.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import {formatDate} from "../utils/formatDate.ts";
import { useState } from "react";


export function ReviewItem({
                               id,
                               username,
                               rating,
                               comment,
                               isPurchased,
                               updatedAt,
                               likes,
                               setReviews,
                           }: ReviewProps) {
    const handleLikeClick = (id: number) => {
        setReviews((prevReviews) =>
            prevReviews.map((review) =>
                review.id === id ? {...review, likes: review.likes + 1} : review)
        );
    };
    const [reply, setReply] = useState<string>("");
    const [showReplyBox, setShowReplyBox] = useState<boolean>(false);

    const handleReplyClick = (id: number) => {
        setShowReplyBox(!showReplyBox); // Toggle reply box visibility
        console.log(id)
    };

    const handleReplySubmit = (id: number) => {
        console.log(`Trả lời bình luận của review ID: ${id}, Nội dung: ${reply}`);
        // Sau khi gửi, bạn có thể xử lý để lưu bình luận phản hồi vào hệ thống, ví dụ:
        // setReviews((prevReviews) => {
        //     return prevReviews.map((review) =>
        //         review.id === id ? {...review, replies: [...review.replies, reply]} : review
        //     );
        // });
        setReply(""); // Clear the reply input after submission
        setShowReplyBox(false); // Hide the reply box after submission
    };

    return (
        <div key={id} className=" mb-4 ">
            <div className="flex gap-4 bg-gray-100 p-4 rounded-2xl">
                <div
                    className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-white">
                    {username[0]}
                </div>
                <div className={" w-full flex flex-row justify-between"}>
                    <div>
                        <span className="font-semibold">{username}</span>
                        <span className="text-green-600 ml-2">
                      {isPurchased && (
                          <>
                              <FontAwesomeIcon icon={faCircleCheck}/> Đã mua hàng
                          </>
                      )}
                    </span>
                        <div className="flex flex-row items-center">
                            <Rating count={5} value={rating} size={24} activeColor="#FFA726" edit={false}/>
                        </div>
                        <p className="text-black">{comment}</p>
                        <div className="flex flex-row items-center gap-4 mt-2">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-black"
                                    onClick={() => handleLikeClick(id)}>
                                <ThumbUpIcon fontSize="small"/>
                                <span>{likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-black"
                                    onClick={() => handleReplyClick(id)}>
                                <ReplyIcon fontSize="small"/>
                                <span>Trả lời</span>
                            </button>
                        </div>
                        
                    </div>
                    <div>{formatDate(updatedAt)}</div>
                </div>
            </div>
            {showReplyBox && (
                            <div className="mt-4">
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    rows={3}
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Nhập bình luận phản hồi..."
                                />
                                <div className="mt-2 flex justify-end">
                                <button
                                        className="px-4 py-2 bg-[#FFA726] text-black hover:bg-black hover:text-[#FFA726] font-bold mr-2 rounded-lg"
                                        onClick={() => handleReplySubmit(id)}>
                                        Hủy
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-black text-[#FFA726] hover:bg-[#FFA726] hover:text-[#FFA726] font-bold rounded-lg"
                                        onClick={() => handleReplySubmit(id)}>
                                        Gửi
                                    </button>
                                </div>
                            </div>
                        )}
        </div>
    );
}