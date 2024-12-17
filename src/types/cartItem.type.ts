import {Product} from "./product.type.ts";

export interface CartItem {
    id: string;
    productDTO: Product;
    quantity: number;
}