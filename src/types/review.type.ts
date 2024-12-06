import { Dispatch, SetStateAction } from "react";

export interface Review {
    id: number;
    username: string;
    rating: number;
    comment: string;
    date: string;
    images: string[];
    isPurchased: boolean;
    description?: string;
    likes: number;
    updatedAt: string;
}

export interface ReviewProps extends Review {
    setReviews: Dispatch<SetStateAction<Review[]>>;
}