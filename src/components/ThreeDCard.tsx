"use client";

import {CardBody, CardContainer, CardItem} from "../components/ui/3d-card.tsx";
import {Link} from "react-router-dom";
import post1 from "../assets/img/post-1.jpg";

export function ThreeDCardDemo() {
    return (
        <CardContainer className="inter-var">
            <CardBody
                className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-4 border">
                <CardItem
                    translateZ="50"
                    className="text-lg font-bold text-neutral-600 dark:text-white"
                >
                    First Time Home Owner Ideas
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-xs mt-1 dark:text-neutral-300"
                >
                    Kristin Watson
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                    <img
                        src={post1}
                        alt="thumbnail"
                        height="600"
                        width="500"
                        className="h-52 w-full object-cover rounded-xl group-hover:shadow-xl"
                    />
                </CardItem>
                <div className="flex justify-between items-center mt-4">
                    <CardItem
                        translateZ={20}
                        as={Link}
                        href="https://twitter.com/mannupaaji"
                        target="__blank"
                        className="px-3 py-1 rounded-xl text-xs font-normal dark:text-white"
                    >
                        Xem chi tiết →
                    </CardItem>
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-3 py-1 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                        Sign up
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}
