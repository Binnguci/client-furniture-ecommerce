'use client';
import React from "react";
import {Button, Form, Grid, Input, theme, Typography as AntTypography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import http from "../utils/http.ts";
import {FormSignUp} from "../types/formSignUp.ts";
import {Link, useNavigate} from "react-router-dom";
import {FormSignIn} from "../types/formSignIn.ts";

const {useToken} = theme;
const {useBreakpoint} = Grid;
const {Text, Title} = AntTypography;

export default function SignIn() {
    const {token} = useToken();
    const screens = useBreakpoint();
    const navigate = useNavigate();

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
            setTimeout(() => {
                navigate("/home");
            }, 1000);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    const onFinish = async (values: FormSignUp) => {
        console.log("Received values of form: ", values);
        await sendData(values);
    };

    return (
        <section
            className={`flex items-center justify-center ${screens.sm ? "h-screen" : "h-auto"} bg-${token.colorBgContainer} p-8`}>
            <div className="mx-auto w-[380px] bg-gray-100 shadow-lg rounded-lg p-6">
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
                            placeholder="Password"
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
            </div>
        </section>
    );
}