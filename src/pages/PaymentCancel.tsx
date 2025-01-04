import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function PaymentCancel() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
            <FaTimesCircle className="text-black text-6xl mb-4" />
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Thanh Toán Thất Bại</h1>
            <p className="text-gray-600 mb-6">
                Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.
            </p>
            <div className="flex gap-4">
                <Link
                    to="/"
                    className="bg-[#FFA726] text-black font-bold px-6 py-2 rounded-md hover:bg-black hover:text-[#FFA726] transition-colors duration-300"
                >
                    Quay Lại Trang Chủ
                </Link>
                <Link
                    to="/payment"
                    className="bg-[#FFA726] text-black font-bold px-6 py-2 rounded-md hover:bg-black hover:text-[#FFA726] transition-colors duration-300"
                >
                    Thử Lại Thanh Toán
                </Link>
            </div>
        </div>
    );
}

export default PaymentCancel;
