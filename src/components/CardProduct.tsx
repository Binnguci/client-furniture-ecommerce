"use client";
import {DirectionAwareHover} from "./ui/direction-aware-hover.tsx";
import imageUrl from "../assets/images/post-1.jpg";


export function CardProduct() {
    return (
        <div className="h-[40rem] relative  flex items-center justify-center">
            <DirectionAwareHover imageUrl={imageUrl}>
                <p className="font-bold text-xl">In the mountains</p>
                <p className="font-normal text-sm">$1299 / night</p>
            </DirectionAwareHover>
        </div>
    );
}
