import {Review} from "./review.type.ts";
import {Supplier} from "./supplier.type.ts";
import {CategoryType} from "./category.type.ts";
import {Image} from "./image.type.ts";

export type Product =  {
    id: number;
    name: string;
    price: string;
    stock: number;
    description: string;
    isActive: boolean;
    images: Image[];
    category: CategoryType;
    supplier: Supplier;
    reviewDTO: Review[];
}
