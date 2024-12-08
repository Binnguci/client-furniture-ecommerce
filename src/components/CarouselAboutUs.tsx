import { useState, useEffect } from "react";
import binnguci from "../assets/img/avtbinnguci.jpg"
import binnguci2 from "../assets/img/binnguci2.jpeg"
import binnguci3 from "../assets/img/binnguci3.jpeg"

const testimonials = [
    {
        id: 1,
        quote: "“Tôi cảm thấy sản phẩm đến từ Furni Luxury là những sản phẩm tuyệt vời, không chỉ có chất lượng tuyệt hảo mà còn mang đến sự sang trọng và đẳng cấp cho không gian sống. Mỗi chi tiết trong sản phẩm đều thể hiện sự tỉ mỉ và tâm huyết của nhà sản xuất.”",
        name: "Nguyen Thanh Binh",
        position: "Giám đốc công ty BinhNguci",
        image: binnguci,
    },
    {
        id: 2,
        quote: "“Furni Luxury luôn là đối tác đáng tin cậy của chúng tôi trong mọi dự án. Sản phẩm của họ không chỉ đáp ứng được yêu cầu về chất lượng mà còn giúp chúng tôi tạo ra không gian sống đẳng cấp và tinh tế. Chúng tôi hoàn toàn hài lòng với mỗi sản phẩm được Furni Luxury cung cấp.”",
        name: "Binnguci",
        position: "Product Manager, ABC Inc.",
        image: binnguci2,
    },
    {
        id: 3,
        quote: "“Sản phẩm của Furni Luxury không chỉ mang đến vẻ đẹp sang trọng và tinh tế, mà còn phản ánh sự chú trọng đến chất lượng và tính bền vững. Chúng tôi tin tưởng tuyệt đối vào Furni Luxury để cung cấp các giải pháp nội thất cho những dự án quan trọng của mình. Mỗi sản phẩm đều được thiết kế với sự tỉ mỉ và chất lượng vượt trội, đáp ứng những yêu cầu khắt khe nhất.”",
        name: "Emily Smith",
        position: "Giám đốc kỹ thuật, DEF Inc.",
        image: binnguci3,
    },
];


function CarouselAboutUs() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearInterval(interval); // Xóa interval khi component unmount
    }, []);

    return (
        <div className="flex flex-col items-center py-8 px-4">
            <h2 className="text-3xl font-bold text-[#FFA726] mb-6">Đánh giá nổi bật</h2>
            <div className="relative flex flex-col justify-between items-center px-14 max-w-8xl w-full">
                <p className="text-xl h-20 italic text-gray-600 mb-6 text-center">
                    {testimonials[currentIndex].quote}
                </p>
                <div className="flex items-center gap-4">
                    <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                    />
                    <div>
                        <h3 className="text-lg font-bold text-gray-700">
                            {testimonials[currentIndex].name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {testimonials[currentIndex].position}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center space-x-2 mt-4">
                {testimonials.map((_, index) => (
                    <span
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                            index === currentIndex ? "bg-[#FFA726]" : "bg-gray-400"
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default CarouselAboutUs;
