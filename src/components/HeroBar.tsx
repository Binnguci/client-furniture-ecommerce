import couch from "../assets/img/couch.png";


function HeroBar() {
    return (
        <div className={"gap-2 flex"}>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="lg:w-5/12 w-full mb-8 lg:mb-0">
                        <div className="intro-excerpt">
                            <h1 className="text-4xl font-bold">Modern Interior <span
                                className="block text-[#FFA726]">Design Studio</span></h1>
                            <p className="mb-4 text-[#FFA726]">Donec vitae odio quis nisl dapibus malesuada. Nullam
                                ac
                                aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
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
                    <div className="lg:w-7/12 w-full">
                        <div className="hero-img-wrap">
                            <img src={couch} className="w-full h-auto"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroBar;