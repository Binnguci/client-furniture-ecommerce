import { Link } from "react-router-dom";
import { Button } from "antd";

function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4"> /*<div className="text-center py-16">
                    <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                        <h3 className="font-heading mb-4 font-bold text-[#FFA726] tracking-tight dark:text-white text-4xl">
                            Giỏ hàng của bạn đang trống
                        </h3>
                        <div className="w-[20rem] h-[3px] bg-[#FFA726] mx-auto my-4"></div>
                        <Link to={"/products"}>
                            <Button
                                className="bg-[#FFA726] font-bold hover:!bg-black hover:!text-[#FFA326] border-none">Cửa
                                hàng</Button>
                        </Link>
                    </div>
                    <p className="text-gray-500 mt-4">
                        Hãy tiếp tục mua sắm để thêm sản phẩm vào giỏ hàng!
                    </p>
                </div>*/
            <h3 className="font-heading mb-4 text-3xl md:text-4xl font-bold text-[#FFA726] tracking-tight text-center">
                Giỏ hàng của bạn đang trống!
            </h3>
            <div className="w-48 h-[3px] bg-[#FFA726] my-4"></div>
            <p className="text-gray-600 text-lg text-center max-w-md mb-6">
                Hãy tiếp tục khám phá cửa hàng và thêm sản phẩm yêu thích vào giỏ hàng của bạn.
            </p>
            <Link to="/products">
                <Button
                    className="!bg-[#FFA726] !text-black font-bold w-full hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                >
                    Tiếp tục mua sắm
                </Button>
            </Link>
        </div>
    );
}

export default EmptyCart;
