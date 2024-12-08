import product2 from "../assets/img/product-2.png";

function HeroBarAboutUs() {
    return (
        <section className={"gap-2 flex pt-20"}>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="lg:w-5/12 w-full mb-8 lg:mb-0">
                        <div className="intro-excerpt">
                            <h1 className="text-4xl font-bold text-[#FFA726]">Về chúng tôi</h1>
                            <p className="mb-4 text-[#FFA726]">
                                Cùng chúng tôi khám phá những sản phẩm mới nhất và ưu đãi hấp dẫn nhất từ các thương
                                hiệu uy tín trên thị trường.
                            </p>
                            <p>
                                <a href="#"
                                   className="btn bg-black text-[#FFA726] rounded px-6 py-2  mr-4 hover:bg-[#FFA726] hover:text-black font-bold">Xem
                                    ngay</a>
                                <a href="#"
                                   className="btn  text-black border-gray-800 rounded bg-[#FFA726] px-6 py-2 hover:bg-black hover:text-[#FFA726] font-bold">Khám
                                    phá</a>
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src={product2}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroBarAboutUs;