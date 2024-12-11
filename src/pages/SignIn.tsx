'use client';
import React from "react";
import {Button, Form, Grid, Input, notification, type NotificationArgsProps, Typography as AntTypography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import http from "../utils/http.ts";
import {FormSignUpType} from "../types/formSignUp.type.ts";
import {Link, useNavigate} from "react-router-dom";
import {FormSignInType} from "../types/formSignIn.type.ts";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook} from "@fortawesome/free-brands-svg-icons/faFacebook";
import {faGoogle} from "@fortawesome/free-brands-svg-icons/faGoogle";
import LogoVertical from "../components/LogoVertical.tsx";
import {useDispatch} from "react-redux";
import {setAccessToken, setUser} from "../store/auth.slice.ts";


type NotificationPlacement = NotificationArgsProps['placement'];

const {useBreakpoint} = Grid;
const {Text, Title} = AntTypography;

export default function SignIn() {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();

    const openNotificationWithIconSuccess = () => {
        api.success({
            message: 'Đăng nhập thành công',
            description: "Chào mừng bạn trở lại",
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

    const initialValues: FormSignUpType = {
        username: "",
        fullName: "",
        email: "",
        password: "",
    }

    const [form, setForm] = React.useState<FormSignInType>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const sendData = async (data: FormSignUpType) => {
        try {
            const response = await http.post("/auth/login", data);
            console.log('Data sent successfully:', response.data);
            const {accessToken, user} = response.data.result;
            localStorage.setItem('accessToken', accessToken);
            dispatch(setAccessToken(accessToken))
            dispatch(setUser(user));
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
    const onFinish = async (values: FormSignUpType) => {
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
                            className="!bg-[#FFA726] !text-black font-bold w-full hover:!bg-black hover:!text-[#FFA726] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                            block
                            htmlType="submit"
                        >
                            Đăng nhập
                        </Button>


                        <div className="mt-4 text-center">
                            <Text>Bạn chưa có tài khoản?</Text>{" "}
                            <Link to="/sign-up" className={"text-black font-bold hover:text-[#FFA726]"}>Tạo tài
                                khoản</Link>
                        </div>
                    </Form.Item>
                </Form>

                <div className="flex flex-col justify-center items-center gap-2 mt-4">
                    <Button
                        icon={<FontAwesomeIcon icon={faFacebook}/>}
                        className="!bg-[#1877F2] !text-white font-bold w-full hover:!bg-[#165dc4] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                        onClick={() => window.location.href = 'URL_Facebook_Login'}
                    >
                        Đăng nhập bằng Facebook
                    </Button>
                    <Button
                        icon={<FontAwesomeIcon icon={faGoogle}/>}
                        className="!bg-[#DB4437] !text-white font-bold w-full hover:!bg-[#C23321] transition-colors duration-300 border-0 hover:outline-none hover:border-0"
                        onClick={() => window.location.href = 'http://localhost:8085/oauth2/authorization/google'}
                    >
                        Đăng nhập bằng Google
                    </Button>
                    <div className="mt-4 text-center">
                        <Link to={"/forgot-password"} className={"text-black font-bold text-sm hover:text-[#FFA726]"}>Quên
                            mật khẩu?</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}