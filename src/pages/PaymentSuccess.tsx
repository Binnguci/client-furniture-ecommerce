import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function PaymentSuccess() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
            <FaCheckCircle className="text-[#FFA726] text-6xl mb-4" />
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Thanh Toán Thành Công!</h1>
            <p className="text-gray-600 mb-6">
                Cảm ơn bạn đã hoàn tất thanh toán. Đơn hàng của bạn đang được xử lý.
            </p>
            <div className="flex gap-4">
                <Link
                    to="/"
                    className="bg-[#FFA726] text-black font-bold px-6 py-2 rounded-md hover:bg-black hover:text-[#FFA726] transition-colors duration-300"
                >
                    Quay Lại Trang Chủ
                </Link>
                <Link
                    to="/orders"
                    className="bg-[#FFA726] text-black font-bold px-6 py-2 rounded-md hover:bg-black hover:text-[#FFA726] transition-colors duration-300"
                >
                    Xem Đơn Hàng
                </Link>
            </div>
        </div>
    );
}

export default PaymentSuccess;
