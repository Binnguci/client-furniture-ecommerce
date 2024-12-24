import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import HerobarWishlist from "../components/HerobarWishlist.tsx";
import ProductCard from "../components/ProductCard.tsx";
import {fetchWishlist} from "../store/wishlist.slice.ts";
import type { AppDispatch, RootState } from "../store/store.ts";
import Pagination from "../components/Pagination.tsx";

const useAppDispatch: () => AppDispatch = useDispatch;

function Wishlist() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const dispatch = useAppDispatch();
    const wishlistProducts = useSelector((state: RootState) => state.wishList.items);
    const totalPages: number = wishlistProducts ? Math.ceil(wishlistProducts.length / itemsPerPage) : 1;
    const displayedProducts = wishlistProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };
    function scrollTop(){
        window.scrollTo(0,0);
    }
    useEffect(() => {
        scrollTop();
        dispatch(fetchWishlist());
    }, [dispatch]);

    return (
        <div>
            <HerobarWishlist />
            <section id="contact">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mb-4">
                        <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                            <h3 className="font-heading mb-4 font-bold text-[#FFA726] tracking-tight dark:text-white text-4xl">
                                Sản phẩm yêu thích
                            </h3>
                            <div className="w-[20rem] h-[3px] bg-[#FFA726] mx-auto my-4"></div>
                        </div>
                    </div>
                </div>
                <section aria-labelledby="products-heading" className="pb-24 pt-6 flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 max-w-5xl mx-auto">
                        {displayedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                img={product.images[0].imageUrl}
                                name={product.name}
                                price={product.price}
                                id={product.id}
                                isFavorite={true}
                            />
                        ))}
                    </div>
                </section>
            </section>
            <div className={"mb-6"}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default Wishlist;
