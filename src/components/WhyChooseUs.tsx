import truck from "../assets/img/truck.svg";
import bag from "../assets/img/bag.svg";
import support from "../assets/img/support.svg";
import returnIcon from "../assets/img/return.svg";
import whyChooseUs from "../assets/img/why-choose-us-img.jpg";

function WhyChooseUs() {
    return (
        <div className="why-choose-section py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="lg:w-6/12 w-full">
                        <h2 className="section-title text-3xl text-[#FFA726] font-bold mb-4">Tại sao chọn chúng
                            tôi?</h2>
                        <p className="text-gray-600">Chúng tôi không chỉ mang đến sản phẩm nội thất cao cấp, mà còn mang
                            đến cho bạn những trải nghiệm mua sắm hoàn hảo. Hãy khám phá những lý do bạn nên tin tưởng
                            chúng tôi:</p>

                        <div className="grid grid-cols-2 gap-6 my-8">
                            <div className="feature">
                                <div className="icon mb-4">
                                    <img src={truck} alt="Image" className="w-12 h-12"/>
                                </div>
                                <h3 className="font-semibold text-[#FFA726] text-xl">Giao hàng nhanh &amp; Miễn
                                    phí</h3>
                                <p className="text-gray-600">Đảm bảo giao hàng trong thời gian ngắn nhất, hoàn toàn miễn
                                    phí cho mọi đơn hàng, giúp bạn nhận sản phẩm nhanh chóng và tiện lợi.</p>
                            </div>

                            <div className="feature">
                                <div className="icon mb-4">
                                    <img src={bag} alt="Image" className="w-12 h-12"/>
                                </div>
                                <h3 className="font-semibold text-xl text-[#FFA726]">Mua sắm dễ dàng</h3>
                                <p className="text-gray-600">Giao diện thân thiện, quy trình đặt hàng đơn giản giúp bạn
                                    mua sắm chỉ với vài thao tác mà không gặp bất kỳ trở ngại nào.</p>
                            </div>

                            <div className="feature">
                                <div className="icon mb-4">
                                    <img src={support} alt="Image" className="w-12 h-12"/>
                                </div>
                                <h3 className="font-semibold text-xl text-[#FFA726]">Hỗ trợ 24/7</h3>
                                <p className="text-gray-600">Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn bất kỳ lúc nào, đảm bảo bạn luôn được chăm sóc chu đáo.</p>
                            </div>

                            <div className="feature">
                                <div className="icon mb-4">
                                    <img src={returnIcon} alt="Image" className="w-12 h-12"/>
                                </div>
                                <h3 className="font-semibold text-xl text-[#FFA726]">Hoàn trả dễ dàng</h3>
                                <p className="text-gray-600">Chính sách đổi trả linh hoạt, không rườm rà, mang lại sự yên tâm tuyệt đối khi bạn chọn mua sản phẩm của chúng tôi.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-5/12 w-full">
                        <div className="img-wrap">
                            <img src={whyChooseUs} alt="Image"
                                 className="w-full h-auto rounded-md"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyChooseUs;