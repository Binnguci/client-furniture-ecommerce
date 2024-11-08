'use client';
import React from "react";
import {Button, Form, Grid, Input, notification, type NotificationArgsProps, Typography as AntTypography} from "antd";
import {MailOutlined} from "@ant-design/icons";
import http from "../utils/http.ts";
import {FormSignUp} from "../types/formSignUp.ts";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import LogoVertical from "../components/LogoVertical.tsx";
import {FormForgotPassword} from "../types/formForgotPassword.ts";

type NotificationPlacement = NotificationArgsProps['placement'];

const {useBreakpoint} = Grid;
const {Text, Title} = AntTypography;

export default function ForgotPassword() {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIconSuccess = () => {
        api.success({
            message: 'Yêu cầu đăng ký thành công',
            description: "Vui lòng kiểm tra email và nhập mã OTP để kích hoạt tài khoản",
        });
    };
    const openNotificationWithIconError = (placement: NotificationPlacement, error: string) => {
        api.error({
            message: `Đăng ký thất bại`,
            description:
            error,
            placement,
        });
    };

    const initialValues: FormForgotPassword = {
        email: "",
    }

    const [form, setForm] = React.useState<FormForgotPassword>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const sendData = async (data: FormForgotPassword) => {
        try {
            const response = await http.post("/user/forgot-password", data);
            console.log('Data sent successfully:', response.data);
            openNotificationWithIconSuccess()
            setTimeout(() => {
                navigate("/verify-otp", {state: {email: data.email}});
            }, 2000);
        } catch (error: unknown) {
            let errorMessage = 'Đã xảy ra lỗi! Kiểm tra lại kết nối internet';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng!';
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
            className={`flex items-center justify-center ${screens.sm ? "h-screen" : "h-auto"} p-8 `}>
            {contextHolder}
            <Link to={"/"} className="absolute top-4 left-4">
                <LogoVertical/>
            </Link>
            <div className="mx-auto w-[380px]   p-6">
                <div className="text-center mb-8">
                    <Title level={2} className={`text-${screens.md ? "2xl" : "xl"}`}>Quên mật khẩu</Title>
                    <Text>Vui lòng điền lại mật khẩu đã đã ký</Text>
                </div>
                <Form
                    name="normal_signup"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền email đã đăng ký!",
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined/>} placeholder="Địa chỉ email" onChange={handleChange}
                               value={form.email}/>
                    </Form.Item>
                    <Form.Item style={{marginBottom: "0px"}}>
                        <Button
                            variant={"solid"}
                            className="!bg-[#FFA726] !text-black font-bold w-full hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                            block
                            htmlType="submit"
                        >
                            Xác thực email
                        </Button>
                        <div className="mt-4 text-center">
                            <Text>Bạn đã nhớ ra mật khẩu?</Text>{" "}
                            <Link to="/sign-in" className={"text-black font-bold hover:text-[#FFA726]"}>Quay lại đăng
                                nhập</Link>
                        </div>
                    </Form.Item>
                </Form>

            </div>
        </section>
    );
}