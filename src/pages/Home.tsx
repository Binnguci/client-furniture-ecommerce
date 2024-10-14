import HeroSection from "../components/HeroBar.tsx";
import WhyChooseUs from "../components/WhyChooseUs.tsx";
import ExploreProduct from "../components/ExploreInHomePage.tsx";
import ExploreBlog from "../components/ExploreBlog.tsx";

function Home() {

    return (
        <>
            <HeroSection/>
            <WhyChooseUs/>
            <ExploreProduct/>
            <ExploreBlog/>
        </>
    );
}

export default Home;
