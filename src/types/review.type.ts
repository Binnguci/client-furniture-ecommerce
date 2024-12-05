import { Dispatch, SetStateAction } from "react";

export interface Review {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
    images: string[];
    isPurchased: boolean;
    description?: string;
    likes: number;
}

export interface ReviewProps extends Review {
    setReviews: Dispatch<SetStateAction<Review[]>>;
}