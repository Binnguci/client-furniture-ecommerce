import post1 from "../assets/img/post-1.jpg";
import post2 from "../assets/img/post-2.jpg";
import post3 from "../assets/img/post-3.jpg";
import {CardBody, CardContainer, CardItem} from "./ui/3d-card.tsx";
import {Link} from "react-router-dom";

const blogPosts = [
    {
        title: "First Time Home Owner Ideas",
        author: "Kristin Watson",
        date: "Dec 19, 2021",
        link: "#",
        image: post1,
    },
    {
        title: "How To Keep Your Furniture Clean",
        author: "Robert Fox",
        date: "Dec 15, 2021",
        link: "#",
        image: post2,
    },
    {
        title: "Small Space Furniture Apartment Ideas",
        author: "Kristin Watson",
        date: "Dec 12, 2021",
        link: "#",
        image: post3,
    },
];

function ExploreBlog() {
    return (
        <div className="py-[7rem] px-7">
            <div className="container mx-auto">
                <div className="flex justify-between mb-5">
                    <div className="col-md-6">
                        <h2 className="text-[#FFA726] text-2xl font-bold">Recent Blog</h2>
                    </div>
                    <div className="col-md-6 text-start text-md-end">
                        <a href="#" className="more text-[#FFA726] hover:underline">View All Posts</a>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-0">
                    {blogPosts.map((post, index) => (
                        <CardContainer key={index}>
                            <CardBody
                                className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] px-4 py-0 border-black/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl border">
                                <CardItem
                                    translateZ="50"
                                    className="text-lg font-bold text-neutral-600 dark:text-white"
                                >
                                    {post.title}
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-neutral-500 text-sm max-w-xs mt-1 dark:text-neutral-300"
                                >
                                    {post.author}
                                </CardItem>
                                <CardItem translateZ="100" className="w-full mt-4">
                                    <img
                                        src={post.image}
                                        alt="thumbnail"
                                        height="500"
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
                                        className="px-3 py-1 rounded-xl text- font-normal dark:text-white  text-sm"
                                    >
                                        Xem chi tiết →
                                    </CardItem>
                                </div>
                            </CardBody>
                        </CardContainer>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ExploreBlog;