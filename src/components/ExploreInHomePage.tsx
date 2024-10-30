// import imggrid1 from "../assets/img/img-grid-1.jpg";
// import imggrid2 from "../assets/img/img-grid-2.jpg";
// import imggrid3 from "../assets/img/img-grid-3.jpg";
//
// function ExploreInHomePage() {
//     return (
//         <div className="we-help-section pt-28 relative pb-8">
//             <div className="container mx-auto">
//                 <div className="flex flex-col lg:flex-row justify-between">
//                     <div className="w-full lg:w-7/12 mb-5 lg:mb-0">
//                         <div
//                             className="imgs-grid grid grid-cols-[repeat(27,1fr)] relative before:absolute before:w-[255px] before:h-[217px] before:bg-[url(dot)] before:bg-contain before:bg-no-repeat before:transform before:-translate-x-[40%] before:-translate-y-[40%] before:-z-10">
//                             <div className="grid grid-1 col-span-18 row-span-27 relative">
//                                 <img src={imggrid1} alt="Untree.co"
//                                      className="rounded-2xl max-w-full"/>
//                             </div>
//                             <div
//                                 className="grid grid-2 col-start-19 col-end-28 row-start-1 row-end-6 relative pl-5">
//                                 <img src={imggrid2} alt="Untree.co"
//                                      className="rounded-2xl max-w-full"/>
//                             </div>
//                             <div
//                                 className="grid grid-3 col-start-14 col-end-30 row-start-6 row-end-28 relative pt-5">
//                                 <img src={imggrid3} alt="Untree.co"
//                                      className="rounded-2xl max-w-full"/>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-full lg:w-5/12 pl-0 lg:pl-5 ml-5">
//                         <h2 className="section-title mb-4 text-2xl text-[#FFA726] font-bold">Chúng tôi giúp bạn tạo nên
//                             không gian nội thất hiện đại</h2>
//                         <p className="mb-4 ">Khám phá sự khác biệt với phong cách thiết kế nội thất tinh tế và hiện đại.
//                             Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi mang đến những giải pháp độc đáo và phù
//                             hợp với từng không gian sống, giúp bạn tận hưởng cuộc sống đẳng cấp.</p>
//
//                         <ul className="list-none w-full my-4">
//                             <li className="inline-block w-[calc(50%-20px)] mb-3 leading-6 relative pl-5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border-2 before:border-[#3b5d50] before:absolute before:left-0 before:top-2">Thiết
//                                 kế sáng tạo, mang đậm cá tính
//                             </li>
//                             <li className="inline-block w-[calc(50%-20px)] mb-3 leading-6 relative pl-5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border-2 before:border-[#3b5d50] before:absolute before:left-0 before:top-2">Chất
//                                 liệu cao cấp, bền bỉ theo thời gian
//                             </li>
//                             <li className="inline-block w-[calc(50%-20px)]  mb-3 leading-6 relative pl-5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border-2 before:border-[#3b5d50] before:absolute before:left-0 before:top-2">Tối
//                                 ưu hóa không gian sống tiện nghi
//                             </li>
//                             <li className="inline-block w-[calc(50%-20px)] mb-3 leading-6 relative pl-5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border-2 before:border-[#3b5d50] before:absolute before:left-0 before:top-2">Dịch
//                                 vụ tư vấn chuyên nghiệp, tận tâm
//                             </li>
//                         </ul>
//                         <p><a href="#"
//                               className="btn bg-[#FFA726] text-black hover:text-[#FFA726] hover:bg-black px-4 py-2 rounded font-bold">Khám
//                             phá</a></p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default ExploreInHomePage;
import imggrid1 from "../assets/img/img-grid-1.jpg";
import imggrid2 from "../assets/img/img-grid-2.jpg";
import imggrid3 from "../assets/img/img-grid-3.jpg";

function ExploreInHomePage() {
    return (
        <div className="we-help-section pt-28 relative pb-8">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="w-full lg:w-7/12 mb-5 lg:mb-0">
                        <div
                            className="imgs-grid grid grid-cols-1 lg:grid-cols-[repeat(27,1fr)] relative before:absolute before:w-[255px] before:h-[217px] before:bg-[url(dot)] before:bg-contain before:bg-no-repeat before:transform before:-translate-x-[40%] before:-translate-y-[40%] before:-z-10">
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
                    <div className="w-full lg:w-5/12 pl-0 lg:pl-5 ml-5">
                        <h2 className="section-title mb-4 text-3xl text-[#FFA726] font-bold">Chúng tôi giúp bạn tạo nên
                            không gian nội thất hiện đại</h2>
                        <p className="mb-4 lg:text-base sm:text-base md:text-lg">
                            Khám phá sự khác biệt với phong cách thiết kế nội thất tinh tế và hiện đại.
                            Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi mang đến những giải pháp độc đáo và phù
                            hợp với từng không gian sống, giúp bạn tận hưởng cuộc sống đẳng cấp.
                        </p>

                        <ul className="list-none w-full my-4">
                            <li className="inline-block w-full sm:w-[calc(50%-10px)] mb-3 leading-6 relative pl-5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border-2 before:border-[#3b5d50] before:absolute before:left-0 before:top-2">Thiết
                                kế sáng tạo, mang đậm cá tính
                            </li>
                            <li className="inline-block w-full sm:w-[calc(50%-10px)] mb-3 leading-6 relative pl-5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border-2 before:border-[#3b5d50] before:absolute before:left-0 before:top-2">Chất
                                liệu cao cấp, bền bỉ theo thời gian
                            </li>
                            <li className="inline-block w-full sm:w-[calc(50%-10px)] mb-3 leading-6 relative pl-5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border-2 before:border-[#3b5d50] before:absolute before:left-0 before:top-2">Tối
                                ưu hóa không gian sống tiện nghi
                            </li>
                            <li className="inline-block w-full sm:w-[calc(50%-10px)] mb-3 leading-6 relative pl-5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border-2 before:border-[#3b5d50] before:absolute before:left-0 before:top-2">Dịch
                                vụ tư vấn chuyên nghiệp, tận tâm
                            </li>
                        </ul>
                        <p>
                            <a href="#"
                               className="btn bg-[#FFA726] text-black hover:text-[#FFA726] hover:bg-black px-4 py-2 rounded font-bold transition-colors duration-300">Khám
                                phá</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExploreInHomePage;
