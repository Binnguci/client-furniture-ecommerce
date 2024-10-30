import HeroSection from "../components/HeroBar.tsx";
import WhyChooseUs from "../components/WhyChooseUs.tsx";
import ExploreProduct from "../components/ExploreInHomePage.tsx";
import ExploreBlog from "../components/ExploreBlog.tsx";
import {FocusCards} from "../components/ui/focus-cards.tsx";
import product_item1 from "../assets/img/product-item1.jpg";
import product_item2 from "../assets/img/product-item2.jpg";
import product_item3 from "../assets/img/product-item3.jpg";
import product_item4 from "../assets/img/product-item4.jpg";
import product_item5 from "../assets/img/product-item5.jpg";
import product_item6 from "../assets/img/product-item6.jpg";

function Home() {
    const cards = [
        {
            title: "Round Mirror",
            src: product_item1
        },
        {
            title: "Spotlight",
            src: product_item2
        },
        {
            title: "Soap dispenser wall mounted",
            src: product_item3
        },
        {
            title: "Soap dispenser",
            src: product_item4
        },
        {
            title: "Tissue box",
            src: product_item5
        },
        {
            title: "Doorstop",
            src: product_item6
        },
    ];

    return (
        <>
            <HeroSection/>
            <WhyChooseUs/>
            <ExploreProduct/>
            <h2 className="text-center text-3xl text-[#FFA726] font-bold mt-20">Sản phẩm nổi bậc</h2>
            <div className="w-[20rem] h-[3px] bg-[#FFA726] mx-auto my-4"></div>
            <FocusCards cards={cards}/>
            {/*<CarouselTest/>*/}
            <ExploreBlog/>
        </>
    );
}

export default Home;
