import FormInformationCheckout from "../components/FormInformationCheckout.tsx";
import PaymentMethod from "../components/PaymentMethod.tsx";
import OrderSummary from "../components/OrderSumary.tsx";
import {Button} from "antd";
import http from "../utils/http.ts";
import axios from "axios";

function Checkout() {
    // const checkoutInfo = useSelector((state: RootState) => state.checkout);
    const sendData = async () => {
        try {
            const response = await http.post("/vnpay/payment");
            console.log('Data sent successfully:', response.data);
        } catch (error: unknown) {
            let errorMessage = 'Đã xảy ra lỗi! Kiểm tra lại kết nối internet';

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng!';
            }
            console.error('Error sending data:', errorMessage);
        }
    };
    const handleCheckout = () => {
        sendData();
    }
    return (
        <div className="mt-40 mb-20 px-56">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <FormInformationCheckout/>
                </div>
                <div className="p-8">
                    <PaymentMethod/>
                    <OrderSummary/>
                    <div>
                        <Button
                            htmlType="button"
                            onClick={handleCheckout}
                            className="!bg-[#FFA726] !text-black font-bold w-full hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                        >
                            Xác nhận thanh toán
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
