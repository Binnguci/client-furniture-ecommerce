import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../store/store";
import {formatCurrencyWithoutSymbol} from "../utils/convertCurrencyToString.ts";
import {useEffect} from "react";
import {setOrder} from "../store/checkout.slice.ts";

function OrderSummary() {
    const {cart} = useSelector((state: RootState) => state.cart);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setOrder(cart?.cartItemResponse));
    }, [dispatch]);
    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-[#FFA726] mb-4">Đơn hàng</h3>
            {cart?.cartItemResponse && cart.cartItemResponse.length > 0 ? (
                <ul>
                    {cart.cartItemResponse.map((item) => (
                        <li key={item.productDTO.id} className="flex justify-between py-2 border-b">
                            <div><span className="text-black">{item.productDTO.name} </span>
                                <span className="text-black">x {item.quantity}</span></div>
                            <span className="text-black">{item.productDTO.price}đ</span>
                        </li>
                    ))}
                    <li className="flex justify-between py-2 border-b">
                        <div><span className="text-black font-bold">Tạm tính</span></div>
                        <span className="text-black font-bold">{formatCurrencyWithoutSymbol(Number(cart.amount))}</span>
                    </li>
                </ul>
            ) : (
                <p className="text-gray-500">Không có sản phẩm nào trong giỏ hàng.</p>
            )}
        </div>
    );
}

export default OrderSummary;
