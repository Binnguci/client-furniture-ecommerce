'use strict';
import {useState} from "react";
import HeroBarCart from "../components/HeroBarCart.tsx";
import product1 from "../assets/img/product-1.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Product 1",
            price: 49.0,
            quantity: 1,
            image: product1,
        },
        {
            id: 2,
            name: "Product 2",
            price: 49.0,
            quantity: 1,
            image: product1,
        },
    ]);

    // Hàm tính tổng giá tiền
    const calculateTotal = (): number => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Hàm xử lý khi nhấn nút tăng số lượng
    const handleIncrease = (id: number): void => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? {...item, quantity: item.quantity + 1} : item
            )
        );
    };

    // Hàm xử lý khi nhấn nút giảm số lượng
    const handleDecrease = (id: number): void => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? {...item, quantity: item.quantity - 1}
                    : item
            )
        );
    };

    // Hàm xử lý xóa sản phẩm khỏi giỏ hàng
    const handleRemove = (id: number): void => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <div>
            <HeroBarCart/>
            <div className="py-8 px-36">
                <div className="container mx-auto">
                    <form method="post">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border-gray-300">
                                <thead className="bg-[#FFA726]">
                                <tr>
                                    <th className="px-6 py-3 text-black font-bold text-left">Sản phẩm</th>
                                    <th className="px-6 py-3 text-black font-bold text-left">Tên</th>
                                    <th className="px-6 py-3 text-black font-bold text-left">Giá</th>
                                    <th className="px-6 py-3 text-black font-bold text-left">Số lượng</th>
                                    <th className="px-6 py-3 text-black font-bold text-left">Tổng</th>
                                    <th className="px-6 py-3 text-black font-bold text-left">Xóa</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartItems.map((item) => (
                                    <tr className="border-t" key={item.id}>
                                        <td className="px-6 py-4">
                                            <img
                                                src={item.image}
                                                alt="Image"
                                                className="w-20 h-auto"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <h2 className="text-gray-800 font-medium">
                                                {item.name}
                                            </h2>
                                        </td>
                                        <td className="px-6 py-4 text-gray-800">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDecrease(item.id)}
                                                    className="px-2 py-1 bg-[#FFA726] text-black  border  rounded"
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
                                                    onClick={() => handleIncrease(item.id)}
                                                    className="px-2 py-1  bg-[#FFA726] text-black border  rounded"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-800">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td className="px-12 py-4">
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(item.id)}
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

                    <div className="grid grid-cols-3 gap-8 mt-8">
                        <div className="col-span-1">
                            <div className="flex flex-col space-y-4">
                                <button
                                    className="w-full bg-[#FFA726]  py-2 rounded text-black font-bold hover:bg-black hover:text-[#FFA726] transition-colors duration-300">
                                    Tiếp tục mua hàng
                                </button>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-800">Mã giảm giá</h3>
                                <p className="text-sm text-gray-600">Nhập mã giảm giá của bạn</p>
                                <div className="flex items-center space-x-4 mt-4">
                                    <input
                                        type="text"
                                        className="flex-1 py-2 px-4 border border-gray-300 rounded"
                                        placeholder="Mã giảm giá"
                                    />
                                    <button
                                        className="bg-[#FFA726] text-black font-bold py-2 px-6 rounded hover:bg-black hover:text-[#FFA726] transition-colors duration-300">
                                        Áp dụng mã giảm
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 col-start-3">
                            <h3 className="text-lg font-bold text-black border-b border-gray-300 pb-2">
                                Tổng giỏ hàng
                            </h3>
                            <div className="flex justify-between py-4">
                                <span className="text-black">Total</span>
                                <span className="font-medium text-gray-800">
                                    ${calculateTotal().toFixed(2)}
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
        </div>
    );
}

export default Cart;
