import imggrid1 from "../assets/img/img-grid-1.jpg";
import imggrid2 from "../assets/img/img-grid-2.jpg";
import imggrid3 from "../assets/img/img-grid-3.jpg";

function ExploreInHomePage() {
    return (
        <div className="we-help-section pt-28 relative pb-8:">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <div className="w-full lg:w-7/12 mb-5 lg:mb-0">
                        <div
                            className="imgs-grid grid grid-cols-[repeat(27,1fr)] relative before:absolute before:w-[255px] before:h-[217px] before:bg-[url(dot)] before:bg-contain before:bg-no-repeat before:transform before:-translate-x-[40%] before:-translate-y-[40%] before:-z-10">
                            <div className="grid grid-1 col-span-18 row-span-27 relative">
                                <img src={imggrid1} alt="Untree.co"
                                     className="rounded-2xl max-w-full"/>
                            </div>
                            <div
                                className="grid grid-2 col-start-19 col-end-28 row-start-1 row-end-6 relative pl-5">
                                <img src={imggrid2} alt="Untree.co"
                                     className="rounded-2xl max-w-full"/>
                            </div>
                            <div
                                className="grid grid-3 col-start-14 col-end-30 row-start-6 row-end-28 relative pt-5">
                                <img src={imggrid3} alt="Untree.co"
                                     className="rounded-2xl max-w-full"/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-5/12 pl-0 lg:pl-5">
                        <h2 className="section-title mb-4 text-2xl text-[#FFA726] font-bold">We Help You Make Modern
                            Interior
                            Design</h2>
                        <p className="mb-4 ">Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis
                            nisl dapibus malesuada. Nullam
                            ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque
                            habitant
                            morbi tristique senectus et netus et malesuada</p>

                        <ul className="list-none w-full my-4">
                            <li className="inline-block w-[calc(50%-20px)] mb-3 leading-6 relative pl-5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border-2 before:border-[#3b5d50] before:absolute before:left-0 before:top-2">Donec
                                vitae odio quis nisl dapibus malesuada
                            </li>
                            <li className="inline-block w-[calc(50%-20px)] mb-3 leading-6 relative pl-5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border-2 before:border-[#3b5d50] before:absolute before:left-0 before:top-2">Donec
                                vitae odio quis nisl dapibus malesuada
                            </li>
                            <li className="inline-block w-[calc(50%-20px)]  mb-3 leading-6 relative pl-5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border-2 before:border-[#3b5d50] before:absolute before:left-0 before:top-2">Donec
                                vitae odio quis nisl dapibus malesuada
                            </li>
                            <li className="inline-block w-[calc(50%-20px)] mb-3 leading-6 relative pl-5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border-2 before:border-[#3b5d50] before:absolute before:left-0 before:top-2">Donec
                                vitae odio quis nisl dapibus malesuada
                            </li>
                        </ul>
                        <p><a href="#"
                              className="btn bg-[#FFA726] text-black hover:text-[#FFA726] hover:bg-black px-4 py-2 rounded font-bold">Khám
                            phá</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExploreInHomePage;