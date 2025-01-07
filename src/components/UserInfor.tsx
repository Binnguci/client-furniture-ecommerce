/*
import React, { useState } from 'react';
import { UserInfoProps } from '../types/userInfor.type.ts';
import { updateAccount } from '../store/user.slice.ts';
import { useAppDispatch } from "../store/store.ts";
import { notification, Modal, Input } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

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
    const [editField, setEditField] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const [api, contextHolder] = notification.useNotification();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    };

    const openEditModal = (field: string) => {
        setEditField(field);
        setEditValue(formData[field as keyof typeof formData] || '');
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        const updatedFormData = { ...formData, [editField!]: editValue };
        try {
            await dispatch(updateAccount(updatedFormData)).unwrap();
            setFormData(updatedFormData);
            api.success({
                message: 'Thành công',
                description: "Thông tin của bạn đã được cập nhật",
            });
        } catch (error) {
            api.error({
                message: 'Thất bại',
                description: 'Đã xảy ra lỗi khi cập nhật thông tin.',
            });
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {contextHolder}
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Thông Tin Người Dùng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['username', 'email', 'phone', 'fullName'].map((field) => (
                    <div key={field} className="flex items-center justify-between">
                        <div className="w-full">
                            <label className="block text-gray-600 font-semibold mb-1">
                                {field === 'username' ? 'Tên đăng nhập' :
                                    field === 'email' ? 'Email' :
                                        field === 'phone' ? 'Số điện thoại' :
                                            'Tên đầy đủ'}:
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field as keyof typeof formData]}
                                disabled
                                className="w-full p-2 border rounded-md bg-gray-100"
                            />
                        </div>
                        <button
                            onClick={() => openEditModal(field)}
                            className="ml-2 text-[#FFA726] hover:text-black"
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                ))}
            </div>

            {/!* Modal chỉnh sửa *!/}
            <Modal
                title={`Chỉnh sửa ${editField === 'username' ? 'Tên đăng nhập' :
                    editField === 'email' ? 'Email' :
                        editField === 'phone' ? 'Số điện thoại' :
                            'Tên đầy đủ'}`}
                open={isModalOpen}
                onOk={handleSave}
                onCancel={() => setIsModalOpen(false)}
                okText="Lưu"
                cancelText="Hủy"
                okButtonProps={{
                    className: '!bg-[#FFA726] !text-black font-bold hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300',
                }}
            >
                <Input
                    value={editValue}
                    onChange={handleChange}
                    placeholder="Nhập giá trị mới"
                />
            </Modal>

        </div>
    );
};
*/
import React, { useState } from 'react';
import { UserInfoProps } from '../types/userInfor.type.ts';
import { updateAccount } from '../store/user.slice.ts';
import { useAppDispatch } from "../store/store.ts";
import { notification } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { EditModal } from './EditModal';

export const UserInfoForm: React.FC<UserInfoProps> = ({
                                                          username,
                                                          email,
                                                          phone,
                                                          fullName,
                                                      }) => {
    const [formData, setFormData] = useState({ username, email, phone, fullName });
    const [editField, setEditField] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const [api, contextHolder] = notification.useNotification();

    const openEditModal = (field: keyof typeof formData) => {
        setEditField(field);
        setEditValue(formData[field as keyof typeof formData] || '');
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!editField) return;
        const updatedFormData = { ...formData, [editField]: editValue };
        try {
            await dispatch(updateAccount(updatedFormData)).unwrap();
            setFormData(updatedFormData);
            api.success({ message: 'Thành công', description: "Thông tin đã được cập nhật." });
        } catch (error) {
            api.error({ message: 'Thất bại', description: 'Lỗi khi cập nhật thông tin.' });
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {contextHolder}
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Thông Tin Người Dùng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['username', 'email', 'phone', 'fullName'].map((field) => (
                    <div key={field} className="flex items-center justify-between">
                        <div className="w-full">
                            <label className="block text-gray-600 font-semibold mb-1">
                                {field === 'username' ? 'Tên đăng nhập' :
                                    field === 'email' ? 'Email' :
                                        field === 'phone' ? 'Số điện thoại' :
                                            'Tên đầy đủ'}:
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field as keyof typeof formData]}
                                disabled
                                className="w-full p-2 border rounded-md bg-gray-100"
                            />
                        </div>
                        <button
                            onClick={() => openEditModal(field as keyof typeof formData)}
                            className="ml-2 text-[#FFA726] hover:text-black"
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <EditModal
                title={`Chỉnh sửa ${editField || ''}`}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onSave={handleSave}
                onCancel={() => setIsModalOpen(false)}
                open={isModalOpen}
            />
        </div>
    );
};
