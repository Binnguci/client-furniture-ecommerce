import { useState } from 'react';
import { FaTruck, FaPaypal } from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {setPayment} from "../store/checkout.slice.ts";

interface PaymentMethodType {
    id: string;
    title: string;
    description: string;
    icon: JSX.Element;
}

const PaymentMethod = () => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const dispatch = useDispatch();
    const paymentMethods: PaymentMethodType[] = [
        {
            id: "cod",
            title: "Thanh toán qua VNPay",
            description: "Thanh toán tiền mặt khi nhận hàng tại nhà.",
            icon: <FaTruck className="text-2xl text-gray-600" />,
        },
        {
            id: "paypal",
            title: "Thanh toán qua PayPal",
            description: "Sử dụng PayPal để thanh toán với bảo mật tối ưu.",
            icon: <FaPaypal className="text-2xl text-[#003087]" />,
        },
    ];
const handleMethodChange = (id: string) => {
    dispatch(setPayment(id));
    setSelectedMethod(id)
}
    return (
        <div className="space-y-4">
            <h2 className="font-bold text-2xl text-[#FFA726] mb-6">Hình thức thanh toán</h2>
            <div className="space-y-4">
                {paymentMethods.map((method) => (
                    <label
                        key={method.id}
                        className={`flex items-center p-4 border rounded-lg shadow-sm cursor-pointer transition-shadow ${
                            selectedMethod === method.id ? 'border-[#FFA726] shadow-md' : 'hover:shadow-md'
                        }`}
                    >
                        <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedMethod === method.id}
                            onChange={() => handleMethodChange(method.id)}
                            className="mr-4 accent-[#FFA726]"
                        />
                        <div className="mr-4">{method.icon}</div>
                        <div>
                            <h3 className="text-lg font-medium">{method.title}</h3>
                            <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default PaymentMethod;
