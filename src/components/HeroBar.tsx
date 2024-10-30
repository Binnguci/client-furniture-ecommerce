import couch from "../assets/img/couch.png";


function HeroBar() {
    return (
        <div className={"gap-2 flex pt-16 md:pt-20 lg:pt-24"}>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="lg:w-5/12 w-full mb-8 lg:mb-0">
                        <div className="intro-excerpt">
                            {/*<h1 className="text-4xl font-bold">Nội thất đẳng cấp<span*/}
                            {/*    className="block text-[#FFA726]">Tôn vinh không gian sống</span></h1>*/}
                            <h1 className="text-4xl sm:text-4xl md:text-4xl font-bold">
                                Nội thất đẳng cấp
                                <span className="block text-4xl sm:text-4xl md:text-4xl text-[#FFA726]">
                                    Tôn vinh không gian sống
                                </span>
                            </h1>

                            <p className="text-sm sm:text-base md:text-lg lg:text-base text-[#FFA726] mb-4">
                                Mang đến sự tinh tế và sang trọng trong từng chi tiết, chúng tôi tự hào là lựa chọn hàng
                                đầu cho không gian sống cao cấp tại Việt Nam.
                            </p>
                            <p>
                                <a href="#"
                                   className="btn bg-black text-[#FFA726] rounded px-6 py-2  mr-4 hover:bg-[#FFA726] hover:text-black font-bold transition-colors duration-300">Xem
                                    ngay</a>
                                <a href="#"
                                   className="btn  text-black border-gray-800 rounded bg-[#FFA726] px-6 py-2 hover:bg-black hover:text-[#FFA726] font-bold transition-colors duration-300">Khám
                                    phá</a>
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-7/12 w-full">
                        <div className="hero-img-wrap flex justify-center lg:justify-end">
                            <img src={couch} alt="Couch" className="w-full h-auto max-w-md lg:max-w-full"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroBar;