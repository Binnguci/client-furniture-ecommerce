'use client';
import React from "react";
import type {NotificationArgsProps} from 'antd';
import {Button, Form, Grid, Input, notification, theme, Typography as AntTypography} from "antd";

import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import http from "../utils/http.ts";
import {FormSignUp} from "../types/formSignUp.ts";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons/faGoogle";
import axios from "axios";
import {faFacebook} from "@fortawesome/free-brands-svg-icons/faFacebook";

type NotificationPlacement = NotificationArgsProps['placement'];

const {useToken} = theme;
const {useBreakpoint} = Grid;
const {Text, Title} = AntTypography;

export default function Register() {
    const {token} = useToken();
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const initialValues: FormSignUp = {
        username: "",
        fullName: "",
        email: "",
        password: "",
    }

    const [form, setForm] = React.useState<FormSignUp>(initialValues);

    const openNotificationWithIcon = () => {
        api.success({
            message: 'Yêu cầu đăng ký thành công',
            description: "Vui lòng kiểm tra email và nhập mã OTP để kích hoạt tài khoản",
        });
    };
    const openNotificationWithIconError = (placement: NotificationPlacement, error: string) => {
        api.error({
            message: `Đăng nhập thất bại`,
            description:
            error,
            placement,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const sendData = async (data: FormSignUp) => {
        try {
            const response = await http.post("/auth/sign-up", data);
            console.log('Data sent successfully:', response.data);
            openNotificationWithIcon();

            setTimeout(() => {
                navigate("/verify-otp", {state: {email: data.email}});
            }, 1000);

        } catch (error: unknown) {
            let errorMessage = 'Đã xảy ra lỗi! Kiểm tra lại kết nối internet';

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || 'Lỗi không xác định từ máy chủ!';
            }
            openNotificationWithIconError('bottom', errorMessage);
            console.error('Error sending data:', errorMessage);
        }
    };

    const onFinish = async (values: FormSignUp) => {
        console.log("Received values of form: ", values);
        await sendData(values);
    };

    return (
        <section
            className={`flex items-center justify-center ${screens.sm ? "h-screen" : "h-auto"} bg-${token.colorBgContainer} p-8`}>
            {contextHolder}
            <div className="mx-auto w-[380px] p-6">
                <div className="text-center mb-8">
                    <Title level={2} className={`text-${screens.md ? "2xl" : "xl"}`}>Đăng ký</Title>
                </div>
                <Form
                    name="normal_signup"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền tên đăng nhập!",
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Tên đăng nhập" onChange={handleChange}
                               value={form.username}/>
                    </Form.Item>
                    <Form.Item
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền đầy đủ họ và tên!",
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Họ và tên" onChange={handleChange}
                               value={form.fullName}/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền địa chỉ email!",
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined/>} placeholder="Email" onChange={handleChange} value={form.email}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền mật khẩu!",
                            },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                                message: "Mật khẩu phải bao gồm ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined/>}
                            placeholder="Mật khẩu"
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
                                message: "Vui lòng điền lại mật khẩu!",
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
                            placeholder="Nhập lại mật khẩu"
                            onChange={handleChange} value={form.password}
                        />
                    </Form.Item>
                    <Form.Item style={{marginBottom: "0px"}}>
                        <Button
                            variant={"solid"}
                            color={"default"}
                            block
                            htmlType="submit"
                        >
                            Đăng ký
                        </Button>
                        <div className="mt-4 text-center">
                            <Text className={`text-${token.colorTextSecondary}`}>Đã có tài khoản?</Text>{" "}
                            <Link to="/sign-in" className={"text-black font-bold hover:text-black"}>Đăng nhập</Link>
                        </div>
                    </Form.Item>
                </Form>
                <div className="flex flex-col justify-center items-center gap-2 mt-4">
                    <Button
                        icon={<FontAwesomeIcon icon={faFacebook} />}
                        className="bg-blue-600 text-white w-full"
                        onClick={() => window.location.href = 'URL_Facebook_Login'}
                    >
                        Đăng nhập bằng Facebook
                    </Button>
                    <Button
                        icon={<FontAwesomeIcon icon={faGoogle}/>}  // Thêm icon Google
                        className="bg-red-600 text-white w-full"
                        onClick={() => window.location.href = 'http://localhost:8085/oauth2/authorization/google'}
                    >
                        Đăng nhập bằng Google
                    </Button>

                </div>
            </div>
        </section>
    );
}