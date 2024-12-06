import {Review} from "./review.type.ts";

export interface Product {
    id: number;
    name: string;
    price: string;
    stock: number;
    description: string;
    isActive: boolean;
    images: Array<{
        id: number;
        productID: number;
        imageUrl: string;
    }>;
    category: {
        id: number;
        name: string;
        isActive: boolean;
    };
    supplier: {
        id: number;
        name: string;
        contactEmail: string;
        contactPhone: string;
        address: string;
        country: string;
        website: string;
        isActive: boolean;
    };
    reviewDTO: Review[];
}
