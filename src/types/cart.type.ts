import {User} from "./user.type.ts";
import {CartItem} from "./cartItem.type.ts";

export interface Cart{
    id: string;
    userDTO: User;
    cartItemResponse: CartItem[];
    quantity: number;
    amount: string;
}