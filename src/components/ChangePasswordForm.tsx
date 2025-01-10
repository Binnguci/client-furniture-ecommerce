import React, { useState } from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axios from "axios";
import http from "../utils/http.ts";
import {RootState} from "../store/store.ts";
import {useSelector} from "react-redux";

const { Title } = Typography;

export const ChangePasswordForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
const {user} = useSelector((state: RootState) => state.auth);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: "success" | "error", message: string, description: string) => {
        api[type]({
            message,
            description,
        });
    };

    const handleChangePassword = async (values: { email: string; newPassword: string; confirmPassword: string }) => {
        setLoading(true);
        try {
            await http.post("/user/change-password", {
                email: user.email,
                password: values.newPassword,
            });
            openNotificationWithIcon("success", "Thành công", "Mật khẩu đã được thay đổi thành công!");
            form.resetFields();
        } catch (error) {
            let errorMessage = "Đã xảy ra lỗi, vui lòng thử lại sau.";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }
            openNotificationWithIcon("error", "Thất bại", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={"text-start"}>
            {contextHolder}
            <div className={"text-center"}>
            <Title level={2} className="mb-4" >Đổi Mật Khẩu</Title>
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleChangePassword}
            >
                <Form.Item
                    name="currentPassword"
                    label="Mật khẩu hiện tại"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }]}
                >
                    <Input.Password placeholder="Mật khẩu hiện tại" prefix={<LockOutlined />} />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                        {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                            message: "Mật khẩu phải có ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Mật khẩu mới" prefix={<LockOutlined />} />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu mới"
                    dependencies={["newPassword"]}
                    rules={[
                        { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("newPassword") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Xác nhận mật khẩu mới" prefix={<LockOutlined />} />
                </Form.Item>
                <div className={"text-center"}>
                <Form.Item>
                    <Button
                        htmlType="submit"
                        loading={loading}
                        className="!bg-[#FFA726] !text-black font-bold w-1/3 hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                    >
                        Lưu Thay Đổi
                    </Button>
                </Form.Item>
                </div>
            </Form>
        </section>
    );
};
