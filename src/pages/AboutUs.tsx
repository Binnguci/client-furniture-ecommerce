import HeroBarAboutUs from "../components/HeroBarAboutUs.tsx";
import WhyChooseUs from "../components/WhyChooseUs.tsx";
/*import {AnimatedTestimonials} from "../components/ui/animated-testimonials.tsx";*/
import binnguci from "../assets/img/avtbinnguci.jpg";
import binnguci2 from "../assets/img/binnguci2.jpeg";
import binnguci3 from "../assets/img/binnguci3.jpeg"
import CarouselAboutUs from "../components/CarouselAboutUs.tsx";
import {BackgroundGradient} from "../components/ui/background-gradient.tsx";
/*type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
};
const testimonials: Testimonial[] = [
    {
        quote: "Tôi tự hào về những sản phẩm mà chúng tôi đã tạo ra.",
        name: "Thanh Bình",
        designation: "Frontend Developer",
        src: binnguci
    },
    {
        quote: "Bạn sẽ hài lòng với những sản phẩm mà chúng tôi cung cấp.",
        name: "Binnguci",
        designation: "Backend Developer",
        src: binnguci2
    },
    {
        quote: "Mục tiêu của chúng tôi là mang lại sự hài lòng cho khách hàng.",
        name: "Bình Nguyễn",
        designation: "Database Developer",
        src: binnguci3
    },
];*/

const testimonials = [
    {
        id: 1,
        quote: "“Tôi rất hài lòng với cách làm việc chuyên nghiệp và sản phẩm mà công ty mang lại.”",
        name: "Nguyễn Thanh Bình",
        position: "Chủ tịch Furni Luxury",
        image: binnguci,
    },
    {
        id: 2,
        quote: "“Đây là sự lựa chọn hoàn hảo cho những ai tìm kiếm sự uy tín và đẳng cấp.”",
        name: "Bình Nguyễn",
        position: "Giám đốc sản phẩm",
        image: binnguci2,
    },
    {
        id: 3,
        quote: "“Sản phẩm và dịch vụ tại đây luôn vượt trên cả mong đợi của chúng tôi.”",
        name: "Nguyễn Bình Thanh",
        position: "Nhà thiết kế nội thất",
        image: binnguci3,
    },
];


function AboutUs() {
    return (
        <div>
            <HeroBarAboutUs/>
            <WhyChooseUs/>
            <div className="flex justify-center items-center gap-8 my-36">
                {testimonials.map((item) => (
                    <BackgroundGradient
                        key={item.id}
                        className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900"
                    >
                        <div className="flex flex-col items-center">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-40 h-40 rounded-full object-cover"
                            />

                            <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                                {item.name}
                            </p>

                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {item.position}
                            </p>
                            <p className="italic text-neutral-500 dark:text-neutral-300 mt-2">
                                {item.quote}
                            </p>
                        </div>
                    </BackgroundGradient>
                ))}
            </div>

            <CarouselAboutUs/>
        </div>
    );
}

export default AboutUs;