
function Footer() {
    return (
        <footer className="font-sans tracking-wide bg-black py-10 px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Sản phẩm</h4>
                    <ul className="space-y-5">
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Tủ</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Ghế</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Dụng cụ bếp</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Bàn</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Dịch vụ</h4>
                    <ul className="space-y-5">
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Vận chuyển</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Tư vấn thiết kế</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Chăm sóc khách hàng</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Đặt hàng theo yêu cầu</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Phòng</h4>
                    <ul className="space-y-5">
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Phòng ngủ</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Phòng bếp</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Phòng khách</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Phòng ăn</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Brand</h4>
                    <ul className="space-y-5">
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">SAINT LOUIS</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">CIRE TRVDON</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">FÜRSTENBERG</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                               className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">DÉCOR WALTHER</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t text-center border-[#6b5f5f] pt-8 mt-8">
                <p className="text-gray-300 text-[15px]">
                    © Binnguci. Nội thất cao cấp    .
                </p>
            </div>
        </footer>
    );
}

export default Footer;