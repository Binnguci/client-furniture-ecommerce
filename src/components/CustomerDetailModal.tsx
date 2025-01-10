import React, {useEffect, useState} from "react";
import {User} from "../types/user.type.ts";
import http from "../utils/http.ts";

interface CustomerDetailModalProps {
    customer: User | null;
    onClose: () => void;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({ customer, onClose }) => {
    const [orderCount, setOrderCount] = useState<number>(0);
    const [totalOrderValue, setTotalOrderValue] = useState<number>(0);

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            if (customer) {
                try {
                    const response = await http.get(`/admin/user/${customer.id}/orders`);
                    setOrderCount(response.data.orderCount);
                    setTotalOrderValue(response.data.totalOrderValue);
                } catch (error) {
                    console.error("Failed to fetch customer details:", error);
                }
            }
        };

        fetchCustomerDetails();
    }, [customer]);

    if (!customer) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
                {/* Header */}
                <h2 className="text-2xl font-extrabold text-[#FFA726] mb-4 text-center">
                    Chi Tiết Khách Hàng
                </h2>

                {/* Thông Tin Chi Tiết */}
                <div className="space-y-3 text-gray-800">
                    <p><strong className="text-black">Tên:</strong> {customer.username}</p>
                    <p><strong className="text-black">Email:</strong> {customer.email}</p>
                    <p><strong className="text-black">Số điện thoại:</strong> {customer.phone}</p>
                    <p><strong className="text-black">Vai trò:</strong> {customer.role.name === "USER" ? "Người dùng" : "Nhân viên"}</p>
                    <p><strong className="text-black">Trạng thái:</strong> {customer.isLocked ? "🔒 Khóa" : "🔓 Mở khóa"}</p>
                    <p><strong className="text-black">Ngày tạo:</strong> {customer.createdAt}</p>

                    {/* Thông tin đơn hàng */}
                    <div className="mt-4 border-t pt-4">
                        <p><strong className="text-black">Số lượng đơn hàng:</strong> {orderCount}</p>
                        <p><strong className="text-black">Tổng giá trị các đơn hàng:</strong> {totalOrderValue.toLocaleString()} VND</p>
                    </div>
                </div>

                {/* Nút đóng */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-[#FFA726] font-bold text-black rounded-lg hover:bg-black hover:text-[#FFA726] transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetailModal;
