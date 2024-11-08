'use client';
import React from "react";
import {Button, Form, Grid, Input, notification, type NotificationArgsProps, Typography as AntTypography} from "antd";
import {LockOutlined} from "@ant-design/icons";
import http from "../utils/http.ts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import LogoVertical from "../components/LogoVertical.tsx";
import {FormChangePassword} from "../types/formChangePassword.ts";

type NotificationPlacement = NotificationArgsProps['placement'];

const {useBreakpoint} = Grid;
const {Text, Title} = AntTypography;

export default function ChangePassword() {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const location = useLocation();
    const email = location.state?.email;

    const openNotificationWithIconSuccess = () => {
        api.success({
            message: 'Đổi mật khẩu thành công',
            description: "Đăng nhập vào tài khoản để trải nghiệm",
        });
    };
    const openNotificationWithIconError = (placement: NotificationPlacement, error: string) => {
        api.error({
            message: `Đổi mật khẩu thất bại`,
            description:
            error,
            placement,
        });
    };

    const initialValues: FormChangePassword = {
        email: email,
        password: "",
    }

    const [form, setForm] = React.useState<FormChangePassword>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevForm => ({

            ...prevForm,
            [name]: value,
        }));
    };

    const sendData = async (data: FormChangePassword) => {
        try {
            const response = await http.post("/user/change-password", data);
            console.log('Data sent successfully:', response.data);
            openNotificationWithIconSuccess()
            setTimeout(() => {
                navigate("/sign-in");
            }, 2000);
        } catch (error: unknown) {
            let errorMessage = 'Đã xảy ra lỗi! Kiểm tra lại kết nối internet';

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message;
            }
            openNotificationWithIconError('bottom', errorMessage);
            console.error('Error sending data:', errorMessage);
        }
    };
    const onFinish = async () => {
        await sendData(form);
    };

    return (
        <section
            className={`flex items-center justify-center ${screens.sm ? "h-screen" : "h-auto"} p-8 `}>
            {contextHolder}
            <Link to={"/"} className="absolute top-4 left-4">
                <LogoVertical/>
            </Link>
            <div className="mx-auto w-[380px]   p-6">
                <div className="text-center mb-8">
                    <Title level={2} className={`text-${screens.md ? "2xl" : "xl"}`}>Nhập mật khẩu mới</Title>
                </div>
                <Form
                    name="normal_signup"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền mật khẩu mới!",
                            },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                                message: "Mật khẩu phải bao gồm ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined/>}
                            name="password"
                            placeholder="Nhập mật khẩu mới"
                            onChange={handleChange} value={form.password}
                        />
                    </Form.Item>
                    <Form.Item
                        name="comfirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền lại mật khẩu mới!",
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined/>}
                            name={"comfirmPassword"}
                            placeholder="Nhập lại mật khẩu mới"
                        />
                    </Form.Item>
                    <Form.Item style={{marginBottom: "0px"}}>
                        <Button
                            variant={"solid"}
                            className="!bg-[#FFA726] !text-black font-bold w-full hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                            block
                            htmlType="submit"
                        >
                            Đổi mật khẩu
                        </Button>
                        <div className="mt-4 text-center">
                            <Text>Bạn đã nhớ lại mật khẩu?</Text>{" "}
                            <Link to="/sign-in" className={"text-black font-bold hover:text-[#FFA726]"}>Quay lại đăng
                                nhập</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}