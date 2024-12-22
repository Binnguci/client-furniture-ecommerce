import FormInformationCheckout from "../components/FormInformationCheckout.tsx";
import PaymentMethod from "../components/PaymentMethod.tsx";
import OrderSummary from "../components/OrderSumary.tsx";
import {Button} from "antd";
import {Link} from "react-router-dom";

function Checkout() {
    return (
        <div className="mt-40 mb-20 px-56">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <FormInformationCheckout/>
                </div>
                <div className="p-8">
                    <PaymentMethod/>
                    <OrderSummary/>
                    <Link to="/products">
                        <Button
                            className="!bg-[#FFA726] !text-black font-bold w-full hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                        >
                            Xác nhận thanh toán
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
