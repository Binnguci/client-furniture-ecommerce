import HerobarWishlist from "../components/HerobarWishlist.tsx";
import ProductCard from "../components/ProductCard.tsx";
import product1 from "../assets/img/product-1.png";
import product2 from "../assets/img/product-2.png";
import product3 from "../assets/img/product-3.png";

const displayedProducts = [
    {
        id: 1,
        name: "Sản phẩm 1",
        price: "500.000 VNĐ",
        images: product1,
    },
    {
        id: 2,
        name: "Sản phẩm 2",
        price: "1.000.000 VNĐ",
        images: product2,
    },
    {
        id: 3,
        name: "Sản phẩm 3",
        price: "750.000 VNĐ",
        images: product3,
    },
];


function Wishlist() {
    return (
        <div>
            <HerobarWishlist/>
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
                        {displayedProducts.map((product, index) => (
                            <ProductCard
                                key={index}
                                img={product.images}
                                name={product.name}
                                price={product.price}
                                id={product.id}
                            />
                        ))}
                    </div>
                </section>

            </section>
        </div>
    );
}

export default Wishlist;