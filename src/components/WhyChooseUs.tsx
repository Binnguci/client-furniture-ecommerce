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
                        <h2 className="section-title text-3xl text-[#FFA726] font-bold mb-4">Why Choose Us</h2>
                        <p className="text-gray-600">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                            velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>

                        <div className="grid grid-cols-2 gap-6 my-8">
                            <div className="feature">
                                <div className="icon mb-4">
                                    <img src={truck} alt="Image" className="w-12 h-12"/>
                                </div>
                                <h3 className="font-semibold text-[#FFA726] text-xl">Fast &amp; Free Shipping</h3>
                                <p className="text-gray-600">Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                                    aliquet velit. Aliquam vulputate.</p>
                            </div>

                            <div className="feature">
                                <div className="icon mb-4">
                                    <img src={bag} alt="Image" className="w-12 h-12"/>
                                </div>
                                <h3 className="font-semibold text-xl text-[#FFA726]">Easy to Shop</h3>
                                <p className="text-gray-600">Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                                    aliquet velit. Aliquam vulputate.</p>
                            </div>

                            <div className="feature">
                                <div className="icon mb-4">
                                    <img src={support} alt="Image" className="w-12 h-12"/>
                                </div>
                                <h3 className="font-semibold text-xl text-[#FFA726]">24/7 Support</h3>
                                <p className="text-gray-600">Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                                    aliquet velit. Aliquam vulputate.</p>
                            </div>

                            <div className="feature">
                                <div className="icon mb-4">
                                    <img src={returnIcon} alt="Image" className="w-12 h-12"/>
                                </div>
                                <h3 className="font-semibold text-xl text-[#FFA726]">Hassle Free Returns</h3>
                                <p className="text-gray-600">Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                                    aliquet velit. Aliquam vulputate.</p>
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