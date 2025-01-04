import FormInformationCheckout from "../components/FormInformationCheckout.tsx";
import PaymentMethod from "../components/PaymentMethod.tsx";
import OrderSummary from "../components/OrderSumary.tsx";
import {Button} from "antd";
import http from "../utils/http.ts";

function Checkout() {
    const sendData = async (): Promise<string> => {
        try {
            const response = await http.post("/paypal/payment/create");
            console.log("Response from server:", response.data);
            const approvalUrl: string = response.data.approvalUrl || response.data.data || "";
            if (!approvalUrl) {
                throw new Error("Approval URL not found in the response");
            }
            return approvalUrl;
        } catch (error) {
            console.error("Error during payment creation:", error);
            throw error;
        }
    };


    const handleCheckout = async () => {
        try {
            const approvalUrl = await sendData();
            window.location.href = approvalUrl; // Chuyển hướng đến PayPal Sandbox
        } catch (error) {
            console.error("Failed to initiate checkout:", error);
            alert("Có lỗi xảy ra khi khởi tạo thanh toán. Vui lòng thử lại.");
        }
    };


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
