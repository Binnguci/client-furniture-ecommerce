'use client';
import React from "react";
import {
    Button,
    Form,
    Grid,
    Input,
    notification,
    type NotificationArgsProps,
    theme,
    Typography as AntTypography
} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import http from "../utils/http.ts";
import {FormSignUp} from "../types/formSignUp.ts";
import {Link, useNavigate} from "react-router-dom";
import {FormSignIn} from "../types/formSignIn.ts";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook} from "@fortawesome/free-brands-svg-icons/faFacebook";
import {faGoogle} from "@fortawesome/free-brands-svg-icons/faGoogle";

type NotificationPlacement = NotificationArgsProps['placement'];

const {useToken} = theme;
const {useBreakpoint} = Grid;
const {Text, Title} = AntTypography;

export default function SignIn() {
    const {token} = useToken();
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

    const initialValues: FormSignUp = {
        username: "",
        fullName: "",
        email: "",
        password: "",
    }

    const [form, setForm] = React.useState<FormSignIn>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const sendData = async (data: FormSignUp) => {
        try {
            const response = await http.post("/auth/login", data);
            console.log('Data sent successfully:', response.data);
            openNotificationWithIconSuccess()
            setTimeout(() => {
                navigate("/");
            }, 1000);
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
            className={`flex items-center justify-center ${screens.sm ? "h-screen" : "h-auto"} bg-${token.colorBgContainer} p-8`}>
            {contextHolder}
            <div className="mx-auto w-[380px]   p-6">
                <div className="text-center mb-8">
                    <Title level={2} className={`text-${screens.md ? "2xl" : "xl"}`}>Đăng nhập</Title>
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
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền mật khẩu!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined/>}
                            placeholder="Mật khẩu"
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
                            Đăng nhập
                        </Button>
                        <div className="mt-4 text-center">
                            <Text className={`text-${token.colorTextSecondary}`}>Bạn chưa có tài khoản?</Text>{" "}
                            <Link to="/sign-up" className={"text-black font-bold hover:text-black"}>Tạo tài khoản</Link>
                        </div>
                    </Form.Item>
                </Form>
                <div className="flex flex-col justify-center items-center gap-2 mt-4">
                    <Button
                        icon={<FontAwesomeIcon icon={faFacebook}/>}
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