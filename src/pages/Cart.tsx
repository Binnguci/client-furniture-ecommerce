import {useEffect} from "react";
import HeroBarCart from "../components/HeroBarCart.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {
    decreaseProductQuantity,
    fetchCart,
    increaseProductQuantity,
    removeProductFromCart
} from "../store/cart.slice.ts";
import {CartItem} from "../types/cartItem.type.ts";
import {convertCurrencyStringToNumber} from "../utils/convertCurrencyToNumber.ts";
import {formatCurrencyWithoutSymbol} from "../utils/convertCurrencyToString.ts";
import {Button} from "antd";
import {Link} from "react-router-dom";

function Cart() {
    const dispatch = useDispatch<AppDispatch>();
    const {cart} = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, []);

    const handleRemoveCartItem = (id: number): void => {
        dispatch(removeProductFromCart({productID: id}));
    };

    function calculateTotal() {
        const totalPrice: number =
            cart?.cartItemResponse.reduce(
                (total, item: CartItem) =>
                    total + convertCurrencyStringToNumber(item.productDTO.price) * item.quantity,
                0
            ) || 0;
        return formatCurrencyWithoutSymbol(totalPrice);
    }

    const handleIncrease = (id: number): void => {
        dispatch(increaseProductQuantity({productID: id}));
    };

    const handleDecrease = (id: number): void => {
        dispatch(decreaseProductQuantity({productID: id}));
    };

    return (
        <div>
            <HeroBarCart/>
            {cart?.cartItemResponse.length != 0 ? (
                <div className="py-8 px-36">
                    <div className="container mx-auto">
                        {/* Nội dung bảng giỏ hàng */}
                        <form method="post">
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border-gray-300">
                                    <thead className="bg-[#FFA726]">
                                    <tr>
                                        <th className="px-6 py-3 text-black font-bold text-left">
                                            Sản phẩm
                                        </th>
                                        <th className="px-6 py-3 text-black font-bold text-left">
                                            Tên
                                        </th>
                                        <th className="px-6 py-3 text-black font-bold text-left">
                                            Giá
                                        </th>
                                        <th className="px-6 py-3 text-black font-bold text-left">
                                            Số lượng
                                        </th>
                                        <th className="px-6 py-3 text-black font-bold text-left">
                                            Tổng
                                        </th>
                                        <th className="px-6 py-3 text-black font-bold text-left">
                                            Xóa
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cart?.cartItemResponse.map((item) => (
                                        <tr className="border-t" key={item.id}>
                                            <td className="px-6 py-4">
                                                <img
                                                    src={item.productDTO.images[0].imageUrl}
                                                    alt="Image"
                                                    className="w-20 h-auto"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <h2 className="text-gray-800 font-medium">
                                                    {item.productDTO.name}
                                                </h2>
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                {item.productDTO.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDecrease(
                                                                item.productDTO.id
                                                            )
                                                        }
                                                        className="px-2 py-1 bg-[#FFA726] text-black border rounded"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="w-12 text-center border border-gray-300 rounded"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleIncrease(
                                                                item.productDTO.id
                                                            )
                                                        }
                                                        className="px-2 py-1 bg-[#FFA726] text-black border rounded"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                {formatCurrencyWithoutSymbol(
                                                    convertCurrencyStringToNumber(
                                                        item.productDTO.price
                                                    ) * item.quantity
                                                )}
                                            </td>
                                            <td className="px-12 py-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveCartItem(item.productDTO.id)
                                                    }
                                                    className="hover:text-black text-[#FFA726] transition-colors duration-300"
                                                >
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </form>

                        {/* Tổng giỏ hàng */}
                        <div className="grid grid-cols-3 gap-8 mt-8">
                            <div className="col-span-1 col-start-3">
                                <h3 className="text-lg font-bold text-black border-b border-gray-300 pb-2">
                                    Tổng giỏ hàng
                                </h3>
                                <div className="flex justify-between py-4">
                                    <span className="text-black">Tổng</span>
                                    <span className="font-medium text-gray-800">
                                        {calculateTotal()}
                                    </span>
                                </div>
                                <button
                                    className="w-full mt-4 bg-[#FFA726] hover:bg-black text-black font-bold hover:text-[#FFA726] py-3 rounded transition-colors duration-300">
                                    Tiến hành thanh toán
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16">
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
                </div>
            )}
        </div>
    );
}

export default Cart;
