import React, { useState } from 'react';
import { UserInfoProps } from '../types/userInfor.type.ts';
import { updateAccount } from '../store/user.slice.ts';
import {useAppDispatch} from "../store/store.ts";
import {notification} from "antd";

export const UserInfoForm: React.FC<UserInfoProps> = ({
                                                          username,
                                                          email,
                                                          phone,
                                                          fullName,
                                                      }: UserInfoProps) => {
    const [formData, setFormData] = useState({
        username,
        email,
        phone,
        fullName,
    });
    const dispatch = useAppDispatch();
    const [api, contextHolder] = notification.useNotification();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await dispatch(updateAccount(formData)).unwrap();
            api.success({
                message: 'Thành công',
                description: "Thông tin của bạn đã được cập nhật",
            });
        } catch (error) {
            if (error instanceof Error) {
                api.error({
                    message: 'Thất bại',
                    description: error.message,
                });
            } else if (typeof error === 'string') {
                api.error({
                    message: 'Thất bại',
                    description: error,
                });
            } else {
                api.error({
                    message: 'Thất bại',
                    description: 'Đã xảy ra lỗi không xác định khi cập nhật thông tin.',
                });
            }
        }
    };



    return (
        <div className="max-w-4xl mx-auto p-6 ">
            {contextHolder}
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Chỉnh Sửa Thông Tin Người Dùng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-600 font-semibold mb-1">Tên đăng nhập:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-semibold mb-1">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-semibold mb-1">Số điện thoại:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-semibold mb-1">Tên đầy đủ:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>
            <div className="mt-8 text-center">
                <button
                    onClick={handleSave}
                    className="w-full md:w-1/3 bg-[#FFA726] hover:bg-black text-black hover:text-[#FFA726] font-semibold py-2 rounded-md transition duration-300"
                >
                    Lưu Thay Đổi
                </button>
            </div>
        </div>
    );
};
